# Tabling-Questions-Page

A short, mobile-first quiz for community outreach tabling events. Visitors scan a QR code, answer two quick questions about suicide prevention research and the 988 and 211 services, then show the completion screen at the table to receive a prize entry.

Built for Contact Community Services.

## Features

- Two random questions per play, with shuffled answer order and no repeats
- "Try Another Question" button to swap a question
- Short research-based explanation after each answer
- Completion screen with 988 and 211 information
- "All Questions & Answers" accordion showing the correct (✓) and incorrect (✗) option for every question

## Files

- `index.html`: page shell
- `styles.css`: all styling
- `script.js`: question pool and quiz flow
- `ContactLogo-Final.png`: logo (hidden if missing)

## Running locally

No build step. Open `index.html` in a browser, or run `python3 -m http.server 8000` in the project folder and visit `http://localhost:8000`.

## Editing questions

Questions are in the `questions` array at the top of `script.js`:

    {
        question: "Which is more accurate?",
        options: ["Option A", "Option B"],
        correct: 1,   // index of the correct option (0 or 1)
        explanation: "Shown after answering. HTML like <strong> is allowed."
    }

Always use two options, keep them parallel in form and length, and change `TOTAL_QUESTIONS` to adjust how many are shown per play.

## Notes

After editing CSS or JS, hard refresh before testing, since browsers cache stylesheets. Test the full flow on a real phone before each event.
