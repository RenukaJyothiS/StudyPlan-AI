/* StudyPlan AI - Calendar Scheduler & Reminders Module */

// Default seed planner events
const SEED_TASKS = [
    { id: "task-1", title: "Study: Indian Freedom Struggle", desc: "Spend 2 hours reviewing the Dandi March and Quit India notes", date: "2026-06-23", category: "study", status: "todo" },
    { id: "task-2", title: "Calculus Semester Exam", desc: "Integrals, limits, and derivative applications", date: "2026-06-24", category: "exam", status: "todo" },
    { id: "task-3", title: "Class 10 Biology Lab Report", desc: "Submit final cell division observation sheet", date: "2026-06-26", category: "project", status: "progress" },
    { id: "task-4", title: "DSA Recursion Assignment", desc: "Implement custom binary tree search algorithm", date: "2026-06-29", category: "homework", status: "review" }
];

let plannerTasks = [];
let currentCalendarDate = new Date(2026, 5, 22); // Target default June 22, 2026 (Monday)

function initScheduler() {
    let saved = localStorage.getItem("planner_tasks");
    if (saved) {
        plannerTasks = JSON.parse(saved);
    } else {
        plannerTasks = [...SEED_TASKS];
        localStorage.setItem("planner_tasks", JSON.stringify(plannerTasks));
    }
    
    renderCalendar();
    renderUpcomingEventsList();
    renderDashboardReminders();
    renderKanbanBoard();
    updateNextDeadlineWidget();
}

// Calendar Month Grid Generator
function renderCalendar() {
    const gridContainer = document.getElementById("calendar-grid-container");
    if (!gridContainer) return;
    
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Set title
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("calendar-title").innerText = `${monthNames[month]} ${year}`;
    
    // Clear previous cell divs (keep day labels)
    const labelsCount = 7;
    while (gridContainer.children.length > labelsCount) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();
    
    // Render padding cells from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        const cell = document.createElement("div");
        cell.className = "calendar-cell other-month";
        
        const dateNum = prevMonthTotalDays - i;
        cell.innerHTML = `<div class="calendar-date-number">${dateNum}</div>`;
        gridContainer.appendChild(cell);
    }
    
    // Render current month cells
    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement("div");
        cell.className = "calendar-cell";
        
        // Add current day highlighting
        const cellDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (day === 22 && month === 5 && year === 2026) {
            cell.classList.add("today");
        }
        
        cell.innerHTML = `
            <div class="calendar-date-number">${day}</div>
            <div class="calendar-events" id="cal-events-${cellDateString}"></div>
        `;
        
        // Add events dots
        const eventsContainer = cell.querySelector(".calendar-events");
        const dayEvents = plannerTasks.filter(t => t.date === cellDateString);
        
        dayEvents.forEach(evt => {
            const dot = document.createElement("div");
            dot.className = `calendar-event-dot ${evt.category}`;
            dot.innerText = evt.title;
            dot.title = `${evt.title}: ${evt.desc}`;
            eventsContainer.appendChild(dot);
        });
        
        cell.onclick = () => {
            showToast(`Selected date: ${cellDateString}. Adding event.`, "info");
            openCreateTaskModal(cellDateString);
        };
        
        gridContainer.appendChild(cell);
    }
    
    // Padding cells from next month
    const totalCells = gridContainer.children.length - labelsCount;
    const paddingNeeded = 42 - totalCells; // Standard 6-row grid
    for (let i = 1; i <= paddingNeeded; i++) {
        const cell = document.createElement("div");
        cell.className = "calendar-cell other-month";
        cell.innerHTML = `<div class="calendar-date-number">${i}</div>`;
        gridContainer.appendChild(cell);
    }
}

function prevCalendarMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar();
}

function nextCalendarMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar();
}

// Side event checks
function renderUpcomingEventsList() {
    const listEl = document.getElementById("upcoming-events-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    // Sort tasks by date
    const sorted = [...plannerTasks].sort((a, b) => new Date(a.date) - new Date(b.date));
    const active = sorted.filter(t => t.status !== 'completed');

    if (active.length === 0) {
        listEl.innerHTML = "<p style='color:var(--text-secondary); text-align:center;'>No upcoming events.</p>";
        return;
    }

    active.forEach(task => {
        const card = document.createElement("div");
        card.className = "material-card";
        
        let colorTheme = "border-left: 4px solid var(--accent-color);";
        if (task.category === 'exam') colorTheme = "border-left: 4px solid var(--danger);";
        if (task.category === 'project') colorTheme = "border-left: 4px solid var(--accent-color);";
        if (task.category === 'homework') colorTheme = "border-left: 4px solid var(--warning);";
        if (task.category === 'study') colorTheme = "border-left: 4px solid var(--success);";
        
        card.style = colorTheme;
        card.innerHTML = `
            <div style="flex-grow: 1;">
                <div style="font-weight:700; font-size:0.9rem;">${task.title}</div>
                <div style="font-size:0.75rem; color:var(--text-secondary);">${task.desc}</div>
                <div style="font-size:0.7rem; font-weight:600; margin-top:4px;"><i data-lucide="clock" style="width:10px; height:10px; vertical-align:middle; margin-right:4px;"></i> Due: ${task.date}</div>
            </div>
            <button class="btn btn-secondary" style="padding: 4px 6px;" onclick="markTaskCompleted('${task.id}')">
                <i data-lucide="check" style="width:12px; height:12px; color:var(--success)"></i>
            </button>
        `;
        listEl.appendChild(card);
    });
    lucide.createIcons();
}

// Reminders loader for Dashboard
function renderDashboardReminders() {
    const container = document.getElementById("reminder-container");
    if (!container) return;
    container.innerHTML = "";

    const todayDate = new Date(2026, 5, 22);
    const sorted = [...plannerTasks].filter(t => t.status !== 'completed').sort((a, b) => new Date(a.date) - new Date(b.date));

    if (sorted.length === 0) {
        container.innerHTML = `
            <div class="glass-panel" style="padding: 16px; text-align: center;">
                <p style="color: var(--text-secondary);">All caught up! No upcoming tasks.</p>
            </div>
        `;
        return;
    }

    sorted.slice(0, 3).forEach(task => {
        const due = new Date(task.date);
        const diffTime = Math.ceil((due - todayDate) / (1000 * 60 * 60 * 24));
        
        let diffText = "";
        let alarmIcon = "bell";
        let alarmStyle = "background: rgba(99, 102, 241, 0.15); color: var(--accent-color);";

        if (diffTime === 0) {
            diffText = "DUE TODAY";
            alarmIcon = "alert-triangle";
            alarmStyle = "background: rgba(239, 68, 68, 0.15); color: var(--danger); font-weight:700;";
        } else if (diffTime === 1) {
            diffText = "DUE TOMORROW";
            alarmIcon = "alert-circle";
            alarmStyle = "background: rgba(245, 158, 11, 0.15); color: var(--warning); font-weight:700;";
        } else {
            diffText = `In ${diffTime} days`;
        }

        const card = document.createElement("div");
        card.className = "glass-panel";
        card.style = "padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;";
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div class="stat-icon" style="width:36px; height:36px; border-radius:50%; font-size:1.1rem; display:flex; align-items:center; justify-content:center; ${alarmStyle}">
                    <i data-lucide="${alarmIcon}"></i>
                </div>
                <div>
                    <div style="font-weight: 600; font-size: 0.9rem;">${task.title}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${task.desc}</div>
                </div>
            </div>
            <span style="font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; font-weight: 600; ${alarmStyle}">${diffText}</span>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}

function updateNextDeadlineWidget() {
    const todayDate = new Date(2026, 5, 22);
    const incomplete = plannerTasks.filter(t => t.status !== 'completed' && new Date(t.date) >= todayDate);
    const sorted = incomplete.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const label = document.getElementById("stat-next-deadline");
    if (!label) return;

    if (sorted.length > 0) {
        const next = sorted[0];
        const dateParts = next.date.split('-');
        label.innerText = `${dateParts[1]}/${dateParts[2]}`;
        label.title = `Next: ${next.title} on ${next.date}`;
    } else {
        label.innerText = "None";
        label.title = "";
    }
}

// Add task / event hooks
let defaultSelectedDateStr = "";

function openCreateTaskModal(dateStr = "") {
    defaultSelectedDateStr = dateStr;
    const modal = document.getElementById("create-task-modal");
    modal.classList.add("active");

    const dateField = document.getElementById("task-date");
    if (dateStr) {
        dateField.value = dateStr;
    } else {
        // Default to June 22, 2026
        dateField.value = "2026-06-22";
    }
}

function closeCreateTaskModal() {
    document.getElementById("create-task-modal").classList.remove("active");
}

function handleCreateTaskSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("task-title").value.trim();
    const desc = document.getElementById("task-description").value.trim();
    const date = document.getElementById("task-date").value;
    const category = document.getElementById("task-category").value;
    const status = document.getElementById("task-board-status").value;

    const newTask = {
        id: "task-" + Date.now(),
        title,
        desc,
        date,
        category,
        status
    };

    plannerTasks.push(newTask);

    // AI Concierge Schedule automation:
    // If adding an Exam, automatically add a study prep session 2 days beforehand.
    if (category === 'exam') {
        const examDate = new Date(date);
        examDate.setDate(examDate.getDate() - 2);
        const prepDateStr = examDate.toISOString().split('T')[0];
        
        const autoPrepTask = {
            id: "task-auto-" + Date.now(),
            title: `Study Prep: ${title} Revision`,
            desc: `Auto-scheduled 2-day study reminder buffer to prep for ${title}.`,
            date: prepDateStr,
            category: "study",
            status: "todo"
        };
        plannerTasks.push(autoPrepTask);
        showToast("AI Agent auto-scheduled a preparatory study session 2 days prior to this exam!", "success");
    }

    localStorage.setItem("planner_tasks", JSON.stringify(plannerTasks));
    showToast("Task scheduled successfully!", "success");
    
    // Clear and close
    document.getElementById("task-title").value = "";
    document.getElementById("task-description").value = "";
    closeCreateTaskModal();

    // Redraw components
    renderCalendar();
    renderUpcomingEventsList();
    renderDashboardReminders();
    renderKanbanBoard();
    updateNextDeadlineWidget();
    refreshGoalsProgress();
    
    // Trigger desktop notification mockup
    triggerDesktopNotification(title, `New task due on ${date}`);
}

function markTaskCompleted(id) {
    const idx = plannerTasks.findIndex(t => t.id === id);
    if (idx !== -1) {
        plannerTasks[idx].status = 'completed';
        localStorage.setItem("planner_tasks", JSON.stringify(plannerTasks));
        showToast("Task completed! Well done.", "success");
        
        renderCalendar();
        renderUpcomingEventsList();
        renderDashboardReminders();
        renderKanbanBoard();
        updateNextDeadlineWidget();
        refreshGoalsProgress();
    }
}

// System notifications API integration
function requestNotificationAccess() {
    if (!("Notification" in window)) {
        showToast("This browser does not support desktop alerts.", "warning");
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            showToast("System notifications enabled successfully!", "success");
            new Notification("StudyPlan AI", {
                body: "Academic reminders are now sync'd with your desktop.",
                icon: "https://unpkg.com/lucide-static@0.294.0/icons/brain.svg"
            });
        } else {
            showToast("Notification permission denied.", "warning");
        }
    });
}

function triggerDesktopNotification(title, message) {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`StudyPlan AI: ${title}`, {
            body: message,
            icon: "https://unpkg.com/lucide-static@0.294.0/icons/calendar.svg"
        });
    }
}
