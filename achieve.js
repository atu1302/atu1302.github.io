(() => {
    const STORAGE_KEY = 'pointsHistory';

    function loadHistory() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        try {
            const arr = JSON.parse(raw);
            return Array.isArray(arr) ? arr.map(Number).filter(n => Number.isFinite(n) && n > 0) : [];
        } catch (e) {
            return [];
        }
    }

    function saveHistory(arr) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    }

    function getTotal(arr) {
        return arr.reduce((s, v) => s + v, 0);
    }

    function updateDisplay() {
        const arr = loadHistory();
        const arrayEl = document.getElementById('points-array');
        const totalEl = document.getElementById('points-total');
        if (arrayEl) arrayEl.textContent = '[' + arr.join(', ') + ']';
        if (totalEl) totalEl.textContent = String(getTotal(arr));
    }

    function addPoints(n) {
        n = Number(n) || 0;
        if (n <= 0) return;
        const arr = loadHistory();
        arr.push(n);
        saveHistory(arr);
        updateDisplay();
    }

    function clearHistory() {
        localStorage.removeItem(STORAGE_KEY);
        updateDisplay();
    }

    // Expose a small programmatic API for the Quests app to award points.
    window.achievePoints = {
        addPoints,
        getHistory: loadHistory,
        getTotal: () => getTotal(loadHistory()),
        _clearForDebug: clearHistory
    };

    document.addEventListener('DOMContentLoaded', () => {
        updateDisplay();
    });
})();
