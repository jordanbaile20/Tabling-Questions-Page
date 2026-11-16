// Help features: definition bubbles for [[terms]] and the "?" hint toggle.
// Definitions live in GLOSSARY (questions.js).

// Turns [[term]] into a tappable word. Unknown terms fall back to plain text.
function withTerms(html){
    return html.replace(/\[\[(.+?)\]\]/g, (m, word) => {
        const key = word.toLowerCase();
        return GLOSSARY[key]
            ? `<button type="button" class="term" data-term="${key}">${word}</button>`
            : word;
    });
}

function toggleHint(){
    const box = document.getElementById("hintBox");
    const btn = document.getElementById("hintBtn");
    if(!box || !btn) return;
    const opening = box.hidden;
    box.hidden = !opening;
    btn.setAttribute("aria-expanded", opening);
    if(opening) track("hint", { question: chosenQuestions[currentQuestion].question });
}

(function(){
    const canHover = window.matchMedia("(hover: hover)").matches;
    const bubble = document.createElement("div");
    bubble.id = "termBubble";
    bubble.className = "term-bubble";
    bubble.setAttribute("role", "tooltip");
    bubble.hidden = true;
    document.body.appendChild(bubble);

    let current = null;

    function show(btn){
        current = btn;
        bubble.textContent = GLOSSARY[btn.dataset.term];
        bubble.hidden = false;
        btn.setAttribute("aria-describedby", "termBubble");

        // Bubble lives on <body> so the card's overflow and drag transform can't clip it
        const r = btn.getBoundingClientRect();
        const w = bubble.offsetWidth, h = bubble.offsetHeight;
        const left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 8));
        let top = r.bottom + 8;
        if(top + h > window.innerHeight - 8) top = r.top - h - 8;
        bubble.style.left = left + "px";
        bubble.style.top = top + "px";
    }

    function hide(){
        if(current) current.removeAttribute("aria-describedby");
        current = null;
        bubble.hidden = true;
    }

    document.addEventListener("click", e => {
        const t = e.target.closest(".term");
        if(!t) return hide();
        if(current === t && !canHover) return hide();   // second tap closes on touch
        show(t);
        if(typeof track === "function") track("term", { term: t.dataset.term });
    });

    if(canHover){
        document.addEventListener("mouseover", e => {
            const t = e.target.closest(".term");
            if(t && t !== current) show(t);
        });
        document.addEventListener("mouseout", e => {
            const t = e.target.closest(".term");
            if(t && !(e.relatedTarget && t.contains(e.relatedTarget))) hide();
        });
    }

    document.addEventListener("keydown", e => { if(e.key === "Escape") hide(); });
    window.addEventListener("scroll", hide, { passive: true });
    new MutationObserver(hide).observe(document.getElementById("content"), { childList: true });
})();
