/* StudyPlan AI - Quiz & Flashcards Generator Module */

const STUDY_DATABASE = {
    "doc-mitosis": {
        flashcards: [
            { cat: "Mitosis", q: "What is the primary role of Mitosis in multicellular organisms?", a: "To enable growth, repair, and tissue maintenance by creating exact genetic cell duplicates." },
            { cat: "Meiosis", q: "What is the primary difference in outcome of Meiosis?", a: "It produces four genetically unique haploid gamete cells (sperm or eggs) for sexual reproduction." },
            { cat: "Mitosis Steps", q: "What does the PMAT acronym represent?", a: "Prophase, Metaphase, Anaphase, Telophase (the order of mitotic division)." },
            { cat: "Phases", q: "What key activity occurs during Metaphase?", a: "Chromosomes line up along the metaphase plate in the middle of the cell, attached to spindles." },
            { cat: "Chromosomes", q: "What is the difference between haploid (n) and diploid (2n)?", a: "Diploid has two complete chromosome sets (human body cells = 46); Haploid has one set (gametes = 23)." }
        ],
        quiz: [
            {
                q: "Which phase of mitosis is characterized by chromosomes aligning down the middle of the cell?",
                options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
                correct: 1
            },
            {
                q: "In human cells, meiosis results in gametes containing how many chromosomes?",
                options: ["46 chromosomes", "23 chromosomes", "92 chromosomes", "12 chromosomes"],
                correct: 1
            },
            {
                q: "What is the correct chronological sequence of mitotic stages?",
                options: ["Prophase → Anaphase → Metaphase → Telophase", "Metaphase → Prophase → Anaphase → Telophase", "Prophase → Metaphase → Anaphase → Telophase", "Anaphase → Metaphase → Prophase → Telophase"],
                correct: 2
            },
            {
                q: "Mitosis division yields which of the following output cells?",
                options: ["Two genetically identical diploid cells", "Four genetically diverse haploid cells", "Two genetically diverse diploid cells", "Four genetically identical haploid cells"],
                correct: 0
            },
            {
                q: "What is the region that joins two duplicate sister chromatids together?",
                options: ["Centromere", "Centrosome", "Spindle fiber", "Telomere"],
                correct: 0
            }
        ]
    },
    "doc-recursion": {
        flashcards: [
            { cat: "CS Basics", q: "What is recursion in computer science?", a: "A programming approach where a function calls itself to solve smaller instances of the same problem." },
            { cat: "Execution", q: "What is a Base Case, and why is it required?", a: "The stopping condition that ends recursion. Without it, execution loops infinitely, causing a stack overflow." },
            { cat: "Big-O", q: "What does O(log N) complexity mean?", a: "Logarithmic time. The algorithm splits the input size in half with each step (e.g. binary search), making it highly efficient." },
            { cat: "Big-O Scale", q: "What is the difference between O(N) and O(N²)?", a: "O(N) grows linearly (vacuuming a floor); O(N²) grows quadratically (comparing every item in a room with every other item)." },
            { cat: "Data Structures", q: "How is the Call Stack related to recursion?", a: "Each recursive call allocates a frame on the call stack to store variables. Stacks are LIFO (Last In First Out)." }
        ],
        quiz: [
            {
                q: "What component is mandatory to prevent a recursive function from throwing a Stack Overflow error?",
                options: ["A loop counter", "A return buffer", "A Base Case", "An iterative cache"],
                correct: 2
            },
            {
                q: "Which Big-O complexity represents linear execution growth?",
                options: ["O(1)", "O(N)", "O(log N)", "O(N²)"],
                correct: 1
            },
            {
                q: "Binary Search operates at which of the following algorithmic complexities?",
                options: ["O(1)", "O(N)", "O(N log N)", "O(log N)"],
                correct: 3
            },
            {
                q: "What happens to call stack memory when a function runs recursive calls?",
                options: ["It remains constant", "It increases with each recursive call depth", "It shrinks to conserve power", "It is cleared immediately after the call is launched"],
                correct: 1
            },
            {
                q: "Which time complexity is least efficient for sorting very large datasets?",
                options: ["O(N log N)", "O(N²)", "O(N)", "O(log N)"],
                correct: 1
            }
        ]
    },
    "doc-history": {
        flashcards: [
            { cat: "Freedom Struggle", q: "What does the S.N.C.Q. acronym represent?", a: "Sepoy Mutiny (1857), Non-Cooperation (1920), Civil Disobedience (1930), Quit India (1942)." },
            { cat: "INC Founding", q: "When and where was the Indian National Congress (INC) founded?", a: "In December 1885 in Bombay (now Mumbai)." },
            { cat: "Satyagraha", q: "What was the significance of the Dandi March in 1930?", a: "It was a 24-day non-violent march led by Mahatma Gandhi to protest the British salt tax and monopoly." },
            { cat: "Complete Independence", q: "When was the resolution for Purna Swaraj adopted by the INC?", a: "In the December 1929 Lahore Session, under the presidency of Jawaharlal Nehru." },
            { cat: "Quit India", q: "What slogan did Mahatma Gandhi give during the Quit India Movement in 1942?", a: "Do or Die (Karo Ya Maro)." }
        ],
        quiz: [
            {
                q: "In which year was the Indian National Congress founded?",
                options: ["1857", "1885", "1915", "1920"],
                correct: 1
            },
            {
                q: "Who led the Salt Satyagraha (Dandi March) in 1930?",
                options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Bal Gangadhar Tilak"],
                correct: 0
            },
            {
                q: "Under whose presidency did the Congress adopt the Purna Swaraj (Complete Independence) resolution in 1929?",
                options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Subhas Chandra Bose"],
                correct: 1
            },
            {
                q: "Which movement was launched in 1942 with the slogan 'Do or Die' (Karo Ya Maro)?",
                options: ["Non-Cooperation Movement", "Civil Disobedience Movement", "Quit India Movement", "Swadeshi Movement"],
                correct: 2
            },
            {
                q: "Who gave the famous slogan 'Swaraj is my birthright, and I shall have it'?",
                options: ["Lala Lajpat Rai", "Subhas Chandra Bose", "Bal Gangadhar Tilak", "Bhagat Singh"],
                correct: 2
            }
        ]
    }
};

// Fallback values for newly uploaded files
const FALLBACK_PRACTICE = {
    flashcards: [
        { cat: "Review", q: "What is the primary theme of this uploaded document?", a: "Analyzing foundational frameworks, system workflows, and core objectives." },
        { cat: "Recall", q: "What is an operational flow?", a: "The chronological sequence of processes that link individual actions to goals." },
        { cat: "Recall", q: "What is the most effective way to study this file?", a: "Reviewing the AI-generated summaries and practicing active recall quiz prompts." }
    ],
    quiz: [
        {
            q: "According to the uploaded notes summary, what is the primary focus of the topic?",
            options: ["Historical dates and timelines", "Foundational frameworks and operational workflows", "Mathematical formulas and operations", "Geographic locations and parameters"],
            correct: 1
        },
        {
            q: "What connects sub-systems directly to the core objective?",
            options: ["External parameters", "Internal relationships", "Random events", "Unrelated processes"],
            correct: 1
        },
        {
            q: "How should a student verify retention of this material?",
            options: ["Rereading the text multiple times", "Using active recall prompts and practice quizzes", "Summarizing unrelated documents", "Memorizing footnotes only"],
            correct: 1
        }
    ]
};

// State trackers
let currentCardsList = [];
let activeCardIndex = 0;

let currentQuizQuestions = [];
let activeQuestionIndex = 0;
let quizScore = 0;
let selectedOptionIdx = null;

function populatePracticeDropdown() {
    const dropdown = document.getElementById("practice-doc-select");
    if (!dropdown) return;
    dropdown.innerHTML = "";

    studyMaterials.forEach(m => {
        const option = document.createElement("option");
        option.value = m.id;
        option.innerText = m.title;
        option.selected = (m.id === activeDocumentId);
        dropdown.appendChild(option);
    });

    handlePracticeDocChange(false); // Init active card/quiz lists without alerts
}

function handlePracticeDocChange(alertToast = true) {
    const dropdown = document.getElementById("practice-doc-select");
    if (!dropdown || !dropdown.value) return;

    const docId = dropdown.value;
    
    // Update flashcard and quiz datasets
    const docData = STUDY_DATABASE[docId] || FALLBACK_PRACTICE;
    currentCardsList = docData.flashcards;
    currentQuizQuestions = docData.quiz;

    activeCardIndex = 0;
    activeQuestionIndex = 0;
    
    // Reset flashcard UI
    const cardEl = document.getElementById("flashcard-element");
    if (cardEl) cardEl.classList.remove("flipped");

    renderActiveFlashcard();
    resetQuizUI();

    if (alertToast) {
        const docTitle = dropdown.options[dropdown.selectedIndex].text;
        showToast(`Loaded study activities for: ${docTitle}`, "info");
    }
}

// FLASHCARD FUNCTIONS
function renderActiveFlashcard() {
    if (currentCardsList.length === 0) {
        document.getElementById("card-category").innerText = "None";
        document.getElementById("card-front-content").innerText = "No cards available. Please upload study materials.";
        document.getElementById("card-back-content").innerText = "No answers available.";
        document.getElementById("card-counter").innerText = "0 / 0";
        return;
    }

    const card = currentCardsList[activeCardIndex];
    document.getElementById("card-category").innerText = card.cat;
    document.getElementById("card-front-content").innerText = card.q;
    document.getElementById("card-back-content").innerText = card.a;
    document.getElementById("card-counter").innerText = `${activeCardIndex + 1} / ${currentCardsList.length}`;
}

function flipFlashcard() {
    const card = document.getElementById("flashcard-element");
    card.classList.toggle("flipped");
}

function nextFlashcard() {
    if (currentCardsList.length === 0) return;
    
    const card = document.getElementById("flashcard-element");
    card.classList.remove("flipped");

    setTimeout(() => {
        activeCardIndex = (activeCardIndex + 1) % currentCardsList.length;
        renderActiveFlashcard();
    }, 150);
}

function prevFlashcard() {
    if (currentCardsList.length === 0) return;
    
    const card = document.getElementById("flashcard-element");
    card.classList.remove("flipped");

    setTimeout(() => {
        activeCardIndex = (activeCardIndex - 1 + currentCardsList.length) % currentCardsList.length;
        renderActiveFlashcard();
    }, 150);
}

// QUIZ FUNCTIONS
function resetQuizUI() {
    document.getElementById("quiz-intro").style.display = "block";
    document.getElementById("quiz-active").style.display = "none";
    document.getElementById("quiz-result").style.display = "none";
}

function startQuiz() {
    if (currentQuizQuestions.length === 0) {
        showToast("Please select a topic with active questions.", "warning");
        return;
    }
    
    activeQuestionIndex = 0;
    quizScore = 0;
    selectedOptionIdx = null;

    document.getElementById("quiz-intro").style.display = "none";
    document.getElementById("quiz-result").style.display = "none";
    document.getElementById("quiz-active").style.display = "block";

    loadQuizQuestion();
}

function loadQuizQuestion() {
    selectedOptionIdx = null;
    document.getElementById("quiz-next-btn").style.display = "none";

    const q = currentQuizQuestions[activeQuestionIndex];
    
    // Progress UI
    const progressPerc = ((activeQuestionIndex) / currentQuizQuestions.length) * 100;
    document.getElementById("quiz-progress-indicator").style.width = `${progressPerc}%`;
    document.getElementById("quiz-question-counter").innerText = `Question ${activeQuestionIndex + 1} of ${currentQuizQuestions.length}`;
    document.getElementById("quiz-score-live").innerText = `Score: ${quizScore}/${activeQuestionIndex}`;

    // Text details
    document.getElementById("quiz-question-text").innerText = q.q;

    // Options mapping
    const container = document.getElementById("quiz-options-container");
    container.innerHTML = "";

    q.options.forEach((opt, idx) => {
        const optionBtn = document.createElement("div");
        optionBtn.className = "quiz-option";
        optionBtn.innerHTML = `<span style="width:24px; height:24px; display:inline-flex; border-radius:50%; background:var(--bg-primary); align-items:center; justify-content:center; font-weight:700; font-size:0.8rem; margin-right:8px; border:1px solid var(--border-color)">${String.fromCharCode(65 + idx)}</span> ${opt}`;
        optionBtn.onclick = () => selectQuizOption(idx, optionBtn);
        container.appendChild(optionBtn);
    });
}

function selectQuizOption(idx, element) {
    if (selectedOptionIdx !== null) return; // Answer already locked/submitted
    
    selectedOptionIdx = idx;

    // Highlight option
    const options = document.querySelectorAll(".quiz-option");
    options.forEach(o => o.classList.remove("selected"));
    element.classList.add("selected");

    // Reveal correct/incorrect answers automatically
    const q = currentQuizQuestions[activeQuestionIndex];
    
    setTimeout(() => {
        if (selectedOptionIdx === q.correct) {
            element.classList.add("correct");
            quizScore++;
            showToast("Correct answer!", "success");
        } else {
            element.classList.add("incorrect");
            // Highlight correct answer
            const correctEl = document.querySelectorAll(".quiz-option")[q.correct];
            if (correctEl) correctEl.classList.add("correct");
            showToast("Incorrect answer.", "danger");
        }
        
        // Show Next button
        document.getElementById("quiz-score-live").innerText = `Score: ${quizScore}/${activeQuestionIndex + 1}`;
        document.getElementById("quiz-next-btn").style.display = "block";
    }, 500);
}

function submitQuizOption() {
    activeQuestionIndex++;
    if (activeQuestionIndex < currentQuizQuestions.length) {
        loadQuizQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById("quiz-active").style.display = "none";
    document.getElementById("quiz-result").style.display = "block";

    document.getElementById("quiz-final-score").innerText = `${quizScore} / ${currentQuizQuestions.length}`;
    
    const percentage = Math.round((quizScore / currentQuizQuestions.length) * 100);
    document.getElementById("quiz-percentage").innerText = `${percentage}%`;

    // Log the quiz score history to LocalStorage for analytics visualizer
    logQuizScoreToAnalytics(percentage);
}

function logQuizScoreToAnalytics(scorePercent) {
    let scores = JSON.parse(localStorage.getItem("quiz_scores_history") || "[]");
    scores.push({
        score: scorePercent,
        timestamp: Date.now(),
        docId: document.getElementById("practice-doc-select").value
    });
    
    // Retain only latest 5 scores
    if (scores.length > 5) scores.shift();
    localStorage.setItem("quiz_scores_history", JSON.stringify(scores));
    
    // Update analytics chart
    if (window.renderProgressionCurve) {
        window.renderProgressionCurve();
    }
    
    // Refresh goal widgets
    refreshGoalsProgress();
}
