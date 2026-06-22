/* StudyPlan AI - Central Application Coordinator */

// Global state variables
let isTimerRunning = false;
let timerInterval = null;
let focusSeconds = 0;

// Background choices database
const BG_PRESETS = [
    { id: "default", name: "Deep Glow", val: "default" },
    { id: "library", name: "Cozy Study Room", val: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop" },
    { id: "sunset", name: "Warm Sunset", val: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop" },
    { id: "abstract", name: "Digital Mesh", val: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" }
];

window.onload = function() {
    // Initialises Auth and persistent database
    initAuth();
};

function initAppComponents() {
    // Initialize focus stopwatch counts
    const savedSecs = localStorage.getItem("study_focus_seconds");
    focusSeconds = savedSecs ? parseInt(savedSecs) : 0;
    updateTimerDisplay();

    // Initialize modules
    initNotesProcessor();
    initScheduler();
    initChatAgent();
    initAnalytics();
    
    // Background Space customizer setups
    initBackgroundCustomizer();
    
    // Setup voice controls Web Speech API
    initVoiceSupport();
}

// VIEW SWITCHER (Hash-less SPA Routing)
function switchView(viewName) {
    // Hide all views
    const views = document.querySelectorAll(".app-view");
    views.forEach(v => v.classList.remove("active"));
    
    // Remove active sidebar link classes
    const links = document.querySelectorAll(".sidebar-link");
    links.forEach(l => l.classList.remove("active"));

    // Show selected view
    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) targetView.classList.add("active");
    
    // Style active sidebar menu item
    const activeLink = document.getElementById(`link-${viewName}`);
    if (activeLink) activeLink.classList.add("active");

    // Specific panel updates on focus
    if (viewName === 'analytics') {
        renderWeeklyHoursChart();
        renderProgressionCurve();
        renderLearningRecommendations();
    }
    if (viewName === 'planner') {
        renderCalendar();
        renderKanbanBoard();
    }
    if (viewName === 'study-vault') {
        renderMaterialsList();
    }
}

// STOPWATCH MODULE
function updateTimerDisplay() {
    const hours = Math.floor(focusSeconds / 3600);
    const minutes = Math.floor((focusSeconds % 3600) / 60);
    const seconds = focusSeconds % 60;
    
    const timeStr = 
        String(hours).padStart(2, '0') + ":" + 
        String(minutes).padStart(2, '0') + ":" + 
        String(seconds).padStart(2, '0');
        
    document.getElementById("timer-display").innerText = timeStr;
    
    // Also update focus stat header widgets
    const hrsFormatted = Math.floor(focusSeconds / 3600);
    const minsFormatted = Math.floor((focusSeconds % 3600) / 60);
    document.getElementById("stat-study-time").innerText = `${hrsFormatted}h ${minsFormatted}m`;
}

function toggleTimer() {
    const btn = document.getElementById("timer-toggle-btn");
    
    if (isTimerRunning) {
        // Pause timer
        clearInterval(timerInterval);
        isTimerRunning = false;
        btn.innerHTML = `<i data-lucide="play"></i> Start`;
        showToast("Stopwatch paused. Session hours saved.", "info");
        
        // Refresh analytics numbers
        refreshGoalsProgress();
        renderWeeklyHoursChart();
    } else {
        // Start timer
        isTimerRunning = true;
        btn.innerHTML = `<i data-lucide="pause"></i> Pause`;
        showToast("Stopwatch ticking. Focus session active!", "success");
        
        timerInterval = setInterval(() => {
            focusSeconds++;
            localStorage.setItem("study_focus_seconds", focusSeconds);
            updateTimerDisplay();
        }, 1000);
    }
    lucide.createIcons();
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    focusSeconds = 0;
    localStorage.setItem("study_focus_seconds", 0);
    updateTimerDisplay();
    
    const btn = document.getElementById("timer-toggle-btn");
    btn.innerHTML = `<i data-lucide="play"></i> Start`;
    lucide.createIcons();
    
    showToast("Stopwatch has been reset to zero.", "info");
    refreshGoalsProgress();
    renderWeeklyHoursChart();
}

// THEME & CUSTOM BACKGROUND CONTROLLERS
function setTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    
    // Remove active styling on dots
    const dots = document.querySelectorAll(".theme-dot");
    dots.forEach(d => d.classList.remove("active"));
    
    // Find dot corresponding to current theme and highlight
    let index = 0;
    if (themeName === 'light') index = 1;
    if (themeName === 'pastel') index = 2;
    if (themeName === 'cyberpunk') index = 3;
    dots[index].classList.add("active");
    
    showToast(`Switched workspace theme to: ${themeName.toUpperCase()}`, "success");
}

function initBackgroundCustomizer() {
    const container = document.getElementById("bg-presets-container");
    if (!container) return;
    container.innerHTML = "";

    let currentUser = JSON.parse(localStorage.getItem("current_user"));
    const savedBg = currentUser ? currentUser.background : "default";

    BG_PRESETS.forEach(preset => {
        const thumb = document.createElement("div");
        thumb.className = "bg-thumbnail";
        thumb.id = `bg-thumb-${preset.id}`;
        
        if (preset.val === "default") {
            thumb.style.background = "linear-gradient(135deg, #131b2e, #0b0f19)";
        } else {
            thumb.style.backgroundImage = `url(${preset.val})`;
        }

        if (preset.id === savedBg) {
            thumb.classList.add("active");
            applyBackgroundStyle(preset.val);
        }

        thumb.onclick = () => setWorkspaceBackground(preset.id, preset.val);
        
        // Add text label
        thumb.title = preset.name;
        container.appendChild(thumb);
    });
}

function setWorkspaceBackground(id, val) {
    // Save selection to user model
    let currentUser = JSON.parse(localStorage.getItem("current_user"));
    if (currentUser) {
        currentUser.background = id;
        localStorage.setItem("current_user", JSON.stringify(currentUser));
        
        let users = JSON.parse(localStorage.getItem("users") || "[]");
        const idx = users.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
        if (idx !== -1) {
            users[idx] = currentUser;
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    // Toggle active classes on thumbnails
    const thumbs = document.querySelectorAll(".bg-thumbnail");
    thumbs.forEach(t => t.classList.remove("active"));
    document.getElementById(`bg-thumb-${id}`).classList.add("active");

    applyBackgroundStyle(val);
    showToast(`Workspace backdrop set to: ${id.toUpperCase()}`, "success");
}

function applyBackgroundStyle(val) {
    if (val === "default") {
        document.body.style.backgroundImage = "none";
    } else {
        document.body.style.backgroundImage = `linear-gradient(rgba(11, 15, 25, 0.8), rgba(11, 15, 25, 0.85)), url(${val})`;
    }
}

// TOAST NOTIFICATIONS POPUP UTILITY
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let icon = "info";
    if (type === 'success') icon = "check-circle";
    if (type === 'warning') icon = "alert-triangle";
    if (type === 'danger') icon = "x-circle";

    toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    lucide.createIcons();

    // Fade out after 4 seconds
    setTimeout(() => {
        toast.style.animation = "fadeIn 0.2s ease reverse";
        setTimeout(() => toast.remove(), 200);
    }, 4000);
}
