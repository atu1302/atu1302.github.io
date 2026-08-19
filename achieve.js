(() => {
    const STORAGE_KEY = 'points';

    function loadPoints() {
        const v = parseInt(localStorage.getItem(STORAGE_KEY), 10);
        return Number.isFinite(v) ? v : 0;
    }

    function savePoints(n) {
        localStorage.setItem(STORAGE_KEY, String(n));
    }

    function updateDisplay(n) {
        const el = document.getElementById('points-value');
        if (el) el.textContent = String(n);
    }

    function changePoints(delta) {
        const cur = loadPoints();
        const next = Math.max(0, cur + delta);
        savePoints(next);
        updateDisplay(next);
    }

    function resetPoints() {
        savePoints(0);
        updateDisplay(0);
    }

    document.addEventListener('DOMContentLoaded', () => {
        updateDisplay(loadPoints());

        const add1 = document.getElementById('add1');
        if (add1) add1.addEventListener('click', () => changePoints(1));

        const add5 = document.getElementById('add5');
        if (add5) add5.addEventListener('click', () => changePoints(5));

        const sub1 = document.getElementById('sub1');
        if (sub1) sub1.addEventListener('click', () => changePoints(-1));

        const resetBtn = document.getElementById('resetPoints');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            if (confirm('Reset points to 0?')) resetPoints();
        });
    });
})();
