/* StudyPlan AI - Projects & Kanban Board & Goals Tracking Module */

// Drag and drop HTML5 event listeners
function allowDrop(event) {
    event.preventDefault();
}

function drag(event, taskId) {
    event.dataTransfer.setData("text/plain", taskId);
}

function drop(event, statusColumn) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    
    // Update task status in scheduler array
    const idx = plannerTasks.findIndex(t => t.id === taskId);
    if (idx !== -1) {
        const oldStatus = plannerTasks[idx].status;
        plannerTasks[idx].status = statusColumn;
        localStorage.setItem("planner_tasks", JSON.stringify(plannerTasks));
        
        // Notify
        showToast(`Moved task to: ${statusColumn.toUpperCase()}`, "success");

        // Reload views
        renderKanbanBoard();
        renderUpcomingEventsList();
        renderCalendar();
        renderDashboardReminders();
        updateNextDeadlineWidget();
        refreshGoalsProgress();
    }
}

// Render Kanban Column Lists
function renderKanbanBoard() {
    const columns = ['todo', 'progress', 'review', 'completed'];
    
    columns.forEach(col => {
        const container = document.getElementById(`kanban-${col}`);
        const countBadge = document.getElementById(`kanban-${col}-count`);
        if (!container) return;

        container.innerHTML = "";
        
        const colTasks = plannerTasks.filter(t => t.status === col);
        countBadge.innerText = colTasks.length;

        if (colTasks.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:0.75rem; border:1px dashed var(--border-color); border-radius: var(--border-radius-sm)">Column Empty</div>`;
            return;
        }

        colTasks.forEach(task => {
            const card = document.createElement("div");
            card.className = "kanban-card";
            card.draggable = true;
            card.ondragstart = (e) => drag(e, task.id);
            
            // Get category styling
            let catTag = "";
            if (task.category === 'exam') catTag = `<span class="tag-badge exam">Exam</span>`;
            else if (task.category === 'project') catTag = `<span class="tag-badge project">Project</span>`;
            else if (task.category === 'homework') catTag = `<span class="tag-badge homework">Homework</span>`;
            else catTag = `<span class="tag-badge" style="background:rgba(16, 185, 129, 0.15); color:var(--success)">Study</span>`;

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:8px;">
                    <div class="kanban-card-title">${task.title}</div>
                    ${catTag}
                </div>
                <div class="kanban-card-desc">${task.desc}</div>
                <div class="kanban-card-meta">
                    <span><i data-lucide="calendar" style="width:10px; height:10px; vertical-align:middle; margin-right:4px;"></i>${task.date}</span>
                    ${col !== 'completed' ? `<span style="cursor:pointer; color:var(--success)" onclick="markTaskCompleted('${task.id}')"><i data-lucide="check" style="width:12px; height:12px;"></i></span>` : ""}
                </div>
            `;
            container.appendChild(card);
        });
    });
    
    lucide.createIcons();
    renderDashboardTasksPreview();
}

// Render simplified task previews on the dashboard
function renderDashboardTasksPreview() {
    const previewContainer = document.getElementById("dash-tasks-preview");
    if (!previewContainer) return;
    previewContainer.innerHTML = "";

    const activeTasks = plannerTasks.filter(t => t.status !== 'completed').slice(0, 3);

    if (activeTasks.length === 0) {
        previewContainer.innerHTML = `<p style="color:var(--text-secondary); text-align:center; padding:12px;">No active assignments. Create one in the Planner!</p>`;
        return;
    }

    activeTasks.forEach(task => {
        const item = document.createElement("div");
        item.className = "material-card";
        item.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
                <span class="tag-badge ${task.category}" style="text-transform: capitalize;">${task.category}</span>
                <div>
                    <div style="font-weight:600; font-size:0.9rem;">${task.title}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary);">Deadline: ${task.date} • Column: ${task.status.toUpperCase()}</div>
                </div>
            </div>
            <button class="btn btn-secondary" style="padding: 4px 8px; font-size:0.75rem;" onclick="switchView('planner')">Open Board</button>
        `;
        previewContainer.appendChild(item);
    });
}

// Goal Wheels Progress Calculations
function refreshGoalsProgress() {
    let currentUser = JSON.parse(localStorage.getItem("current_user"));
    if (!currentUser) return;

    // Study Hours Goal
    const currentStudySecs = parseInt(localStorage.getItem("study_focus_seconds") || "0");
    const currentStudyHrs = currentStudySecs / 3600;
    const hoursGoal = currentUser.hoursGoal || 15;
    const hoursPercent = Math.min(Math.round((currentStudyHrs / hoursGoal) * 100), 100);
    
    updateProgressRing("ring-study-hours", hoursPercent);
    document.getElementById("ring-study-hours-text").innerText = `${hoursPercent}%`;
    document.getElementById("analytics-focus-hours").innerText = currentStudyHrs.toFixed(1);
    document.getElementById("analytics-focus-goal").innerText = hoursGoal;

    // Quiz Score Goal
    const scores = JSON.parse(localStorage.getItem("quiz_scores_history") || "[]");
    let avgScore = 0;
    if (scores.length > 0) {
        const sum = scores.reduce((acc, curr) => acc + curr.score, 0);
        avgScore = Math.round(sum / scores.length);
    }
    updateProgressRing("ring-quiz-score", avgScore);
    document.getElementById("ring-quiz-text").innerText = `${avgScore}%`;

    // Tasks Finished Goal
    const totalTasks = plannerTasks.length;
    const completedTasks = plannerTasks.filter(t => t.status === 'completed').length;
    const tasksPercent = totalTasks > 0 ? Math.min(Math.round((completedTasks / totalTasks) * 100), 100) : 0;
    
    updateProgressRing("ring-tasks", tasksPercent);
    document.getElementById("ring-tasks-text").innerText = `${tasksPercent}%`;
    document.getElementById("analytics-tasks-done").innerText = completedTasks;
    document.getElementById("analytics-tasks-total").innerText = totalTasks;

    // Active Topics Goal
    const activeMaterials = studyMaterials.length;
    // Set 5 active materials as the '100%' benchmark
    const materialsPercent = Math.min(Math.round((activeMaterials / 5) * 100), 100);
    
    updateProgressRing("ring-materials", materialsPercent);
    document.getElementById("ring-materials-text").innerText = `${activeMaterials}`;
}

function updateProgressRing(ringId, percent) {
    const circle = document.getElementById(ringId);
    if (!circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}
