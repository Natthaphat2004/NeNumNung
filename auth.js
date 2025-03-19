// Default User
if (!localStorage.getItem("admin")) {
    localStorage.setItem("admin", "admin"); // ID: admin | Password: admin
}

// สลับฟอร์มสมัครสมาชิกและเข้าสู่ระบบ
function toggleForm() {
    document.getElementById("loginBox").classList.toggle("hidden");
    document.getElementById("registerBox").classList.toggle("hidden");
}

// สมัครสมาชิก
function register() {
    let username = document.getElementById("reg-username").value;
    let password = document.getElementById("reg-password").value;

    if (username && password) {
        if (localStorage.getItem(username)) {
            alert("❌ ชื่อนี้ถูกใช้ไปแล้ว!");
        } else {
            localStorage.setItem(username, password);
            alert("✅ สมัครสมาชิกสำเร็จ! โปรดเข้าสู่ระบบ");
            toggleForm();
        }
    } else {
        alert("❌ กรุณากรอกข้อมูลให้ครบ!");
    }
}

// เข้าสู่ระบบ
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (localStorage.getItem(username) === password) {
        sessionStorage.setItem("user", username);
        alert("เข้าสู่ระบบสำเร็จ!");
        window.location.href = "index.html";
    } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
}


// ออกจากระบบ
function logout() {
    sessionStorage.removeItem("user");
    alert("✅ ออกจากระบบสำเร็จ!");
    location.reload();
}

window.onload = function() {
    let user = sessionStorage.getItem("user");

    if (user) {
        document.getElementById("user-info").innerText = `👤 ${user}`;
        document.getElementById("logout-btn").style.display = "inline-block";

        let loginBtn = document.getElementById("login-btn");
        if (loginBtn) loginBtn.style.display = "none"; 
    } else {
        document.getElementById("user-info").innerText = "ยังไม่ได้เข้าสู่ระบบ";
        document.getElementById("logout-btn").style.display = "none";

        let loginBtn = document.getElementById("login-btn");
        if (loginBtn) loginBtn.style.display = "inline-block";
    }
};
