// ==============================
//  APP.JS (MODULAR ENTRYPOINT)
//  Handles: navigation, chat UI,
//  icon loading, module setup.
// ==============================

// IMPORT MODULES
import { initSpirituality } from "./spirituality.js";


// ==============================
// PAGE NAVIGATION
// ==============================

export function showPage(pageId) {
    const pages = document.querySelectorAll("[id^='page-']");
    pages.forEach(page => {
        page.classList.add("hidden-page");
        page.classList.remove("visible-page");
    });

    const active = document.getElementById(`page-${pageId}`);
    if (active) {
        active.classList.remove("hidden-page");
        active.classList.add("visible-page");
    }

    // refresh icons any time a page swaps
    lucide.createIcons();
}

// expose globally because HTML buttons call it
window.showPage = showPage;


// ==============================
// CHAT WINDOW TOGGLE
// ==============================

const chatWindow = document.getElementById("chat-window");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");

export function toggleChat() {
    const isHidden = chatWindow.classList.contains("hidden");

    if (isHidden) {
        chatWindow.classList.remove("hidden");
        iconOpen.classList.add("hidden");
        iconClose.classList.remove("hidden");
    } else {
        chatWindow.classList.add("hidden");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
    }
}

window.toggleChat = toggleChat;


// ==============================
// CHAT MODE SWITCHING (Copilot / Gemini)
// ==============================

const btnCopilot = document.getElementById("btn-copilot");
const btnGemini = document.getElementById("btn-gemini");
const chatStatus = document.getElementById("chat-status");

let currentMode = "copilot";

btnCopilot.addEventListener("click", () => {
    currentMode = "copilot";
    btnCopilot.classList.add("bg-indigo-600", "text-white");
    btnGemini.classList.remove("bg-indigo-600", "text-white");
    chatStatus.textContent = "MS Copilot Mode";
});

btnGemini.addEventListener("click", () => {
    currentMode = "gemini";
    btnGemini.classList.add("bg-indigo-600", "text-white");
    btnCopilot.classList.remove("bg-indigo-600", "text-white");
    chatStatus.textContent = "Gemini AI Mode";
});


// ==============================
// CHAT MESSAGE HANDLING
// ==============================

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function appendMessage(text, sender = "user") {
    const bubble = document.createElement("div");
    bubble.className = sender === "user"
        ? "flex justify-end"
        : "flex justify-start";

    bubble.innerHTML = `
        <div class="bg-white/10 text-gray-200 p-3 rounded-2xl max-w-[85%] text-sm">
            ${text}
        </div>
    `;

    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    if (!msg) return;

    appendMessage(msg, "user");
    chatInput.value = "";

    // Fake response
    setTimeout(() => {
        const reply = currentMode === "copilot"
            ? "Copilot is processing your request…"
            : "Gemini is thinking…";

        appendMessage(reply, "ai");
    }, 500);
});


// ==============================
// INITIALIZE EVERYTHING
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();     // refresh icons
    initSpirituality();       // load spirituality module
    showPage("dashboard");    // default view
});
