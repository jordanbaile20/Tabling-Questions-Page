const TOTAL_QUESTIONS = 2;

const questions = [

{
    question: "Myth or Fact?",
    options: [
        "Talking to someone about suicide can put the idea in their head",
        "Research has not found that asking directly about suicide increases suicidal thoughts"
    ],
    correct: 1,
    explanation: "Research has consistently found that asking directly about suicide does not increase suicidal thoughts. Many people feel relieved when someone asks openly and without judgment."
},

{
    question: "Which service would be most appropriate for someone facing eviction?",
    options: [
        "988",
        "211"
    ],
    correct: 1,
    explanation: "211 connects people with housing resources, utility assistance, food programs, transportation options, and many other community services."
},

{
    question: "When someone contacts 988, which outcome is more common?",
    options: [
        "The conversation is resolved through support and counseling",
        "Emergency responders are dispatched"
    ],
    correct: 0,
    explanation: "Most contacts to 988 are resolved through conversation and support. Emergency intervention is used in a relatively small percentage of cases."
},

{
    question: "Myth or Fact?",
    options: [
        "People considering suicide never show warning signs",
        "Many people show warning signs or noticeable changes beforehand"
    ],
    correct: 1,
    explanation: "Changes in mood, behavior, sleep, withdrawal, hopelessness, or talking about death are often noticed before a suicide attempt."
},

{
    question: "Which is more strongly associated with suicide risk?",
    options: [
        "The number of problems a person has",
        "Believing things cannot improve"
    ],
    correct: 1,
    explanation: "Hopelessness and feeling trapped or unable to imagine improvement are among the strongest indicators of suicide risk."
},

{
    question: "Which statement is more accurate?",
    options: [
        "Friends and family can contact 988 if they're worried about someone",
        "Only the person in crisis can contact 988"
    ],
    correct: 0,
    explanation: "988 supports people seeking help for themselves as well as family members, friends, teachers, coworkers, and others concerned about someone."
},

{
    question: "Myth or Fact?",
    options: [
        "Making a dangerous method harder to access can save lives",
        "People who are suicidal will always find another way"
    ],
    correct: 0,
    explanation: "Research suggests many suicidal crises are temporary. Creating time and distance from highly lethal methods can save lives."
},

{
    question: "Which is more protective against suicide?",
    options: [
        "Feeling connected to other people",
        "Handling everything alone"
    ],
    correct: 0,
    explanation: "A sense of connection and belonging is one of the most established protective factors against suicide."
},

{
    question: "Myth or Fact?",
    options: [
        "Once someone has decided on suicide, nothing can be done",
        "Many suicidal crises can be interrupted through support and intervention"
    ],
    correct: 1,
    explanation: "Suicidal crises often change over time. Support, practical help, treatment, and connection can all reduce risk."
},

{
    question: "Which is a more accurate description of intense suicidal urges?",
    options: [
        "They often become less intense with time and support",
        "They stay equally strong until every problem is solved"
    ],
    correct: 0,
    explanation: "The most intense moments of a crisis are often temporary. Support and safety can help people get through the peak."
},

{
    question: "Which call would be a good fit for 211?",
    options: [
        "Finding food, housing, transportation, or utility assistance",
        "Reporting a crime in progress"
    ],
    correct: 0,
    explanation: "211 helps connect people with local health and human services, including food programs, housing supports, transportation assistance, and more."
},

{
    question: "What does 'upstream' prevention mean?",
    options: [
        "Reducing stressors before they become crises",
        "Responding more quickly after a crisis begins"
    ],
    correct: 0,
    explanation: "Upstream prevention focuses on conditions that influence wellbeing before a crisis develops, such as housing, social connection, and financial stability."
},

{
    question: "Myth or Fact?",
    options: [
        "People who talk about suicide should always be taken seriously",
        "Most people who talk about suicide are not serious"
    ],
    correct: 0,
    explanation: "Expressions of suicidal thoughts should always be taken seriously and met with support and concern."
},

{
    question: "Which statement is more accurate about 211?",
    options: [
        "You can contact 211 even if you're not sure what help you need",
        "You need to know exactly which program you qualify for before calling"
    ],
    correct: 0,
    explanation: "211 specialists help people understand available resources and navigate local services."
},

{
    question: "When does suicide prevention begin?",
    options: [
        "Before a crisis develops",
        "Only when someone contacts a crisis line"
    ],
    correct: 0,
    explanation: "Suicide prevention includes strengthening communities, reducing stressors, increasing support, and improving access to resources long before a crisis occurs."
},

{
    question: "Which has a greater impact on wellbeing than many people realize?",
    options: [
        "Housing stability and basic needs",
        "Willpower alone"
    ],
    correct: 0,
    explanation: "Housing, food security, safety, transportation, and financial stability all influence mental health and wellbeing."
},

{
    question: "Myth or Fact?",
    options: [
        "People who survive a suicide attempt never need additional support",
        "A previous suicide attempt can increase future risk"
    ],
    correct: 1,
    explanation: "A previous suicide attempt is one of the strongest known risk factors for future attempts. Ongoing support can be important."
},

{
    question: "Which phrase do prevention organizations generally recommend?",
    options: [
        "Died by suicide",
        "Completed suicide"
    ],
    correct: 0,
    explanation: "'Died by suicide' is generally preferred because it is neutral and avoids language that can sound like an achievement or a crime."
},

{
    question: "A coworker seems down for weeks but hasn't mentioned suicide. Which is a reasonable step?",
    options: [
        "Call or text 988 for guidance on how to support them",
        "Wait until they mention suicide before seeking advice"
    ],
    correct: 0,
    explanation: "You do not need certainty, and you do not need to be the person in crisis, to contact 988. Counselors can help concerned friends, family members, and coworkers."
},

{
    question: "Who is most likely to notice that someone is struggling?",
    options: [
        "Only mental health professionals",
        "People who interact with them in everyday life"
    ],
    correct: 1,
    explanation: "Many people experiencing emotional distress are not currently receiving treatment. Friends, family members, coworkers, classmates, and neighbors often notice changes first."
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
