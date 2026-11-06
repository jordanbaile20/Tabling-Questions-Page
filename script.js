const TOTAL_QUESTIONS = 2;

const questions = [

{
    question: "When someone contacts 988, what is more common?",
    options: [
        "The conversation ends with support from a counselor",
        "Emergency services are sent"
    ],
    correct: 0,
    explanation: "Most contacts to 988 are resolved through conversation and support. Emergency intervention is used in a relatively small percentage of cases."
},

{
    question: "Which is more accurate?",
    options: [
        "Talking about suicide can put the idea in someone's head",
        "Asking directly does not increase suicidal thoughts"
    ],
    correct: 1,
    explanation: "Research has consistently found that asking directly about suicide does not increase suicidal thoughts. Many people feel relieved when someone asks openly and without judgment."
},

{
    question: "Who can contact 988?",
    options: [
        "Anyone concerned about someone",
        "Only the person in crisis"
    ],
    correct: 0,
    explanation: "988 supports people seeking help for themselves as well as family members, friends, coworkers, teachers, and others concerned about someone."
},

{
    question: "Before calling 211, what do you need?",
    options: [
        "To know which program you qualify for",
        "Just a need or question"
    ],
    correct: 1,
    explanation: "You do not need to know exactly what service you need before contacting 211. Specialists help connect people with appropriate local resources."
},

{
    question: "Someone is facing eviction. Which number is most likely to help?",
    options: [
        "988",
        "211"
    ],
    correct: 1,
    explanation: "211 helps connect people with housing resources, utility assistance, food programs, transportation, and other community supports."
},

{
    question: "Which is more accurate?",
    options: [
        "Most people show no warning signs before suicide",
        "Many people show warning signs beforehand"
    ],
    correct: 1,
    explanation: "Many people communicate distress through changes in mood, behavior, sleep, withdrawal, hopelessness, or other warning signs."
},

{
    question: "Which has stronger evidence for preventing suicide deaths?",
    options: [
        "Limiting access to lethal means",
        "Suicide awareness campaigns"
    ],
    correct: 0,
    explanation: "Awareness is important, but research has found that limiting access to highly lethal methods is one of the most effective ways to reduce suicide deaths."
},

{
    question: "Which is more strongly linked to suicide risk?",
    options: [
        "Having many problems",
        "Feeling things cannot get better"
    ],
    correct: 1,
    explanation: "Hopelessness and feeling trapped are among the strongest indicators of suicide risk."
},

{
    question: "Which is more accurate about a suicidal crisis?",
    options: [
        "The most intense urges usually stay the same",
        "The most intense urges often lessen with time"
    ],
    correct: 1,
    explanation: "The most intense moments of a crisis are often temporary. Support, safety, and time can help someone get through the peak."
},

{
    question: "When does suicide prevention begin?",
    options: [
        "Before a crisis develops",
        "During a crisis"
    ],
    correct: 0,
    explanation: "Prevention includes reducing stressors, strengthening support systems, and increasing access to resources long before a crisis occurs."
},

{
    question: "Which is more accurate?",
    options: [
        "Once someone decides on suicide, nothing can help",
        "Support and intervention can save lives"
    ],
    correct: 1,
    explanation: "Suicidal crises often change over time. Support, practical help, treatment, and connection can reduce risk."
},

{
    question: "Which is a reason someone might call 211?",
    options: [
        "A utility shutoff notice",
        "Thoughts of suicide"
    ],
    correct: 0,
    explanation: "211 helps connect people with local resources for needs such as housing, food, utilities, transportation, and healthcare. Thoughts of suicide are generally a reason to contact 988."
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
    chosenQuestions = pickQuestions();
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
    `;
}

function answer(choice){

    const q = chosenQuestions[currentQuestion];
    const aligned = (choice === q.correct);

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

        <button class="continue-btn" onclick="nextQuestion()">
            Continue →
        </button>
    `;
}

function showComplete(){

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
        <div class="answer-item">
            <div class="answer-q">${i + 1}. ${q.question}</div>
            ${q.options.map((opt, idx) => `
                <div class="answer-option ${idx === q.correct ? "is-correct" : ""}">
                    ${idx === q.correct ? "✓ " : ""}${opt}
                </div>
            `).join("")}
            <div class="answer-why">${q.explanation}</div>
        </div>
    `).join("");

    content.innerHTML = `
        <h1>All Questions &amp; Answers</h1>

        <p class="answers-intro">
            The research-supported answer to each question is highlighted.
        </p>

        ${navButtons}

        <div class="answers-list">
            ${items}
        </div>

        ${navButtons}
    `;
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
