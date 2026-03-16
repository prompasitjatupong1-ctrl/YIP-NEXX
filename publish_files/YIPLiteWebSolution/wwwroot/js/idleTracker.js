window.idleTracker = (function () {
    let lastActivityUtc = Date.now();

    function touch() {
        lastActivityUtc = Date.now();
    }

    function init() {
        const events = [
            "mousemove",
            "mousedown",
            "keydown",
            "scroll",
            "touchstart",
            "click"
        ];

        events.forEach(e => {
            window.addEventListener(e, touch, { passive: true });
            document.addEventListener(e, touch, { passive: true });
        });

        touch();
    }

    function getLastActivityUtc() {
        return lastActivityUtc;
    }

    return {
        init,
        getLastActivityUtc
    };
})();