// Kullanıcı verilerini yerel depodan al veya boş obje oluştur
let users = JSON.parse(localStorage.getItem('levia_data')) || {};

function showPage(pageId, sub) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    if(pageId === 'auth') {
        document.getElementById('login-form').style.display = sub === 'login' ? 'block' : 'none';
        document.getElementById('register-form').style.display = sub === 'register' ? 'block' : 'none';
    }
}

// KAYIT OLMA FONKSİYONU (DÜZELTİLDİ)
function handleRegister() {
    const user = document.getElementById('r-user').value.trim();
    const pass = document.getElementById('r-pass').value;

    if (!user || !pass) return toast("Lütfen tüm alanları doldurun!", "error");
    if (users[user]) return toast("Bu kullanıcı zaten mevcut!", "error");

    // Veriyi kaydet
    users[user] = { password: pass };
    localStorage.setItem('levia_data', JSON.stringify(users));
    
    toast("Kayıt başarılı! Giriş yapabilirsiniz.", "success");
    showPage('auth', 'login'); // Kayıttan sonra giriş ekranına atar
}

// GİRİŞ YAPMA FONKSİYONU
function handleLogin() {
    const user = document.getElementById('l-user').value.trim();
    const pass = document.getElementById('l-pass').value;

    if (users[user] && users[user].password === pass) {
        document.getElementById('display-name').innerText = user;
        document.getElementById('auth-actions').style.display = 'none';
        document.getElementById('user-profile').style.display = 'flex';
        toast("Hoş geldin, " + user, "success");
        showPage('home');
    } else {
        toast("Kullanıcı adı veya şifre hatalı!", "error");
    }
}

function toast(msg, type) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.style.background = type === 'success' ? '#2e7d32' : '#c62828';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function openModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal() { document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none'); }
function logout() { location.reload(); }