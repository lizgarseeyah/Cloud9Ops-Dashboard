// ==============================
//  APP.JS — FINAL WORKING VERSION
// ==============================

// IMPORT MODULES
import { initChat } from "./Modules/chat.js";
import { initMicrosoft } from "./Modules/microsoft.js";
import { initJobs } from "./Modules/OE.js";
import { initStocks } from "./Modules/stocks.js";
import { initFuture } from "./Modules/future.js";
import { initMarketing} from "./Modules/marketing.js";

// ⭐ IMPORT SPIRITUALITY MODULE ⭐
import { Spirituality } from "./Modules/spirituality.js";

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

    lucide.createIcons();
}

window.showPage = showPage;

// ==============================
// INITIALIZE EVERYTHING
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    // Initialize other modules
    initChat?.();
    initMicrosoft?.();
    initJobs?.();
    initStocks?.();
    initFuture?.();
    initMarketing

    // ⭐ Initialize Spirituality Module ⭐
    Spirituality.init();

    // Icons + default page
    lucide.createIcons();
    showPage("dashboard");
});
