// ======================================================
// Nexus Dashboard — Spirituality Module (Final + Working)
// ======================================================

const API = "http://localhost:5001/api/sins";

export const Spirituality = {
    soulState: "Grace",

    // --------------------------------------------------
    // Toast Notification
    // --------------------------------------------------
    toast(message, type = "success") {
        const div = document.createElement("div");

        div.className =
            "fixed bottom-6 right-6 px-4 py-3 rounded-xl text-white shadow-lg z-[9999] opacity-0 transition-all duration-300 " +
            (type === "error"
                ? "bg-red-600"
                : type === "warning"
                ? "bg-yellow-600"
                : "bg-green-600");

        div.textContent = message;
        document.body.appendChild(div);

        requestAnimationFrame(() => (div.style.opacity = "1"));

        setTimeout(() => {
            div.style.opacity = "0";
            setTimeout(() => div.remove(), 300);
        }, 2000);
    },

    // --------------------------------------------------
    // API Wrapper
    // --------------------------------------------------
    async api(endpoint, options = {}) {
        try {
            const res = await fetch(`${API}${endpoint}`, {
                headers: { "Content-Type": "application/json" },
                ...options
            });
            if (!res.ok) throw new Error("API error");
            return res.json();
        } catch (err) {
            this.toast("Something went wrong.", "error");
            console.error(err);
        }
    },

    // --------------------------------------------------
    // UI Helpers
    // --------------------------------------------------
    setLoading(id, loading) {
        const btn = document.getElementById(id);
        if (!btn) return;

        if (loading) {
            btn.dataset.original = btn.innerHTML;
            btn.innerHTML = `
                <div class="flex items-center gap-2 justify-center">
                    <span class="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                </div>
            `;
            btn.disabled = true;
        } else {
            btn.innerHTML = btn.dataset.original;
            btn.disabled = false;
        }
    },

    // --------------------------------------------------
    // Soul State Badge
    // --------------------------------------------------
    renderSoulState() {
        const badge = document.getElementById("soul-badge");
        const text = document.getElementById("dashboard-soul-status");
        const light = document.getElementById("dashboard-soul-indicator");

        const isGrace = this.soulState === "Grace";

        if (badge) {
            badge.className =
                "px-3 py-1 rounded-full text-[10px] flex items-center gap-1 " +
                (isGrace ? "bg-green-900/40 text-green-300" : "bg-red-900/40 text-red-300");

            badge.innerHTML = `
                <span class="w-1.5 h-1.5 rounded-full ${
                    isGrace ? "bg-green-400" : "bg-red-500"
                } animate-pulse"></span>
                ${this.soulState}
            `;
        }

        if (text) text.textContent = this.soulState;
        if (light) light.style.background = isGrace ? "#22c55e" : "#ef4444";
    },

    // --------------------------------------------------
    // Submit Sin
    // --------------------------------------------------
    async logSin() {
        const input = document.getElementById("sin-input");
        const value = input.value.trim();
        if (!value) return this.toast("Please enter something first.", "warning");

        this.setLoading("sin-submit-btn", true);

        await this.api("/add", {
            method: "POST",
            body: JSON.stringify({ text: value })
        });

        input.value = "";
        this.toast("Sin submitted.");
        await this.updateState();

        this.setLoading("sin-submit-btn", false);
    },

    // --------------------------------------------------
    // Confess (Clear Sins)
    // --------------------------------------------------
    async confess() {
        this.setLoading("confess-btn", true);

        await this.api("/clear", { method: "POST" });

        this.toast("All sins cleared — You are in Grace.");
        await this.updateState();

        this.setLoading("confess-btn", false);
    },

    // --------------------------------------------------
    // Update State (Grace / Condemnation)
    // --------------------------------------------------
    async updateState() {
        const data = await this.api("/state");
        if (data?.state) this.soulState = data.state;
        this.renderSoulState();
    },

    // --------------------------------------------------
    // Initialize
    // --------------------------------------------------
    async init() {
        await this.updateState();
    }
};

// ------------------------------------------------------
// Expose functions globally for HTML onclick()
// ------------------------------------------------------
window.logSin = () => Spirituality.logSin();
window.confess = () => Spirituality.confess();
