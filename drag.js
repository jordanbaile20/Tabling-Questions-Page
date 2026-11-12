// Drag-the-card effect for touch screens: the card follows your finger
// and springs back when you let go. Delete this file and its <script>
// tag in index.html to remove the effect.
(function(){
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = document.querySelector(".card");
    const content = document.getElementById("content");

    const MOVE_THRESHOLD = 8;   // px before a touch counts as a drag (keeps taps working)
    const MAX_PULL = 120;       // furthest the card can travel, px
    const PAGE_PADDING = 40;    // body padding top + bottom

    let start = null;
    let dragging = false;
    let scrollable = false;

    // Soft limit: moves freely near the start, resists as it gets farther
    function pull(d){ return MAX_PULL * Math.tanh(d / 160); }

    // Long screens (like All Questions & Answers) need normal vertical
    // scrolling, so on those only left/right dragging is enabled.
    function updateTouchAction(){
        scrollable = card.offsetHeight + PAGE_PADDING > window.innerHeight;
        card.style.touchAction = scrollable ? "pan-y" : "none";
    }
    new MutationObserver(updateTouchAction).observe(content, { childList: true });
    window.addEventListener("resize", updateTouchAction);
    updateTouchAction();

    card.addEventListener("pointerdown", e => {
        if(e.pointerType !== "touch" || !e.isPrimary) return;
        start = { x: e.clientX, y: e.clientY, id: e.pointerId };
        dragging = false;
    });

    card.addEventListener("pointermove", e => {
        if(!start || e.pointerId !== start.id) return;

        const dx = e.clientX - start.x;
        const dy = scrollable ? 0 : e.clientY - start.y;

        if(!dragging){
            if(Math.hypot(dx, dy) < MOVE_THRESHOLD) return;
            dragging = true;
            card.setPointerCapture(e.pointerId);
            card.classList.add("dragging");
            card.style.transition = "none";
        }

        const x = pull(dx);
        const y = pull(dy);
        card.style.transform =
            `translate(${x}px, ${y}px) rotate(${x / 18}deg) scale(.98)`;
    });

    function release(e){
        if(!start || e.pointerId !== start.id) return;
        const wasDragging = dragging;
        start = null;
        dragging = false;
        if(!wasDragging) return;

        card.classList.remove("dragging");
        card.style.transition = "transform .55s cubic-bezier(.2, 1.5, .4, 1)";
        card.style.transform = "";

        // Swallow the click that can follow a drag so buttons don't fire
        const swallow = ev => { ev.stopPropagation(); ev.preventDefault(); };
        card.addEventListener("click", swallow, true);
        setTimeout(() => card.removeEventListener("click", swallow, true), 50);
        setTimeout(() => { card.style.transition = ""; }, 600);
    }

    card.addEventListener("pointerup", release);
    card.addEventListener("pointercancel", release);
})();
