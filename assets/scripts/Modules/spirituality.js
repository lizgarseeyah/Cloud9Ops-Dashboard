/* ============================================================
   SPIRITUALITY MODULE
   Handles:
   - Sin / Confession tracker
   - Rosary tracker
   - Confraternity toggle
   - Bead rendering
   - Bible progress
   - Prayer intentions
   ============================================================ */

export function initSpirituality() {
    setupConfessionTracker();
    setupRosaryTracker();
    setupBibleProgressTracker();
    setupPrayerWall();
    setupBeads();
}

/* ------------------------------------------------------------
   CONFESSION / SIN STATUS
------------------------------------------------------------ */
function setupConfessionTracker() {
    const sinInput = document.getElementById('sin-input');
    const badge = document.getElementById('soul-badge');
    const card = document.getElementById('soul-card');
    const confessBtn = document.getElementById('confess-btn');

    if (!sinInput) return;

    sinInput.addEventListener('input', () => {
        if (sinInput.value.trim().length > 0) {
            badge.className = "status-sin px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2";
            badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Needs Confession`;
            card.classList.add('border-red-500/50');
        } else {
            resetGraceState();
        }
    });

    if (confessBtn) {
        confessBtn.addEventListener('click', () => {
            sinInput.value = "";
            resetGraceState();
            alert("Status reset to Grace. Deus te absolvat.");
        });
    }

    function resetGraceState() {
        badge.className = "status-grace px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2";
        badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Grace`;
        card.classList.remove('border-red-500/50');
    }
}

/* ------------------------------------------------------------
   ROSARY TRACKER
------------------------------------------------------------ */
function setupRosaryTracker() {
    const rosaryBtn = document.getElementById('rosary-btn');
    const confraternity = document.getElementById('confraternity-toggle');

    if (!rosaryBtn) return;

    rosaryBtn.addEventListener('click', () => {
        const isConfraternity = confraternity?.checked;
        const msg = isConfraternity
          ? "Rosary Logged (Confraternity / Novena Mode Active)"
          : "Rosary Logged";

        alert(msg);

        // Reset beads after logging
        const beadRow = document.getElementById('bead-row');
        if (beadRow) {
            Array.from(beadRow.children).forEach(b => b.classList.remove('bg-yellow-500'));
        }
    });
}

/* ------------------------------------------------------------
   BEAD RENDERING (10 beads)
------------------------------------------------------------ */
function setupBeads() {
    const beadRow = document.getElementById('bead-row');
    if (!beadRow) return;

    beadRow.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        const bead = document.createElement('div');
        bead.className = "w-4 h-4 rounded-full border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500 hover:shadow-[0_0_10px_#eab308] transition-all cursor-pointer";
        bead.onclick = function () { this.classList.toggle('bg-yellow-500'); };
        beadRow.appendChild(bead);
    }
}

/* ------------------------------------------------------------
   BIBLE IN A YEAR PROGRESS
------------------------------------------------------------ */
function setupBibleProgressTracker() {
    const input = document.getElementById('bible-day-input');
    const bar = document.getElementById('bible-bar');
    const text = document.getElementById('bible-progress-text');
    const updateBtn = document.getElementById('bible-update-btn');

    if (!updateBtn) return;

    updateBtn.addEventListener('click', () => {
        const day = Number(input.value || 0);
        const pct = (day / 365) * 100;

        bar.style.width = pct + '%';
        text.innerText = `Day ${day} of 365`;
    });
}

/* ------------------------------------------------------------
   PRAYER INTENTIONS WALL
------------------------------------------------------------ */
function setupPrayerWall() {
    const addBtn = document.getElementById('intention-add-btn');
    const list = document.getElementById('intention-list');

    if (!addBtn) return;

    addBtn.addEventListener('click', () => {
        const text = prompt("Enter prayer intention:");
        if (!text) return;

        const div = document.createElement('div');
        div.className = "p-3 bg-white/5 rounded-lg border border-white/5 text-xs text-gray-300 group relative";
        div.innerHTML = `
            ${text}
            <button class="absolute top-2 right-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">&times;</button>
        `;

        div.querySelector('button').addEventListener('click', () => div.remove());

        list.prepend(div);
    });
}
