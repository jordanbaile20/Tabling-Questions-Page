// Question pool. Edit freely: always two options, parallel in form and length.
// topic = "services" (988/211) or "concept" (research ideas); every play includes at least one of each.
// correct = index (0 or 1) of the research-supported option.
const questions = [

{
    question: "When someone contacts 988, what is more common?",
    options: [
        "The conversation ends with support from a counselor",
        "Emergency services are sent"
    ],
    correct: 0,
    topic: "services",
    explanation: "Most contacts to 988 are resolved through <strong>conversation</strong> and <strong>support</strong> without emergency dispatch."
},

{
    question: "Which is more accurate when asking someone if they're thinking about suicide?",
    options: [
        "It can put the idea in their head",
        "It does not increase suicidal thoughts"
    ],
    correct: 1,
    topic: "concept",
    explanation: "Many people feel relieved when someone asks <strong>openly</strong> and <strong>directly</strong>."
},

{
    question: "Who can contact 988?",
    options: [
        "Anyone concerned about someone",
        "Only the person in crisis"
    ],
    correct: 0,
    topic: "services",
    explanation: "988 supports people seeking help for themselves or someone they care about."
},

{
    question: "Before calling 211, what do you need?",
    options: [
        "To know which program you qualify for",
        "Just a need or question"
    ],
    correct: 1,
    topic: "services",
    explanation: "You don't need to know what service you need before contacting 211. Specialists help connect people with appropriate local resources."
},

{
    question: "Someone is facing eviction. Which number is most likely to help?",
    options: [
        "988",
        "211"
    ],
    correct: 1,
    topic: "services",
    explanation: "211 helps connect people with housing, food, utility, and other local resources."
},

{
    question: "Which is more accurate about warning signs before suicide?",
    options: [
        "It usually happens without warning",
        "People often show warning signs beforehand"
    ],
    correct: 1,
    topic: "concept",
    explanation: "Many people communicate distress through changes in <strong>mood, behavior, sleep, withdrawal, hopelessness,</strong> or other warning signs."
},

{
    question: "Which has stronger evidence for preventing suicide deaths?",
    options: [
        "Limiting access to lethal means",
        "Suicide awareness campaigns"
    ],
    correct: 0,
    topic: "concept",
    explanation: "Awareness is important, however limiting access to lethal means is one of the most effective suicide prevention strategies."
},

{
    question: "Which is more strongly linked to suicide risk?",
    options: [
        "Having several problems at the same time",
        "Feeling like things cannot get better"
    ],
    correct: 1,
    topic: "concept",
    explanation: "Hopelessness and feeling trapped are among the strongest indicators of suicide risk."
},

{
    question: "How do the most intense suicidal urges usually change over time?",
    options: [
        "They usually <u>stay the same</u>",
        "They usually <u>lessen with time</u>"
    ],
    correct: 1,
    topic: "concept",
    explanation: "The most intense moments of a crisis are often temporary. <strong>Support, safety,</strong> and <strong>time</strong> can help someone get through the peak."
},

{
    question: "When does suicide prevention begin?",
    options: [
        "Before a crisis develops",
        "During a crisis"
    ],
    correct: 0,
    topic: "concept",
    explanation: "Prevention includes reducing stressors, strengthening support systems, and increasing access to resources <strong>long before a crisis occurs</strong>."
},

{
    question: "Which is more accurate about helping someone who has decided on suicide?",
    options: [
        "Once someone decides on suicide, nothing can help",
        "Support and intervention can save lives"
    ],
    correct: 1,
    topic: "concept",
    explanation: "Suicidal crises often <strong>change over time</strong>. Support, practical help, treatment, and connection can reduce risk."
},

{
    question: "Which is a reason someone might call 211?",
    options: [
        "A utility shutoff notice",
        "Thoughts of suicide"
    ],
    correct: 0,
    topic: "services",
    explanation: "211 connects people with resources for needs like <strong>housing, food, utilities, and transportation</strong>."
}

];
