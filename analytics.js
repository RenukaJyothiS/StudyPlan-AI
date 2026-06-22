/* StudyPlan AI - Performance Analytics & Recommender Module */

// Mocked baseline daily study hours for this week (M, T, W, T, F, S, S)
let baseStudyHours = [1.5, 2.8, 1.0, 3.2, 0.8, 2.0, 0.0]; 

const RECOMMENDATIONS = {
    "Biology (Class 10)": [
        { title: "Cell Division & Mitosis", channel: "Physics Wallah", type: "YouTube Video", link: "https://www.youtube.com", icon: "youtube" },
        { title: "NCERT Solutions Class 10 Biology", channel: "BYJU'S Class 10", type: "Study Notes", link: "https://byjus.com", icon: "book-open" },
        { title: "Class 10 Biology: Cell Cycle", channel: "NCERT Online", type: "NCERT Chapter", link: "https://ncert.nic.in", icon: "download" }
    ],
    "DSA (B.Tech)": [
        { title: "Recursion & Backtracking in DSA", channel: "CodeHelp - Babbar", type: "Video Lectures", link: "https://www.youtube.com", icon: "youtube" },
        { title: "Recursion Practice Problems", channel: "GeeksforGeeks", type: "Practice Portal", link: "https://www.geeksforgeeks.org", icon: "award" },
        { title: "NPTEL: Data Structures & Algorithms", channel: "IIT Delhi (NPTEL)", type: "Video Lectures", link: "https://nptel.ac.in", icon: "video" }
    ],
    "Indian History": [
        { title: "Modern History: Indian National Movement", channel: "StudyIQ IAS", type: "YouTube Playlist", link: "https://www.youtube.com", icon: "youtube" },
        { title: "NCERT Class 12 Themes in Indian History III", channel: "NCERT Online", type: "NCERT Chapter", link: "https://ncert.nic.in", icon: "download" },
        { title: "Indian Freedom Struggle Summary", channel: "Unacademy UPSC", type: "Revision Notes", link: "https://unacademy.com", icon: "book" }
    ],
    "General": [
        { title: "Satyagraha & Study Motivation", channel: "Alakh Pandey PW", type: "YouTube Video", link: "https://www.youtube.com", icon: "youtube" },
        { title: "College & DSA Interview Roadmap", channel: "Anuj Bhaiya", type: "Roadmap Article", link: "https://www.youtube.com", icon: "globe" },
        { title: "NPTEL: Enhancing Soft Skills", channel: "IIT Madras", type: "Video Lectures", link: "https://nptel.ac.in", icon: "video" }
    ]
};

function initAnalytics() {
    renderWeeklyHoursChart();
    renderProgressionCurve();
    renderLearningRecommendations();
    refreshGoalsProgress();
}

// Draw dynamic weekly study bars
function renderWeeklyHoursChart() {
    const container = document.getElementById("chart-bars-container");
    if (!container) return;
    container.innerHTML = "";

    // Factor in current active stopwatch session
    const currentSeconds = parseInt(localStorage.getItem("study_focus_seconds") || "0");
    const currentHrs = currentSeconds / 3600;
    
    // Append stopwatch session hours to Sunday (index 6)
    let fullHours = [...baseStudyHours];
    fullHours[6] = parseFloat((baseStudyHours[6] + currentHrs).toFixed(2));

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const maxHourVal = 4.0; // scale limit for graph
    const graphHeight = 180; // height of graph plotting
    const chartYOffset = 20;

    // Draw bars
    const colSpacing = 60;
    const startX = 65;
    const barWidth = 30;

    fullHours.forEach((hours, idx) => {
        // Height formula: (hours / maxHourVal) * graphHeight
        const barHeight = Math.min((hours / maxHourVal) * graphHeight, graphHeight);
        const yPos = 200 - barHeight;
        const xPos = startX + (idx * colSpacing);

        // SVG Bar Rectangle
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", xPos);
        rect.setAttribute("y", yPos);
        rect.setAttribute("width", barWidth);
        rect.setAttribute("height", barHeight);
        rect.setAttribute("class", "chart-bar");
        rect.setAttribute("fill", "url(#chart-bar-gradient)");
        
        // Tooltip description
        const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.textContent = `${days[idx]}: ${hours} study hours`;
        rect.appendChild(title);

        // Day label
        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", xPos + 2);
        txt.setAttribute("y", 216);
        txt.setAttribute("class", "chart-text");
        txt.textContent = days[idx];

        // Hours label inside/above bar
        const hrsTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        hrsTxt.setAttribute("x", xPos + 2);
        hrsTxt.setAttribute("y", yPos - 6);
        hrsTxt.setAttribute("class", "chart-text");
        hrsTxt.style.fontWeight = "600";
        hrsTxt.textContent = `${hours}h`;

        container.appendChild(rect);
        container.appendChild(txt);
        if (hours > 0) {
            container.appendChild(hrsTxt);
        }
    });
}

// Draw dynamic progression curve line SVG path
function renderProgressionCurve() {
    const linePath = document.getElementById("analytics-line-path");
    const lineArea = document.getElementById("analytics-line-area");
    if (!linePath || !lineArea) return;

    // Load quiz history, or mock a gradual improvement if empty
    let history = JSON.parse(localStorage.getItem("quiz_scores_history") || "[]");
    let scores = [];

    if (history.length > 0) {
        scores = history.map(h => h.score);
    } else {
        // baseline mock scores showing growth
        scores = [50, 60, 80, 75, 90];
    }

    // SVG coordinates mappings:
    // X coordinates: Quiz 1 = 60, Quiz 2 = 160, Quiz 3 = 260, Quiz 4 = 370, Quiz 5 = 470
    // Y coordinates: 0% score = 200, 100% score = 20
    // Formula: Y = 200 - (Score/100)*180
    const xCoordinates = [60, 160, 260, 370, 470];
    let pathD = "";
    let areaD = "M 60 200 ";

    scores.forEach((score, idx) => {
        const yPos = 200 - (score / 100) * 180;
        const xPos = xCoordinates[idx];

        if (idx === 0) {
            pathD += `M ${xPos} ${yPos} `;
            areaD += `L ${xPos} ${yPos} `;
        } else {
            // Cubic bezier curve pathing
            const prevX = xCoordinates[idx - 1];
            const prevY = 200 - (scores[idx - 1] / 100) * 180;
            const cpX1 = prevX + 50;
            const cpY1 = prevY;
            const cpX2 = xPos - 50;
            const cpY2 = yPos;
            
            pathD += `C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${xPos} ${yPos} `;
            areaD += `C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${xPos} ${yPos} `;
        }
    });

    areaD += `L ${xCoordinates[scores.length - 1]} 200 Z`;

    linePath.setAttribute("d", pathD);
    lineArea.setAttribute("d", areaD);
}

// Display recommendations based on currently active document categories
function renderLearningRecommendations() {
    const grid = document.getElementById("recommender-grid");
    if (!grid) return;
    grid.innerHTML = "";

    // Find active category
    const activeDoc = studyMaterials.find(m => m.id === activeDocumentId);
    let category = "General";
    if (activeDoc) {
        category = activeDoc.subject;
    }

    const items = RECOMMENDATIONS[category] || RECOMMENDATIONS["General"];

    items.forEach(rec => {
        const card = document.createElement("div");
        card.className = "glass-panel";
        card.style = "padding: 16px; display: flex; flex-direction: column; justify-content: space-between; height: 160px;";
        
        let typeBadge = `<span class="tag-badge homework" style="align-self: flex-start; margin-bottom: 8px;">${rec.type}</span>`;
        if (rec.type.includes("Video") || rec.type.includes("YouTube")) {
            typeBadge = `<span class="tag-badge exam" style="align-self: flex-start; margin-bottom: 8px;">${rec.type}</span>`;
        } else if (rec.type.includes("Textbook") || rec.type.includes("PDF")) {
            typeBadge = `<span class="tag-badge project" style="align-self: flex-start; margin-bottom: 8px;">${rec.type}</span>`;
        }

        card.innerHTML = `
            <div>
                ${typeBadge}
                <div style="font-weight:700; font-size: 0.95rem; line-height:1.3; margin-top: 4px;">${rec.title}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">Provider: ${rec.channel}</div>
            </div>
            <a href="${rec.link}" target="_blank" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem; margin-top: 10px; width: 100%;">
                <i data-lucide="external-link" style="width: 12px; height: 12px;"></i> View Resource
            </a>
        `;
        grid.appendChild(card);
    });
    lucide.createIcons();
}
