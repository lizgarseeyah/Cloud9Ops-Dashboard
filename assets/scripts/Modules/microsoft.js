export function initMicrosoft(){}

// // Modules/microsoft.js

// let chatMode = 'copilot';

// export function initMicrosoft() {
//     setupChatListeners();
// }

// function setupChatListeners() {
//     const chatForm = document.getElementById('chat-form');
//     if (chatForm) {
//         chatForm.addEventListener('submit', async (e) => {
//             e.preventDefault(); const input = document.getElementById('chat-input');
//             if(input.value.trim()) {
//                 addMessage(input.value, 'user');
//                 const loadingId = addMessage('Thinking...', 'agent', true);
                
//                 // Mock response
//                 setTimeout(() => {
//                     const loadingMsg = document.getElementById(loadingId);
//                     if(loadingMsg) loadingMsg.remove();
//                     addMessage("I've received your request. (API Placeholder)", 'agent');
//                 }, 1000);
//                 input.value = '';
//             }
//         });
//     }
// }

// function addMessage(text, sender, isLoading=false) {
//     const container = document.getElementById('chat-messages');
//     const id = 'msg-' + Date.now();
//     if (container) {
//         container.insertAdjacentHTML('beforeend', `<div id="${id}" class="flex ${sender==='user'?'justify-end':'justify-start'}"><div class="${sender==='user'?'bg-indigo-600':'bg-white/10'} p-3 rounded-2xl text-sm mb-2 ${isLoading?'animate-pulse':''}">${text}</div></div>`);
//         container.scrollTop = container.scrollHeight;
//     }
//     return id;
// }

// // --- GLOBAL TOGGLES (Attached to Window) ---

// window.toggleChat = function() {
//     const chatWindow = document.getElementById('chat-window');
//     const iconOpen = document.getElementById('icon-open');
//     const iconClose = document.getElementById('icon-close');
    
//     if (chatWindow.classList.contains('hidden')) {
//         chatWindow.classList.remove('hidden');
//         chatWindow.classList.add('flex');
//         iconOpen.classList.add('hidden');
//         iconClose.classList.remove('hidden');
//     } else {
//         chatWindow.classList.add('hidden');
//         chatWindow.classList.remove('flex');
//         iconOpen.classList.remove('hidden');
//         iconClose.classList.add('hidden');
//     }
// }

// window.setChatMode = function(mode) { 
//     chatMode = mode; 
//     document.getElementById('chat-status').innerText = mode === 'copilot' ? 'MS Copilot Mode' : 'Gemini AI Mode'; 
    
//     // Visual toggle
//     if(mode === 'copilot') {
//         document.getElementById('btn-copilot').className = "px-3 py-1 text-xs rounded-md bg-indigo-600 text-white transition";
//         document.getElementById('btn-gemini').className = "px-3 py-1 text-xs rounded-md text-gray-400 hover:text-white transition";
//     } else {
//         document.getElementById('btn-gemini').className = "px-3 py-1 text-xs rounded-md bg-indigo-600 text-white transition";
//         document.getElementById('btn-copilot').className = "px-3 py-1 text-xs rounded-md text-gray-400 hover:text-white transition";
//     }
// }