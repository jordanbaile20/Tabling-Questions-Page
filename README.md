# Tabling-Questions-Page

A short, mobile-first quiz for community outreach tabling events. Visitors scan a QR code, answer two quick questions about suicide prevention research and the 988 and 211 services, then show the completion screen at the table to receive a prize entry.

Built for Contact Community Services.

## Features

- Two random questions per play (at least one 988/211 question and one research-concept question), with shuffled answer order and no repeats
- "Skip this question" button to swap a question (locks briefly after each skip so it can't be tapped repeatedly)
- Short research-based explanation after each answer
- Completion screen with 988 and 211 information
- "All Questions & Answers" accordion showing the correct (✓) and incorrect (✗) option for every question

## Files

- `index.html`: page shell
- `styles.css`: all styling
- `questions.js`: the question pool (edit this to add or change questions)
- `script.js`: settings and quiz flow
- `drag.js`: touch drag effect (card follows your finger and springs back); delete it and its `<script>` tag in `index.html` to remove it
- `ContactLogo-Final.png`: logo (hidden if missing)

## Running locally

No build step. Open `index.html` in a browser, or run `python3 -m http.server 8000` in the project folder and visit `http://localhost:8000`.

## Editing questions

Questions are in the `questions` array in `questions.js`:

    {
        question: "Which is more accurate?",
        options: ["Option A", "Option B"],
        correct: 1,   // index of the correct option (0 or 1)
        topic: "concept",   // "services" (988/211) or "concept"
        explanation: "Shown after answering. HTML like <strong> is allowed."
    }

Every question needs a `topic`. "Skip this question" swaps in a question of the same topic, so the mix is always kept. Always use two options, keep them parallel in form and length, and change `TOTAL_QUESTIONS` to adjust how many are shown per play.

## Settings (top of `script.js`)

- `TOTAL_QUESTIONS`: questions per play
- `IDLE_RESET`: ms of inactivity before returning to the welcome screen
- `SKIP_COOLDOWN`: ms the Skip button stays locked after a skip
- The completion screen shows a completion time so staff can tell it's fresh. Prizes are for participation, not correct answers.

## Notes

After editing CSS or JS, hard refresh before testing, since browsers cache stylesheets. Test the full flow on a real phone before each event.
