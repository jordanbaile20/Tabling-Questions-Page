// Question pool. Edit freely: always two options, parallel in form and length.
// topic = "services" (988/211) or "concept" (research ideas); every play includes at least one of each.
// correct = index (0 or 1) of the research-supported option.
// hint = one nudge shown behind the "?" button. It should not give the answer away.
// Wrap a word in [[double brackets]] to give it a definition bubble (see GLOSSARY).
// Bold: at most one <strong> phrase per explanation.

const GLOSSARY = {
    "lethal means": "Things that could be used in a suicide attempt, like firearms or medications. Making them harder to access gives a crisis time to pass.",

    "upstream": "Addressing causes like housing, money stress, and isolation before they build into a crisis.",

    "hopelessness": "Feeling that things can't get better and there's no way out.",

    "crisis": "A period of intense emotional distress when someone may feel overwhelmed, trapped, or at risk of harming themselves.",

    "warning sign": "A change in behavior, mood, or circumstances that may indicate someone is struggling or at increased risk.",

    "support": "Connection, understanding, and practical help from other people, services, or resources.",

    "resource navigation": "Helping people find services and support that match their needs, even when they're unsure where to start.",

    "distress": "Emotional pain, stress, or suffering that feels difficult to manage.",

    "listening": "Giving someone your attention without judging, arguing, or immediately trying to solve the problem."
};

const questions = [

{
    question: "If you're worried someone may be suicidal, should you ask directly?",
    options: [
        "Yes",
        "No"
    ],
    correct: 0,
    topic: "suicide",
    hint: "Think about whether avoiding the topic makes it easier to get help.",
    explanation: "Asking directly about suicide does not increase risk and can open the door to [[support]]. <strong>Starting the conversation can help.</strong>"
},

{
    question: "Which is a way to reach 988?",
    options: [
        "Send a text message",
        "Send an email"
    ],
    correct: 0,
    topic: "services",
    hint: "Think about how you'd get help quickly.",
    explanation: "You can call, text, or chat with 988 anytime. <strong>Help is available 24/7.</strong>"
},

{
    question: "Do you have to give your name to contact 988?",
    options: [
        "No, it's up to you",
        "Yes, they need your name"
    ],
    correct: 0,
    topic: "services",
    hint: "Think about what might make someone hesitate to reach out.",
    explanation: "You only share what you're comfortable sharing. <strong>Giving your name is optional.</strong>"
},

{
    question: "Someone is in immediate physical danger. Which number do you call first?",
    options: [
        "911",
        "988"
    ],
    correct: 0,
    topic: "services",
    hint: "Think about who can respond to a location.",
    explanation: "Call 911 for immediate danger. <strong>988 provides crisis support.</strong>"
},

{
    question: "Someone receives an eviction notice. Which service is designed to help?",
    options: [
        "211",
        "988"
    ],
    correct: 0,
    topic: "services",
    hint: "Think about practical versus emotional support.",
    explanation: "Connecting people to housing and other services is an [[upstream]] approach to prevention. <strong>211 can help people find resources before problems grow.</strong>"
},

{
    question: "What do you need before contacting 211?",
    options: [
        "A situation or question",
        "A specific program in mind"
    ],
    correct: 0,
    topic: "services",
    hint: "Think about calling a help desk: do you need to know the right department first?",
    explanation: "You don't need to know what to ask for. 211 specialists provide [[resource navigation]]. <strong>They help people find resources.</strong>"
},

{
    question: "A friend says they're thinking about suicide. Which response helps more?",
    options: [
        "\"I'm here, and I'm listening.\"",
        "\"You have so much to live for.\""
    ],
    correct: 0,
    topic: "suicide",
    hint: "Think about feeling heard versus being persuaded.",
    explanation: "[[Listening]] shows you take their pain seriously. <strong>Feeling heard matters.</strong>"
},

{
    question: "When someone talks about suicide, what is it more likely to be?",
    options: [
        "A sign of real pain",
        "Not something to worry about"
    ],
    correct: 0,
    topic: "suicide",
    hint: "Think about how difficult this topic can be to bring up.",
    explanation: "Talking about suicide can signal serious [[distress]] and should <strong>always be taken seriously.</strong>"
},

{
    question: "If a dangerous item is harder to get, what often happens?",
    options: [
        "The crisis passes",
        "A different method is used"
    ],
    correct: 0,
    topic: "suicide",
    hint: "Think about how long the most intense moments usually last.",
    explanation: "Making [[lethal means]] harder to access can reduce risk during a [[crisis]]. <strong>Time can save lives.</strong>"
},

{
    question: "Which feeling is more strongly linked to suicide risk?",
    options: [
        "Feeling trapped or hopeless",
        "Facing many everyday problems"
    ],
    correct: 0,
    topic: "suicide",
    hint: "Focus on how a person sees their future.",
    explanation: "Feeling trapped or experiencing [[hopelessness]] can signal elevated risk. <strong>Hopelessness is a key [[warning sign]].</strong>"
},

{
    question: "During a suicidal crisis, how do intense feelings usually change?",
    options: [
        "They ease with time",
        "They stay as strong"
    ],
    correct: 0,
    topic: "suicide",
    hint: "Think about how emotions behave during difficult moments.",
    explanation: "The most intense feelings in a [[crisis]] often become less overwhelming. <strong>Crises are usually temporary.</strong>"
},

{
    question: "Can support still make a difference during a suicidal crisis?",
    options: [
        "Yes, support can help",
        "Only if they ask for it"
    ],
    correct: 0,
    topic: "suicide",
    hint: "Think about whether everyone asks for help when they're struggling.",
    explanation: "Connection and [[support]] can reduce risk, even when someone hasn't reached out themselves. <strong>Support still matters.</strong>"
}

];
