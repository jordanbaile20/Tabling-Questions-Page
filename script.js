const TOTAL_QUESTIONS = 2;

const CONTINUE_DELAY = 2000; //ms before Continue button unlocks. Here as a fallback.

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
const questions = [

{
    question: "When someone contacts 988, what is more common?",
    options: [
        "The conversation ends with support from a counselor",
        "Emergency services are sent"
    ],
    correct: 0,
    explanation: "Most contacts to 988 are resolved through <strong>conversation</strong> and <strong>support</strong> without emergency dispatch."
},

{
    question: "Which is more accurate when asking someone if they're thinking about suicide?",
    options: [
        "It can put the idea in their head",
        "It does not increase suicidal thoughts"
    ],
    correct: 1,
    explanation: "Many people feel relieved when someone asks <strong>openly</strong> and <strong>directly</strong>."
},

{
    question: "Who can contact 988?",
    options: [
        "Anyone concerned about someone",
        "Only the person in crisis"
    ],
    correct: 0,
    explanation: "988 supports people seeking help for themselves or someone they care about."
},

{
    question: "Before calling 211, what do you need?",
    options: [
        "To know which program you qualify for",
        "Just a need or question"
    ],
    correct: 1,
    explanation: "You don't need to know what service you need before contacting 211. Specialists help connect people with appropriate local resources."
},

{
    question: "Someone is facing eviction. Which number is most likely to help?",
    options: [
        "988",
        "211"
    ],
    correct: 1,
    explanation: "211 helps connect people with housing, food, utility, and other local resources."
},

{
    question: "Which is more accurate about warning signs before suicide?",
    options: [
        "It usually happens without warning",
        "People often show warning signs beforehand"
    ],
    correct: 1,
    explanation: "Many people communicate distress through changes in <strong>mood, behavior, sleep, withdrawal, hopelessness,</strong> or other warning signs."
},

{
    question: "Which has stronger evidence for preventing suicide deaths?",
    options: [
        "Limiting access to lethal means",
        "Suicide awareness campaigns"
    ],
    correct: 0,
    explanation: "Awareness is important, however limiting access to lethal means is one of the most effective suicide prevention strategies."
},

{
    question: "Which is more strongly linked to suicide risk?",
    options: [
        "Having several problems at the same time",
        "Feeling like things cannot get better"
    ],
    correct: 1,
    explanation: "Hopelessness and feeling trapped are among the strongest indicators of suicide risk."
},

{
    question: "How do the most intense suicidal urges usually change over time?",
    options: [
        "They usually <u>stay the same</u>",
        "They usually <u>lessen with time</u>"
    ],
    correct: 1,
    explanation: "The most intense moments of a crisis are often temporary. <strong>Support, safety,</strong> and <strong>time</strong> can help someone get through the peak."
},

{
    question: "When does suicide prevention begin?",
    options: [
        "Before a crisis develops",
        "During a crisis"
    ],
    correct: 0,
    explanation: "Prevention includes reducing stressors, strengthening support systems, and increasing access to resources <strong>long before a crisis occurs</strong>."
},

{
    question: "Which is more accurate about helping someone who has decided on suicide?",
    options: [
        "Once someone decides on suicide, nothing can help",
        "Support and intervention can save lives"
    ],
    correct: 1,
    explanation: "Suicidal crises often <strong>change over time</strong>. Support, practical help, treatment, and connection can reduce risk."
},

{
    question: "Which is a reason someone might call 211?",
    options: [
        "A utility shutoff notice",
        "Thoughts of suicide"
    ],
    correct: 0,
    explanation: "211 connects people with resources for needs like <strong>housing, food, utilities, and transportation</strong>."
}

];

const content = document.getElementById("content");

let chosenQuestions = [];
let currentQuestion = 0;

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
        options: order.map(i => q.options[i]),
        correct: order.indexOf(q.correct)
    };
}

function pickQuestions(){
    // Shuffle a copy, then take the first N (no duplicates)
    const shuffled = [...questions];
    for(let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, TOTAL_QUESTIONS).map(randomizeOptions);
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
                Can you predict what research suggests?
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

function loadQuestion(){

    updateProgress();

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
            class="secondary-btn"
            style ="margin-top:24px;"
            onclick="skipQuestion()">
            Try Another Question
        </button>
    `;
}

function answer(choice){

    const q = chosenQuestions[currentQuestion];
    const aligned = (choice === q.correct);
    track("answer", {
        question: q.question,
        chosen: q.options[choice],
        correct: aligned
    });
    
    const delay = Math.min(4000, Math.max(2000, 1500 + q.explanation.length * 12));

    content.innerHTML = `
        <h2>What Researchers Have Found</h2>

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
        .filter(q => !usedQuestions.includes(q.question));

    if(available.length === 0){
        return;
    }

    const replacement =
        randomizeOptions(
            available[Math.floor(Math.random() * available.length)]
            );
    track("skip", { question: chosenQuestions[currentQuestion].question });
    
    chosenQuestions[currentQuestion] = replacement;

    loadQuestion();
}

function showComplete(){

    track("complete");
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

showWelcome();
