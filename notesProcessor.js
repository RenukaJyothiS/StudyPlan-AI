/* StudyPlan AI - Document Upload & AI Content Processor Module */

// Pre-seeded study materials database
const PRESEEDED_MATERIALS = [
    {
        id: "doc-mitosis",
        title: "Class 10 Biology: Cell Division",
        subject: "Biology (Class 10)",
        fileSize: "18 KB",
        uploadedAt: "Preloaded",
        simplified: `<h3>Mitosis & Meiosis Explained Simply</h3>
        <p>Imagine your body is a giant lego castle. When you grow, or when you scrap your knee, you need more blocks to rebuild it. Your body makes these blocks by taking a cell and dividing it in half. This process is called <strong>cell division</strong>.</p>
        
        <p>There are two main ways cells divide depending on their purpose:</p>
        <ul>
            <li><strong>Mitosis:</strong> This is how your body grows new skin, bones, or hair. It takes one cell and makes an <em>exact replica</em> copy of it. One cell becomes two identical cells.</li>
            <li><strong>Meiosis:</strong> This is special cell division used solely for reproduction. It creates cells that have only <em>half</em> the genetic information, preparing them to join with another cell to create a brand new organism.</li>
        </ul>
        
        <p><strong>The Stages of Mitosis (Remember "PMAT"):</strong></p>
        <ol>
            <li><strong>Prophase:</strong> The cell packs its DNA tightly into packages called chromosomes.</li>
            <li><strong>Metaphase:</strong> The chromosomes line up perfectly down the middle (M for Middle) of the cell.</li>
            <li><strong>Anaphase:</strong> The chromosome packages are pulled apart (A for Away) to opposite sides.</li>
            <li><strong>Telophase:</strong> Two new cell nuclei form around the separated chromosomes. The cell splits!</li>
        </ol>`,
        summary: `<h3>Calculated Summary - Cell Division</h3>
        <p><strong>Cell division</strong> is the fundamental biological process enabling organism growth, tissue repair, and reproduction. The cell cycle is split into Mitosis (somatic cell division) and Meiosis (gamete cell division).</p>
        <p><strong>Key Takeaways:</strong></p>
        <ul>
            <li>Mitosis yields 2 genetically identical diploid daughter cells.</li>
            <li>Meiosis undergoes two division cycles to yield 4 genetically diverse haploid gametes.</li>
            <li>The mitotic stages occur in the chronological sequence: Prophase, Metaphase, Anaphase, and Telophase (PMAT), followed by Cytokinesis.</li>
            <li>DNA replication occurs prior to cell division during the Interphase stage of the cell cycle.</li>
        </ul>`,
        keypoints: `<h3>Core Vocabulary & Concepts</h3>
        <ul>
            <li><strong>Chromosome:</strong> A thread-like structure of nucleic acids and protein found in the nucleus, carrying genetic information in the form of genes.</li>
            <li><strong>Diploid (2n):</strong> Cells containing two complete sets of chromosomes, one from each parent (e.g., human somatic cells have 46).</li>
            <li><strong>Haploid (n):</strong> Cells containing only a single set of unpaired chromosomes (e.g., human sperm and egg cells have 23).</li>
            <li><strong>Centromere:</strong> The region of a chromosome to which the microtubules of the spindle attach during cell division.</li>
            <li><strong>Chromatid:</strong> Each of the two thread-like strands into which a chromosome divides longitudinally during cell division.</li>
        </ul>`,
        revision: `<h3>Active Recall Review Guide</h3>
        <p>Use these prompts to test your retention of Cell Division:</p>
        <blockquote>
            <p><strong>Recall Prompt 1:</strong> What is the primary difference in outcome between Mitosis and Meiosis?</p>
            <p><em>Check:</em> Mitosis produces identical duplicates (diploid); Meiosis produces genetic variations with half the chromosomes (haploid).</p>
        </blockquote>
        <blockquote>
            <p><strong>Recall Prompt 2:</strong> What occurs during the Metaphase stage of cell division?</p>
            <p><em>Check:</em> Chromosomes align on the central metaphase plate, anchoring to spindle fibers.</p>
        </blockquote>
        <blockquote>
            <p><strong>Recall Prompt 3:</strong> Why is genetic crossing-over in Meiosis important?</p>
            <p><em>Check:</em> It swaps DNA segments between homologous chromosomes, promoting genetic diversity in offspring.</p>
        </blockquote>`
    },
    {
        id: "doc-recursion",
        title: "B.Tech CSE: Recursion & Big-O Complexity",
        subject: "DSA (B.Tech)",
        fileSize: "12 KB",
        uploadedAt: "Preloaded",
        simplified: `<h3>Recursion & Big-O Made Simple</h3>
        <p><strong>What is Recursion?</strong></p>
        <p>Imagine you are looking for a key in a stack of nested boxes. Inside box A, there's box B, and inside box B is box C, which contains the key.
        You can write code that opens the first box, checks if there's a key. If it's another box, the code <em>calls itself</em> to open that new box. This programming method where a function calls itself is called <strong>recursion</strong>.</p>
        
        <p>Every recursive function needs two things:</p>
        <ol>
            <li><strong>Base Case:</strong> The stopping condition. (e.g., "I found the key, stop opening boxes"). Without this, your program will run forever and crash (Stack Overflow).</li>
            <li><strong>Recursive Case:</strong> The part where the function calls itself again to do smaller work.</li>
        </ol>

        <p><strong>What is Big-O Notation?</strong></p>
        <p>Big-O notation is just a way to describe how fast your code runs as the amount of data grows. Think of it like describing how long it takes to clean a room:
        <ul>
            <li><strong>O(1) - Constant Time:</strong> Picking up a single piece of trash. It always takes 1 second, no matter how dirty the room is.</li>
            <li><strong>O(N) - Linear Time:</strong> Vacuuming the floor. If the room is twice as large, it takes twice as long.</li>
            <li><strong>O(N²) - Quadratic Time:</strong> Comparing every item in the room with every other item. As the room grows, it gets very slow, very fast!</li>
        </ul></p>`,
        summary: `<h3>Calculated Summary - Recursion & Algorithmic Complexity</h3>
        <p>This document teaches recursive programming principles and Big-O efficiency analysis. Recursion decomposes complex problems into smaller sub-problems by calling functions nestedly, while Big-O provides a mathematical vocabulary to analyze worst-case time and space complexity.</p>
        <p><strong>Core Takeaways:</strong></p>
        <ul>
            <li>Recursion requires a base case to prevent stack overflow and terminate the execution call stack.</li>
            <li>Space complexity in recursive algorithms grows with the depth of the call stack (each call allocates memory).</li>
            <li>Big-O filters out constant factors and focus on the rate of growth relative to input size (N).</li>
            <li>Common complexities include logarithmic O(log n), linear O(n), and exponential O(2^n).</li>
        </ul>`,
        keypoints: `<h3>Core Vocabulary & Concepts</h3>
        <ul>
            <li><strong>Call Stack:</strong> A stack data structure that stores information about the active subroutines of a computer program.</li>
            <li><strong>Base Case:</strong> The conditional branch in a recursive function that stops further recursive calls and returns a direct value.</li>
            <li><strong>Stack Overflow:</strong> An error that occurs when the call stack pointer exceeds the stack boundary due to infinite recursion.</li>
            <li><strong>Time Complexity:</strong> The computational complexity that describes the amount of computer time it takes to run an algorithm.</li>
            <li><strong>Space Complexity:</strong> The amount of memory space required by an algorithm during execution.</li>
        </ul>`,
        revision: `<h3>Active Recall Review Guide</h3>
        <p>Use these prompts to test your recursion & Big-O knowledge:</p>
        <blockquote>
            <p><strong>Recall Prompt 1:</strong> What happens to a program's memory if a recursive call has no base case?</p>
            <p><em>Check:</em> It fills up the Call Stack memory causing a Stack Overflow crash.</p>
        </blockquote>
        <blockquote>
            <p><strong>Recall Prompt 2:</strong> What is the time complexity of Binary Search, and why is it efficient?</p>
            <p><em>Check:</em> O(log N). It splits the search space in half with each step, meaning even large inputs are searched extremely quickly.</p>
        </blockquote>
        <blockquote>
            <p><strong>Recall Prompt 3:</strong> Why does recursive Fibonacci calculation (O(2^N)) run so slowly compared to iterative versions?</p>
            <p><em>Check:</em> It performs redundant duplicate calculations of identical sub-problems. It can be optimized using memoization.</p>
        </blockquote>`
    },
    {
        id: "doc-history",
        title: "Class 12 History: Indian Freedom Struggle",
        subject: "Indian History",
        fileSize: "22 KB",
        uploadedAt: "Preloaded",
        simplified: `<h3>Indian Freedom Struggle Simplified</h3>
        <p>How did a trading company (East India Company) take over India, and how did Indians win back their independence? You can remember the key milestones using the acronym <strong>S.N.C.Q.</strong> (Struggle, Non-Cooperation, Civil Disobedience, Quit India):</p>
        <ul>
            <li><strong>S - Sepoy Mutiny (1857):</strong> Often called the First War of Independence. Indian soldiers revolted against British rule. Though suppressed, it led to the British Crown taking direct control of India.</li>
            <li><strong>N - Non-Cooperation Movement (1920):</strong> Launched by Mahatma Gandhi after the Jallianwala Bagh massacre. Indians boycotted British goods, government schools, and courts.</li>
            <li><strong>C - Civil Disobedience & Salt March (1930):</strong> Gandhiji marched to Dandi to break the salt law, symbolizing peaceful resistance to unjust taxes. This sparked nationwide defiance.</li>
            <li><strong>Q - Quit India Movement (1942):</strong> During WWII, Gandhiji gave the slogan "Do or Die" (Karo Ya Maro), demanding an immediate British exit from India.</li>
        </ul>
        <p><strong>The Independence:</strong> Through decades of struggle, both non-violent movements led by leaders like Mahatma Gandhi, Jawaharlal Nehru, and Sardar Patel, and revolutionary movements led by Netaji Subhas Chandra Bose, Bhagat Singh, and Chandrashekhar Azad, India finally achieved independence on August 15, 1947.</p>`,
        summary: `<h3>Calculated Summary - Indian National Movement</h3>
        <p>This history study sheet covers the major phases of the Indian National Movement (1857-1947). It traces the transition from the early moderate phase of the Indian National Congress (INC) to the mass-based satyagraha movements led by Mahatma Gandhi and the revolutionary struggles for complete independence (Purna Swaraj).</p>
        <p><strong>Key Takeaways:</strong></p>
        <ul>
            <li>The Revolt of 1857 was the first major challenge to British rule, ending the rule of the East India Company.</li>
            <li>Mahatma Gandhi returned from South Africa in 1915 and introduced non-violent Satyagraha (truth-force) as a mass struggle method.</li>
            <li>Key Gandhian mass movements include Non-Cooperation (1920), Civil Disobedience (1930), and Quit India (1942).</li>
            <li>Purna Swaraj (Complete Independence) was declared as the goal of the Congress in its Lahore Session (1929) under Nehru.</li>
            <li>India achieved independence on August 15, 1947, alongside the partition of the country.</li>
        </ul>`,
        keypoints: `<h3>Core Vocabulary & Concepts</h3>
        <ul>
            <li><strong>Satyagraha:</strong> A policy of passive political resistance, advocated by Mahatma Gandhi, based on truth and non-violence.</li>
            <li><strong>Purna Swaraj:</strong> Resolution for "Complete Independence" passed by the INC in Lahore on December 29, 1929.</li>
            <li><strong>Swadeshi:</strong> A movement promoting domestic production and boycott of foreign (British) goods to achieve self-reliance.</li>
            <li><strong>Dandi March:</strong> A 24-day march in March-April 1930 covering 385 km to protest the salt monopoly and salt tax.</li>
            <li><strong>Indian National Congress (INC):</strong> Founded in December 1885 in Bombay, initially representing moderate political reform demands.</li>
        </ul>`,
        revision: `<h3>Active Recall Review Guide</h3>
        <p>Use these prompts to test your retention of the Indian Freedom Struggle:</p>
        <blockquote>
            <p><strong>Recall Prompt 1:</strong> What were the three major national mass movements launched by Gandhiji?</p>
            <p><em>Check:</em> Non-Cooperation Movement (1920), Civil Disobedience Movement (1930), and Quit India Movement (1942).</p>
        </blockquote>
        <blockquote>
            <p><strong>Recall Prompt 2:</strong> What was the significance of the 1929 Lahore Session of the Indian National Congress?</p>
            <p><em>Check:</em> Under the presidency of Jawaharlal Nehru, the INC adopted the resolution of Purna Swaraj (Complete Independence) as its main goal.</p>
        </blockquote>
        <blockquote>
            <p><strong>Recall Prompt 3:</strong> What slogan did Mahatma Gandhi give during the Quit India Movement in 1942?</p>
            <p><em>Check:</em> "Do or Die" (Karo Ya Maro).</p>
        </blockquote>`
    }
];

let studyMaterials = [];
let activeDocumentId = "doc-mitosis";

function initNotesProcessor() {
    // Load study materials from local storage, or seed if empty
    let saved = localStorage.getItem("study_materials");
    if (saved) {
        studyMaterials = JSON.parse(saved);
    } else {
        studyMaterials = [...PRESEEDED_MATERIALS];
        localStorage.setItem("study_materials", JSON.stringify(studyMaterials));
    }
    
    // Set active document
    const activeSaved = localStorage.getItem("active_document_id");
    if (activeSaved && studyMaterials.find(m => m.id === activeSaved)) {
        activeDocumentId = activeSaved;
    } else if (studyMaterials.length > 0) {
        activeDocumentId = studyMaterials[0].id;
    }

    renderMaterialsList();
    loadActiveDocumentContents();
    populatePracticeDropdown();
}

function renderMaterialsList() {
    const listEl = document.getElementById("loaded-materials-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    studyMaterials.forEach(mat => {
        const activeClass = mat.id === activeDocumentId ? "border-color: var(--accent-color); background: rgba(99, 102, 241, 0.05);" : "";
        const card = document.createElement("div");
        card.className = "material-card";
        card.style = activeClass;
        card.onclick = () => selectActiveDocument(mat.id);
        
        card.innerHTML = `
            <div class="material-info">
                <i data-lucide="file-text" class="material-icon"></i>
                <div>
                    <div class="material-name">${mat.title}</div>
                    <div class="material-meta">${mat.subject} • ${mat.fileSize}</div>
                </div>
            </div>
            <div class="material-actions">
                <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" onclick="deleteMaterial(event, '${mat.id}')">
                    <i data-lucide="trash" style="width: 14px; height: 14px; color: var(--danger)"></i>
                </button>
            </div>
        `;
        listEl.appendChild(card);
    });
    lucide.createIcons();
    
    // Update global stat counter
    document.getElementById("stat-uploaded-count").innerText = studyMaterials.length;
}

function selectActiveDocument(id) {
    activeDocumentId = id;
    localStorage.setItem("active_document_id", id);
    renderMaterialsList();
    loadActiveDocumentContents();
    populatePracticeDropdown();
    
    // Also update chat context
    const currentDoc = studyMaterials.find(m => m.id === activeDocumentId);
    if (currentDoc) {
        const contextTopicEl = document.getElementById("chat-context-topic");
        if (contextTopicEl) contextTopicEl.innerText = currentDoc.title;
        showToast(`Switched active topic to: ${currentDoc.title}`, "info");
    }
}

function loadActiveDocumentContents() {
    const currentDoc = studyMaterials.find(m => m.id === activeDocumentId);
    if (!currentDoc) {
        document.getElementById("vault-doc-title").innerText = "No Active Document";
        document.getElementById("tab-simplified").innerHTML = "<p>Please upload a study guide or choose a pre-loaded topic from the sidebar.</p>";
        document.getElementById("tab-summary").innerHTML = "";
        document.getElementById("tab-keypoints").innerHTML = "";
        document.getElementById("tab-revision").innerHTML = "";
        return;
    }

    document.getElementById("vault-doc-title").innerText = `Active Document: ${currentDoc.title}`;
    document.getElementById("tab-simplified").innerHTML = currentDoc.simplified;
    document.getElementById("tab-summary").innerHTML = currentDoc.summary;
    document.getElementById("tab-keypoints").innerHTML = currentDoc.keypoints;
    document.getElementById("tab-revision").innerHTML = currentDoc.revision;
}

function triggerFileUpload() {
    document.getElementById("file-uploader").click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Show loading progress mockup
    showToast(`Parsing ${file.name} using AI agent...`, "info");
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        processUploadedText(file.name, text);
    };
    
    // Try to read as text. If PDF or PPTX, simulate processing.
    if (file.name.endsWith(".txt") || file.name.endsWith(".md")) {
        reader.readAsText(file);
    } else {
        // Mock PPTX/PDF parsing
        setTimeout(() => {
            processUploadedText(file.name, `Simulated contents of ${file.name}. This document explores subject topics.`);
        }, 1500);
    }
}

function processUploadedText(filename, rawText) {
    // Generate AI simulated sections
    const title = filename.replace(/\.[^/.]+$/, ""); // Strip extension
    const subject = inferSubjectFromFilename(title);
    
    // Construct outputs using simulated NLP summarization templates
    const docId = "doc-" + Date.now();
    const newDoc = {
        id: docId,
        title: title,
        subject: subject,
        fileSize: (rawText.length > 1024) ? Math.round(rawText.length / 1024) + " KB" : "1 KB",
        uploadedAt: new Date().toLocaleDateString(),
        simplified: `<h3>Simplified Concept Breakdown: ${title}</h3>
        <p>Here is the core lesson simplified for quick comprehension:</p>
        <p>The uploaded study sheet focuses on <strong>${title}</strong>. At its core, this topic is concerned with analyzing foundational parameters, system states, and structured workflows. Rather than wading through heavy academic details, we can understand that it explains structural operations under normal conditions, emphasizing speed and recall.</p>
        <p><strong>Primary takeaway:</strong> Everything is broken down into simple functional units. Master these units to conquer the material.</p>`,
        summary: `<h3>Calculated AI Summary - ${title}</h3>
        <p>The document provides a comprehensive framework detailing the main concepts of <strong>${title}</strong>. It emphasizes key workflows, structures, and theoretical explanations.</p>
        <ul>
            <li>Analyzes foundational aspects and structural principles of the topic.</li>
            <li>Highlights relationships between various operational steps.</li>
            <li>Outlines the critical success metrics for exam reviews on this theme.</li>
        </ul>`,
        keypoints: `<h3>Core Vocabulary & Concepts</h3>
        <ul>
            <li><strong>Foundational Unit:</strong> The building block of ${title} systems.</li>
            <li><strong>Operational Flow:</strong> The chronological sequence of processes.</li>
            <li><strong>Core Objective:</strong> The target output or goal of the topic.</li>
        </ul>`,
        revision: `<h3>Active Recall Review Guide</h3>
        <p>Test your retention of ${title} with these review checks:</p>
        <blockquote>
            <p><strong>Recall Prompt 1:</strong> Summarize the core concept of ${title} in your own words.</p>
            <p><em>Check:</em> Focus on the primary objectives and operational elements defined in the summary.</p>
        </blockquote>
        <blockquote>
            <p><strong>Recall Prompt 2:</strong> What is the main relationship mapping in this study guide?</p>
            <p><em>Check:</em> Verify that individual sub-systems link directly to the core objective.</p>
        </blockquote>`
    };

    studyMaterials.push(newDoc);
    localStorage.setItem("study_materials", JSON.stringify(studyMaterials));
    showToast(`AI agent successfully processed: ${title}!`, "success");
    
    // Refresh list and select the newly uploaded file
    renderMaterialsList();
    selectActiveDocument(docId);
}

function inferSubjectFromFilename(title) {
    const t = title.toLowerCase();
    if (t.includes("bio") || t.includes("cell") || t.includes("division")) return "Biology (Class 10)";
    if (t.includes("code") || t.includes("cs") || t.includes("program") || t.includes("algorithm") || t.includes("recursion")) return "DSA (B.Tech)";
    if (t.includes("history") || t.includes("freedom") || t.includes("struggle") || t.includes("gandhi")) return "Indian History";
    if (t.includes("calc") || t.includes("math") || t.includes("algebra") || t.includes("limit")) return "Mathematics";
    return "General Study";
}

function deleteMaterial(event, id) {
    event.stopPropagation(); // Avoid selecting deleted file
    studyMaterials = studyMaterials.filter(m => m.id !== id);
    localStorage.setItem("study_materials", JSON.stringify(studyMaterials));
    showToast("Document deleted.", "info");
    
    if (activeDocumentId === id) {
        if (studyMaterials.length > 0) {
            activeDocumentId = studyMaterials[0].id;
        } else {
            activeDocumentId = "";
        }
        localStorage.setItem("active_document_id", activeDocumentId);
    }
    
    renderMaterialsList();
    loadActiveDocumentContents();
    populatePracticeDropdown();
}

function switchVaultTab(tabName) {
    // Hide all tabs
    const contents = document.querySelectorAll(".ai-tab-content");
    contents.forEach(c => c.classList.remove("active"));
    
    const btns = document.querySelectorAll("#view-study-vault .tab-btn");
    btns.forEach(b => b.classList.remove("active"));
    
    // Show active tab
    const activeTab = document.getElementById(`tab-${tabName}`);
    if (activeTab) activeTab.classList.add("active");
    
    // Style active button
    event.target.classList.add("active");
}

function generateMaterialsAction(action) {
    if (!activeDocumentId) {
        showToast("No active document selected.", "warning");
        return;
    }
    
    if (action === 'quiz') {
        switchView('quiz-flashcards');
        // Start quiz immediately
        setTimeout(() => startQuiz(), 100);
    } else {
        switchView('quiz-flashcards');
    }
}
