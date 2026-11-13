const TOTAL_QUESTIONS = 2;
const IDLE_RESET = 120000;     // ms of no taps before returning to the welcome screen

const CONTINUE_DELAY = 2000; //ms before Continue button unlocks. Here as a fallback.

const SKIP_COOLDOWN = 2500;  // ms the Skip button stays locked after a question is skipped (stops rapid-fire skipping)
let skipTimer = null;

const TRACK_URL = "https://script.google.com/macros/s/AKfycby7LzPqfeq_RciwbWbRbim4NeLljaD0KUEaQ67QikYIZ-B03YQ21ac1S_JBCfvwi7km/exec";
let playId = null;

function track(event, data = {}){
    if(!TRACK_URL) return;
    try{
        fetch(TRACK_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain" },
            keepalive: true,
            body: JSON.stringify({
                time: new Date().toISOString(),
                playId,
                event,
                ...data
            })
        });
    }catch(e){ /* never let tracking break the quiz */ }
}
const content = document.getElementById("content");

let chosenQuestions = [];
let currentQuestion = 0;
let locked = false;

const logoHTML = `
    <img
        src="ContactLogo-Final.png"
        class="logo"
        alt="Contact Community Services"
        onerror="this.style.display='none'">
`;

function randomizeOptions(q){
    // Shuffle the display order of the answer options so the
    // correct answer is not always in the same position.
    const order = q.options.map((_, i) => i);
    for(let i = order.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return {
        question: q.question,
        explanation: q.explanation,
        topic: q.topic,
        options: order.map(i => q.options[i]),
        correct: order.indexOf(q.correct)
    };
}

function shuffle(arr){
    const a = [...arr];
    for(let i = a.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pickQuestions(){
    // One question from each topic first (guarantees the mix),
    // then fill any remaining slots from the rest of the pool.
    const topics = shuffle([...new Set(questions.map(q => q.topic))]);
    const picked = [];
    topics.forEach(t => {
        if(picked.length < TOTAL_QUESTIONS){
            picked.push(shuffle(questions.filter(q => q.topic === t))[0]);
        }
    });
    shuffle(questions.filter(q => !picked.includes(q)))
        .slice(0, TOTAL_QUESTIONS - picked.length)
        .forEach(q => picked.push(q));
    return shuffle(picked).map(randomizeOptions);
}

function updateProgress(){
    const percentage = (currentQuestion / TOTAL_QUESTIONS) * 100;
    document.getElementById("progressFill").style.width = percentage + "%";
}

function showWelcome(){

    document.getElementById("progressFill").style.width = "0%";

    content.innerHTML = `
        <div class="completion">

            ${logoHTML}

            <h1>What Do You Think?</h1>

            <p class="subtitle" style="margin-bottom:0;">
                See how your instincts compare to what researchers have found
            </p>

            <button class="continue-btn" style="margin-top:28px;" onclick="startChallenge()">
                Start Challenge →
            </button>

            <p class="welcome-meta">
                ${TOTAL_QUESTIONS} quick questions · under a minute
            </p>

        </div>
    `;
}

function startChallenge(){
    currentQuestion = 0;
    playId = Math.random().toString(36).slice(2,10);
    chosenQuestions = pickQuestions();
    track("start");
    loadQuestion();
}

function loadQuestion(cooldown = false){

    locked = false;
    updateProgress();
    clearTimeout(skipTimer);

    const q = chosenQuestions[currentQuestion];

    content.innerHTML = `
        <h1>What Do You Think?</h1>

        <p class="subtitle">
            Question ${currentQuestion + 1} of ${TOTAL_QUESTIONS}
        </p>

        <div class="question">
            ${q.question}
        </div>

        <button class="answer-btn" onclick="answer(0)">
            ${q.options[0]}
        </button>

        <button class="answer-btn" onclick="answer(1)">
            ${q.options[1]}
        </button>

        <button
            class="secondary-btn timed-btn${cooldown ? "" : " ready"}"
            id="skipBtn"
            style="margin-top:24px; --delay:${SKIP_COOLDOWN}ms"
            ${cooldown ? "disabled" : ""}
            onclick="skipQuestion()">
            <span class="timed-fill"></span>
            <span class="timed-label">Skip this question</span>
        </button>
    `;
}

function answer(choice){

    if(locked) return;
    locked = true;
    const q = chosenQuestions[currentQuestion];
    const aligned = (choice === q.correct);
    track("answer", {
        question: q.question,
        chosen: q.options[choice],
        correct: aligned
    });
    
    const delay = Math.min(4000, Math.max(2000, 1500 + q.explanation.length * 12));

    content.innerHTML = `
        <h2 class="result-heading ${aligned ? "match" : "differ"}">
            <span class="result-icon" aria-hidden="true">${aligned ? "✓" : "✗"}</span>
            ${aligned ? "Your prediction matched the research" : "The research suggests something different"}
        </h2>

        <div class="${aligned ? "correct" : "insight"}">

            <div class="research-label">
                Research Suggests
            </div>

            <div class="research-title">
                ${q.options[q.correct]}
            </div>

            <div class="research-explanation">
                ${q.explanation}
            </div>

        </div>

        <button 
            class="continue-btn timed-btn"
            id="continueBtn"
            style="--delay:${delay}ms"
            disabled
            onclick="nextQuestion()">
            <span class="timed-fill"></span>
            <span class="timed-label">Continue →</span>
        </button>
    `;
    setTimeout(() => {
        const btn = document.getElementById("continueBtn");
        if(btn){
            btn.disabled = false;
            btn.classList.add("ready");
        }
    }, delay);
}

function skipQuestion(){

    const usedQuestions = chosenQuestions.map(q=> q.question);

    const available = questions
        .filter(q => !usedQuestions.includes(q.question)
                  && q.topic === chosenQuestions[currentQuestion].topic);

    if(available.length === 0){
        return;
    }

    const replacement =
        randomizeOptions(
            available[Math.floor(Math.random() * available.length)]
            );
    track("skip", { question: chosenQuestions[currentQuestion].question });
    
    chosenQuestions[currentQuestion] = replacement;

    loadQuestion(true);

    skipTimer = setTimeout(() => {
        const btn = document.getElementById("skipBtn");
        if(btn){
            btn.disabled = false;
            btn.classList.add("ready");
        }
    }, SKIP_COOLDOWN);
}

function showComplete(){

    track("complete");
    const time = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    document.getElementById("progressFill").style.width = "100%";
    window.scrollTo(0, 0);

        content.innerHTML = `
            <div class="completion">

                ${logoHTML}

                <div class="big-emoji">🎉</div>

                <div class="badge">Challenge Complete</div>

                <h1>Thank You!</h1>

                <p>
                    Show this screen to the event staff to receive your prize entry.
                </p>
                <p class="stamp">Completed at ${time}</p>

                <div class="info-cards">

                    <div class="brand-988">
                        <div class="brand-head">
                            <span class="brand-number">988</span>
                            <span class="brand-name">Suicide &amp; Crisis Lifeline</span>
                        </div>
                        <p class="brand-text">
                            Emotional support, mental health assistance,
                            and crisis intervention available 24/7.
                        </p>
                    </div>

                    <div class="brand-211">
                        <div class="brand-head">
                            <span class="brand-number">211</span>
                            <span class="brand-name">Community Resources</span>
                        </div>
                        <p class="brand-text">
                            Connections to food, housing, transportation,
                            utility assistance, healthcare, and local supports.
                        </p>
                    </div>

                </div>

                <p style="color:#555; line-height:1.7; margin-top:20px;">
                    You explored two ideas from modern suicide prevention research.
                    <br><br>
                    Suicide prevention often begins long before a crisis develops.
                </p>

                <div class="btn-row">
                    <button class="secondary-btn" onclick="showAnswers()">
                        See All Questions &amp; Answers
                    </button>
                    <button class="continue-btn" onclick="showWelcome()">
                        Try Again
                    </button>
                </div>

            </div>
        `;
}

function setupAccordions(){
    const DURATION = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 350;

    document.querySelectorAll(".answer-item").forEach(details => {
        const summary = details.querySelector("summary");
        const content = details.querySelector(".answer-content");
        let anim = null;

        summary.addEventListener("click", e => {
            e.preventDefault();

            const opening = !details.classList.contains("is-open");

            // Where the box is visually right now (works even mid-animation)
            const start = details.offsetHeight;
            if(anim) anim.cancel();

            details.classList.toggle("is-open", opening);

            let end;
            if(opening){
                details.open = true;
                end = details.offsetHeight;                      // natural open height
            } else {
                end = details.offsetHeight - content.offsetHeight; // summary + borders only
            }

            anim = details.animate(
                { height: [start + "px", end + "px"] },
                { duration: DURATION, easing: "ease" }
            );

            anim.onfinish = () => {
                if(!opening) details.open = false;
                anim = null;
            };
        });
    });
}

function showAnswers(){

    document.getElementById("progressFill").style.width = "100%";
    window.scrollTo(0, 0);

    const navButtons = `
        <div class="btn-row">
            <button class="secondary-btn" onclick="showComplete()">
                ← Back
            </button>
            <button class="continue-btn" onclick="showWelcome()">
                Try Again
            </button>
        </div>
    `;

   const items = questions.map((q, i) => `
    <details class="answer-item">

        <summary class="answer-q">
            ${i + 1}. ${q.question}
        </summary>

        <div class="answer-content">

            ${q.options.map((opt, j) =>
                j === q.correct
                    ? `<div class="answer-option is-correct">✓ ${opt}</div>`
                    : `<div class="answer-option is-wrong">✗ ${opt}</div>`
            ).join("")}

            <div class="answer-why">
                ${q.explanation}
            </div>

        </div>

    </details>
`).join("");

    content.innerHTML = `
        <h1>All Questions &amp; Answers</h1>

        <p class="answers-intro">
            The research-supported answer is marked ✓ and the other option is marked ✗.
        </p>

        ${navButtons}

        <div class="answers-list">
            ${items}
        </div>

        ${navButtons}
    `;
    setupAccordions();
}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion >= TOTAL_QUESTIONS){

        showComplete();

        return;
    }

    loadQuestion();
}

let idleTimer;
function resetIdle(){
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        if(!document.querySelector(".welcome-meta")){
            // logs which question they stopped on, or "(after quiz)" on the results/answers screens
            const q = currentQuestion < TOTAL_QUESTIONS ? chosenQuestions[currentQuestion] : null;
            track("idle", { question: q ? q.question : "(after quiz)" });
            showWelcome();
        }
    }, IDLE_RESET);
}
["click","touchstart","keydown"].forEach(e => document.addEventListener(e, resetIdle, { passive: true }));
resetIdle();
showWelcome();
