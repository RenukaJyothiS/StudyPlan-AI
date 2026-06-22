/* StudyPlan AI - Authentication & Profiles Module */

// Setup default session on load
const DEFAULT_USER = {
    fullname: "Renuka Jyothi",
    email: "renuka@nitk.edu.in",
    major: "B.Tech Computer Science & Engineering",
    targetGPA: 9.0,
    hoursGoal: 15,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    background: "default"
};

// Check if user session exists, if not setup demo user initially
function initAuth() {
    let currentUser = localStorage.getItem("current_user");
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Seed default user if not already in the database
    const hasDefaultUser = users.some(u => u.email.toLowerCase() === DEFAULT_USER.email.toLowerCase());
    if (!hasDefaultUser) {
        users.push({
            fullname: DEFAULT_USER.fullname,
            email: DEFAULT_USER.email,
            password: "password123", // Simulated plain storing for offline mock purposes
            major: DEFAULT_USER.major,
            targetGPA: DEFAULT_USER.targetGPA,
            hoursGoal: DEFAULT_USER.hoursGoal,
            avatar: DEFAULT_USER.avatar,
            background: DEFAULT_USER.background
        });
        localStorage.setItem("users", JSON.stringify(users));
    }
    
    if (currentUser) {
        showAppInterface(JSON.parse(currentUser));
    } else {
        showAuthInterface();
    }
}

let activeAuthTab = 'login';

function toggleAuthTab(tab) {
    activeAuthTab = tab;
    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const groupFullname = document.getElementById("group-fullname");
    const groupMajor = document.getElementById("group-major");
    const authBtn = document.getElementById("auth-btn");
    const authSubtitle = document.getElementById("auth-subtitle");

    if (tab === 'login') {
        tabLogin.classList.add("active");
        tabRegister.classList.remove("active");
        groupFullname.style.display = "none";
        groupMajor.style.display = "none";
        authBtn.innerText = "Sign In";
        authSubtitle.innerText = "Elevate your study routine with AI power";
    } else {
        tabLogin.classList.remove("active");
        tabRegister.classList.add("active");
        groupFullname.style.display = "flex";
        groupMajor.style.display = "flex";
        authBtn.innerText = "Create Account";
        authSubtitle.innerText = "Sign up today to start organizing your studies";
    }
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (activeAuthTab === 'login') {
        // Authenticate
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (user) {
            localStorage.setItem("current_user", JSON.stringify(user));
            showToast("Successfully logged in!", "success");
            showAppInterface(user);
        } else {
            showToast("Invalid credentials. Try using the Demo Account listed below.", "danger");
        }
    } else {
        // Register
        const fullname = document.getElementById("fullname").value.trim();
        const major = document.getElementById("major").value.trim() || "Undeclared";
        
        if (!fullname) {
            showToast("Please enter your name.", "warning");
            return;
        }

        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            showToast("Email address already registered.", "warning");
            return;
        }

        const newUser = {
            fullname: fullname,
            email: email,
            password: password,
            major: major,
            targetGPA: 8.5,
            hoursGoal: 10,
            avatar: "",
            background: "default"
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("current_user", JSON.stringify(newUser));
        showToast("Account created successfully!", "success");
        showAppInterface(newUser);
    }
}

function showAuthInterface() {
    document.getElementById("auth-wrapper").style.display = "flex";
    document.getElementById("app-wrapper").style.display = "none";
    lucide.createIcons();
}

function showAppInterface(user) {
    document.getElementById("auth-wrapper").style.display = "none";
    document.getElementById("app-wrapper").style.display = "flex";
    
    // Update Profile Information
    updateProfileUIElements(user);
    
    // Trigger Lucide Icons Render
    lucide.createIcons();
    
    // Initialize Dashboard / View controllers
    initAppComponents();
}

function updateProfileUIElements(user) {
    document.getElementById("sidebar-username").innerText = user.fullname;
    document.getElementById("sidebar-major").innerText = user.major;
    document.getElementById("header-greeting").innerText = `Hello, ${user.fullname.split(' ')[0]}!`;
    
    // Profile Sidebar image handling
    const placeholder = document.getElementById("sidebar-avatar-placeholder");
    const imgEl = document.getElementById("sidebar-avatar-img");
    
    if (user.avatar && user.avatar.startsWith("http")) {
        placeholder.style.display = "none";
        imgEl.src = user.avatar;
        imgEl.style.display = "block";
    } else {
        placeholder.style.display = "block";
        imgEl.style.display = "none";
    }

    // Populate values in the settings form
    document.getElementById("settings-fullname").value = user.fullname;
    document.getElementById("settings-major").value = user.major;
    document.getElementById("settings-avatar").value = user.avatar || "";
    document.getElementById("settings-gpagoal").value = user.targetGPA || 8.5;
    document.getElementById("settings-hoursgoal").value = user.hoursGoal || 10;
    
    // Dashboard Stats update
    document.getElementById("stat-gpa").innerText = user.targetGPA || 8.5;
}

function saveProfileSettings(event) {
    event.preventDefault();
    let currentUser = JSON.parse(localStorage.getItem("current_user"));
    if (!currentUser) return;
    
    const fullname = document.getElementById("settings-fullname").value.trim();
    const major = document.getElementById("settings-major").value.trim();
    const avatar = document.getElementById("settings-avatar").value.trim();
    const targetGPA = parseFloat(document.getElementById("settings-gpagoal").value);
    const hoursGoal = parseInt(document.getElementById("settings-hoursgoal").value);
    
    currentUser.fullname = fullname;
    currentUser.major = major;
    currentUser.avatar = avatar;
    currentUser.targetGPA = targetGPA;
    currentUser.hoursGoal = hoursGoal;
    
    // Save to users database and current user session
    localStorage.setItem("current_user", JSON.stringify(currentUser));
    
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const idx = users.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (idx !== -1) {
        users[idx] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
    }
    
    updateProfileUIElements(currentUser);
    showToast("Profile settings saved successfully!", "success");
    
    // Trigger refresh of goals dashboard
    refreshGoalsProgress();
}

function handleLogout() {
    localStorage.removeItem("current_user");
    showToast("Logged out successfully.", "info");
    showAuthInterface();
}
