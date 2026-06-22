/* StudyPlan AI - AI Chat Assistant & Voice Commands Module */

// Sample AI agent response bank
const CHAT_INTENTS = [
    {
        keywords: ["mitosis", "meiosis", "cell", "replication", "division"],
        reply: `<p><strong>StudyPlan AI Concierge:</strong> Regarding Cell Replication, remember that <strong>Mitosis</strong> creates two genetically identical somatic (body) cells. The phases flow in the sequence <strong>P.M.A.T.</strong>:</p>
        <ul>
            <li><strong>Prophase:</strong> Chromatin condenses.</li>
            <li><strong>Metaphase:</strong> Chromosomes align in the middle.</li>
            <li><strong>Anaphase:</strong> Sister chromatids separate.</li>
            <li><strong>Telophase:</strong> Nuclei reform and cell splits.</li>
        </ul>
        <p>Alternatively, <strong>Meiosis</strong> is dedicated to sexual reproduction, producing four genetically unique haploid gamete cells with half the normal chromosome count.</p>`
    },
    {
        keywords: ["recursion", "big-o", "complexity", "stack", "algorithm"],
        reply: `<p><strong>StudyPlan AI Concierge:</strong> To master <strong>Recursion</strong>, ensure you have a solid <strong>Base Case</strong>. The base case tells the function when to stop calling itself. Without it, you will run out of call stack frames, resulting in a <strong>Stack Overflow</strong> error.</p>
        <p>For <strong>Big-O Complexity</strong>, we look at performance growth rates:</p>
        <ul>
            <li><strong>O(1):</strong> Operations take constant time.</li>
            <li><strong>O(N):</strong> Execution time grows linearly with input size.</li>
            <li><strong>O(log N):</strong> Highly efficient (e.g., Binary Search).</li>
            <li><strong>O(N²):</strong> Quadratic growth (e.g., Bubble Sort).</li>
        </ul>`
    },
    {
        keywords: ["freedom struggle", "independence", "gandhi", "national movement", "history"],
        reply: `<p><strong>StudyPlan AI Concierge:</strong> The <strong>Indian Freedom Struggle</strong> (1857-1947) was marked by major movements against British colonial rule. Remember the acronym <strong>S.N.C.Q.</strong>:</p>
        <ul>
            <li><strong>Sepoy Mutiny (1857):</strong> The first major rebellion against the East India Company.</li>
            <li><strong>Non-Cooperation (1920):</strong> Gandhiji's first massive boycott movement after the Jallianwala Bagh tragedy.</li>
            <li><strong>Civil Disobedience (1930):</strong> Initiated with the iconic Salt March to Dandi.</li>
            <li><strong>Quit India (1942):</strong> The decisive call to end British rule, featuring the slogan 'Do or Die'.</li>
        </ul>
        <p>Prominent leaders of the movement include Mahatma Gandhi, Jawaharlal Nehru, Netaji Subhas Chandra Bose, Sardar Vallabhbhai Patel, Bhagat Singh, and Bal Gangadhar Tilak.</p>`
    },
    {
        keywords: ["schedule", "planner", "exam", "task", "calendar"],
        reply: `<p><strong>StudyPlan AI Concierge:</strong> I can help optimize your calendar! I automatically schedule 2-day study buffers before your exams. Would you like me to schedule a study session for your upcoming projects?</p>`
    }
];

const DEFAULT_GREETING = `<p>Hi there! I'm your StudyPlan AI concierge. I can answer academic questions, summarize your uploaded notes, or manage your schedule via text or voice commands.</p>
<p>Try asking: <em>"Explain mitosis stages"</em> or say a voice command like <em>"Go to planner"</em>.</p>`;

let chatHistory = [];

function initChatAgent() {
    chatHistory = [
        { sender: "ai", text: DEFAULT_GREETING }
    ];
    renderChatHistory();
}

function renderChatHistory() {
    const container = document.getElementById("chat-history-container");
    if (!container) return;
    container.innerHTML = "";

    chatHistory.forEach(msg => {
        const bubble = document.createElement("div");
        bubble.className = `chat-msg ${msg.sender}`;
        bubble.innerHTML = msg.text;
        container.appendChild(bubble);
    });

    // Auto scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function handleChatKeyDown(event) {
    if (event.key === 'Enter') {
        submitChatMessage();
    }
}

function submitChatMessage() {
    const inputEl = document.getElementById("chat-user-input");
    const query = inputEl.value.trim();
    if (!query) return;

    // Add user message
    chatHistory.push({ sender: "student", text: `<p>${query}</p>` });
    inputEl.value = "";
    renderChatHistory();

    // Trigger AI response after a slight typing delay
    setTimeout(() => {
        const response = processAcademicQuery(query);
        chatHistory.push({ sender: "ai", text: response });
        renderChatHistory();
    }, 600);
}

function quickChatAsk(promptText) {
    chatHistory.push({ sender: "student", text: `<p>${promptText}</p>` });
    renderChatHistory();

    setTimeout(() => {
        const response = processAcademicQuery(promptText);
        chatHistory.push({ sender: "ai", text: response });
        renderChatHistory();
    }, 600);
}

function processAcademicQuery(query) {
    const cleanQuery = query.toLowerCase();

    // Check if voice nav command was sent in text chat
    const voiceNavSuccess = handleVoiceNavigation(cleanQuery);
    if (voiceNavSuccess) {
        return `<p><strong>StudyPlan AI Concierge:</strong> Understood. Switching view to your request.</p>`;
    }

    // Standard intent searches
    for (let intent of CHAT_INTENTS) {
        for (let kw of intent.keywords) {
            if (cleanQuery.includes(kw)) {
                return intent.reply;
            }
        }
    }

    // Default reply summarizing active doc or general advice
    return `<p><strong>StudyPlan AI Concierge:</strong> I searched your active notes regarding that query. Let's research more parameters! I recommend testing your active recall using the <strong>Practice & Quizzes</strong> tab or reviewing related online resources in your Goals panel.</p>`;
}

function clearChatHistory() {
    chatHistory = [
        { sender: "ai", text: `<p>Chat history cleared. How can I help you today?</p>` }
    ];
    renderChatHistory();
    showToast("Chat history cleared.", "info");
}


/* VOICE COMMAND MANAGER SUPPORT */
let speechRecognition = null;
let isGlobalListening = false;
let isChatListening = false;

function initVoiceSupport() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        speechRecognition = new SpeechRecognition();
        speechRecognition.continuous = false;
        speechRecognition.lang = 'en-US';
        speechRecognition.interimResults = false;

        speechRecognition.onstart = () => {
            updateListeningUI(true);
        };

        speechRecognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            showToast(`Voice Command Heard: "${transcript}"`, "info");
            
            if (isChatListening) {
                // Pipe to chat input
                const chatInput = document.getElementById("chat-user-input");
                if (chatInput) {
                    chatInput.value = transcript;
                    submitChatMessage();
                }
            } else {
                // Try executing global navigation command
                const executed = handleVoiceNavigation(transcript);
                if (!executed) {
                    // Feed into AI chat anyway
                    switchView('ai-chat');
                    const chatInput = document.getElementById("chat-user-input");
                    if (chatInput) {
                        chatInput.value = transcript;
                        submitChatMessage();
                    }
                }
            }
        };

        speechRecognition.onerror = (e) => {
            console.error("Speech recognition error", e);
            showToast("Voice command error. Check mic permissions.", "danger");
            updateListeningUI(false);
        };

        speechRecognition.onend = () => {
            updateListeningUI(false);
        };
    } else {
        console.warn("Web Speech API not supported in this browser.");
    }
}

function updateListeningUI(listening) {
    const badge = document.getElementById("voice-badge");
    const statusText = document.getElementById("voice-status");
    const chatMic = document.getElementById("voice-chat-mic");

    if (listening) {
        badge.classList.add("listening");
        statusText.innerText = "Listening...";
        if (isChatListening && chatMic) {
            chatMic.classList.add("active");
        }
    } else {
        badge.classList.remove("listening");
        statusText.innerText = "Voice Command";
        if (chatMic) {
            chatMic.classList.remove("active");
        }
        isGlobalListening = false;
        isChatListening = false;
    }
}

function toggleVoiceListening() {
    if (!speechRecognition) {
        // Fallback simulation for unsupported browsers/headless testing
        simulateVoiceCommandPrompt();
        return;
    }

    if (isGlobalListening) {
        speechRecognition.stop();
    } else {
        isChatListening = false;
        isGlobalListening = true;
        speechRecognition.start();
    }
}

function toggleChatVoiceInput() {
    if (!speechRecognition) {
        simulateVoiceCommandPrompt(true);
        return;
    }

    if (isChatListening) {
        speechRecognition.stop();
    } else {
        isGlobalListening = false;
        isChatListening = true;
        speechRecognition.start();
    }
}

// Map verbal instructions to screen routes or timer controls
function handleVoiceNavigation(phrase) {
    const words = phrase.toLowerCase();
    
    // View routes mapping
    if (words.includes("dashboard") || words.includes("home")) {
        switchView("dashboard");
        showToast("Navigated to Dashboard via Voice", "success");
        return true;
    }
    if (words.includes("vault") || words.includes("notes") || words.includes("material")) {
        switchView("study-vault");
        showToast("Navigated to Study Vault via Voice", "success");
        return true;
    }
    if (words.includes("practice") || words.includes("quiz") || words.includes("flashcard")) {
        switchView("quiz-flashcards");
        showToast("Navigated to Practice View via Voice", "success");
        return true;
    }
    if (words.includes("planner") || words.includes("calendar") || words.includes("schedule")) {
        switchView("planner");
        showToast("Navigated to Planner via Voice", "success");
        return true;
    }
    if (words.includes("assistant") || words.includes("chat") || words.includes("ask")) {
        switchView("ai-chat");
        showToast("Navigated to AI Chat via Voice", "success");
        return true;
    }
    if (words.includes("analytics") || words.includes("goal") || words.includes("progress")) {
        switchView("analytics");
        showToast("Navigated to Analytics via Voice", "success");
        return true;
    }
    if (words.includes("setting") || words.includes("theme") || words.includes("style")) {
        switchView("settings");
        showToast("Navigated to Settings via Voice", "success");
        return true;
    }

    // Stopwatch Controls
    if (words.includes("start timer") || words.includes("start stopwatch")) {
        if (!isTimerRunning) {
            toggleTimer();
            showToast("Timer Started via Voice", "success");
        }
        return true;
    }
    if (words.includes("stop timer") || words.includes("pause timer") || words.includes("stop stopwatch") || words.includes("pause stopwatch")) {
        if (isTimerRunning) {
            toggleTimer();
            showToast("Timer Paused via Voice", "success");
        }
        return true;
    }
    if (words.includes("reset timer") || words.includes("reset stopwatch")) {
        resetTimer();
        showToast("Timer Reset via Voice", "success");
        return true;
    }

    // Open Modal Controls
    if (words.includes("create task") || words.includes("add task") || words.includes("new task") || words.includes("create event")) {
        openCreateTaskModal();
        showToast("Opened Create Task Modal via Voice", "success");
        return true;
    }

    return false;
}

// Fallback voice simulation box if Web Speech API isn't enabled or in virtual testing envs
function simulateVoiceCommandPrompt(forChat = false) {
    const simulatedCommand = prompt("Voice Command Simulation Mode:\nType a verbal command (e.g. 'go to planner', 'start timer', 'explain mitosis'):");
    if (!simulatedCommand) return;
    
    showToast(`Simulating spoken phrase: "${simulatedCommand}"`, "info");
    
    if (forChat) {
        const chatInput = document.getElementById("chat-user-input");
        if (chatInput) {
            chatInput.value = simulatedCommand;
            submitChatMessage();
        }
    } else {
        const executed = handleVoiceNavigation(simulatedCommand);
        if (!executed) {
            switchView('ai-chat');
            const chatInput = document.getElementById("chat-user-input");
            if (chatInput) {
                chatInput.value = simulatedCommand;
                submitChatMessage();
            }
        }
    }
}
