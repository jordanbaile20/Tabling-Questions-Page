// Question pool. Edit freely: always two options, parallel in form and length.
// topic = "services" (988/211) or "concept" (research ideas); every play includes at least one of each.
// correct = index (0 or 1) of the research-supported option.
// hint = one nudge shown behind the "?" button. It should not give the answer away.
// Wrap a word in [[double brackets]] to give it a definition bubble (see GLOSSARY).
// Bold: at most one <strong> phrase per explanation.

const GLOSSARY = {
    "lethal means": "Things that could be used in a suicide attempt, like firearms or medications. Keeping them out of reach gives a crisis time to pass.",
    "upstream": "Addressing causes like housing, money stress, and isolation before they build into a crisis.",
    "hopelessness": "Feeling that things can't get better and there's no way out."
};

const questions = [

{
    question: "After someone contacts 988, what usually happens?",
    options: [
        "They talk it through with a counselor",
        "Emergency services are sent"
    ],
    correct: 0,
    topic: "services",
    hint: "Think about what 988 counselors are trained to do.",
    explanation: "Most 988 contacts end with a <strong>conversation and support</strong>, not emergency dispatch."
},

{
    question: "If you ask someone directly about suicide, what happens?",
    options: [
        "It can plant the idea",
        "It doesn't raise their risk"
    ],
    correct: 1,
    topic: "concept",
    hint: "Studies have tracked what happens to people's thoughts after they're asked.",
    explanation: "Research finds asking directly <strong>does not increase</strong> suicidal thoughts. Many people feel relieved to be asked."
},

{
    question: "A friend seems really down. Can you contact 988 about them?",
    options: [
        "Yes, you can reach out for them",
        "No, only they can reach out"
    ],
    correct: 0,
    topic: "services",
    hint: "Think about who else is affected when someone is struggling.",
    explanation: "988 supports people seeking help for themselves <strong>or someone they care about</strong>."
},

{
    question: "What do you need before contacting 211?",
    options: [
        "A specific program in mind",
        "Just a situation or question"
    ],
    correct: 1,
    topic: "services",
    hint: "Think about calling a help desk: do you need to know the right department first?",
    explanation: "You don't need to know what to ask for. 211 specialists <strong>help you find</strong> the right local resources."
},

{
    question: "Someone is facing eviction. Which number is most likely to help?",
    options: [
        "988",
        "211"
    ],
    correct: 1,
    topic: "services",
    hint: "One number is for emotional crisis, the other for practical needs.",
    explanation: "211 connects people to <strong>local housing, food, and utility resources</strong>."
},

{
    question: "Before a suicide crisis, which is more common?",
    options: [
        "Little to no warning",
        "Noticeable warning signs"
    ],
    correct: 1,
    topic: "concept",
    hint: "Think about what friends and family often notice in hindsight.",
    explanation: "People often show changes in <strong>mood, sleep, or withdrawal</strong> first."
},

{
    question: "Which has stronger evidence for saving lives?",
    options: [
        "Keeping dangerous items out of easy reach",
        "Running awareness campaigns"
    ],
    correct: 0,
    topic: "concept",
    hint: "Think about which one changes the situation, not just what people know.",
    explanation: "Awareness helps, but making [[lethal means]] harder to reach is <strong>one of the most effective</strong> prevention strategies."
},

{
    question: "Which is more strongly linked to suicide risk?",
    options: [
        "Having many problems at once",
        "Feeling stuck with no way out"
    ],
    correct: 1,
    topic: "concept",
    hint: "Think about how it feels when you can't picture things improving.",
    explanation: "[[Hopelessness]] and feeling trapped are among the <strong>strongest</strong> indicators of risk."
},

{
    question: "How do the most intense suicidal urges usually change?",
    options: [
        "They stay just as strong",
        "They ease with time"
    ],
    correct: 1,
    topic: "concept",
    hint: "Think about how a very painful moment feels versus how long it lasts.",
    explanation: "The most intense moments are often <strong>temporary</strong>. Support, safety, and time help people get through the peak."
},

{
    question: "When does suicide prevention start?",
    options: [
        "Before a crisis begins",
        "Once a crisis begins"
    ],
    correct: 0,
    topic: "concept",
    hint: "Think about what could change before things get this hard.",
    explanation: "Prevention works [[upstream]]: easing stress and building support <strong>before</strong> a crisis."
},

{
    question: "Can support still help someone who has decided on suicide?",
    options: [
        "No, it's too late",
        "Yes, support can still save a life"
    ],
    correct: 1,
    topic: "concept",
    hint: "Think about what crisis counselors and clinicians see in their work.",
    explanation: "Suicidal crises <strong>change over time</strong>. Support, practical help, treatment, and connection can lower risk."
},

{
    question: "Which is a good reason to contact 211?",
    options: [
        "A utility shutoff notice",
        "Thoughts of suicide"
    ],
    correct: 0,
    topic: "services",
    hint: "Which one is a practical need rather than an emotional crisis?",
    explanation: "211 helps with <strong>housing, food, utilities, and rides</strong>. For thoughts of suicide, call or text 988."
}

];
