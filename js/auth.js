/* ============================================
   CIECCCFEM - AUTHENTICATION SYSTEM
   Preparado para integración futura con:
   - Firebase Authentication
   - Google Sign-In
   - Phone Authentication
   - Email/Password
   ============================================ */

// Auth state management
const AuthState = {
    currentUser: null,
    isAuthenticated: false,

    // Initialize auth state from localStorage
    init() {
        const savedUser = localStorage.getItem('ciecccfem-user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isAuthenticated = true;
        }
    },

    // Set user after successful login
    setUser(user) {
        this.currentUser = user;
        this.isAuthenticated = true;
        localStorage.setItem('ciecccfem-user', JSON.stringify(user));
    },

    // Clear user on logout
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('ciecccfem-user');
        // TODO: Sign out from Firebase when integrated
    }
};

AuthState.init();

// Toggle between login and register forms
function showRegister() {
    document.getElementById('loginBox').classList.add('hidden');
    document.getElementById('phoneBox').classList.add('hidden');
    document.getElementById('registerBox').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registerBox').classList.add('hidden');
    document.getElementById('phoneBox').classList.add('hidden');
    document.getElementById('loginBox').classList.remove('hidden');
}

function showPhoneLogin() {
    document.getElementById('loginBox').classList.add('hidden');
    document.getElementById('registerBox').classList.add('hidden');
    document.getElementById('phoneBox').classList.remove('hidden');
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Handle Email/Password Login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // TODO: Integrate with Firebase Auth
    // firebase.auth().signInWithEmailAndPassword(email, password)

    // Temporary mock login for demo
    console.log('Login attempt:', { email });

    // Mock successful login
    const mockUser = {
        uid: 'mock-user-id',
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
        provider: 'email'
    };

    AuthState.setUser(mockUser);

    alert('Inicio de sesión exitoso (Demo)');
    // window.location.href = 'dashboard.html';
}

// Handle Registration
function handleRegister(e) {
    e.preventDefault();

    const nombre = document.getElementById('regNombre').value;
    const apellido = document.getElementById('regApellido').value;
    const email = document.getElementById('regEmail').value;
    const telefono = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirm').value;

    // Validation
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    // TODO: Integrate with Firebase Auth
    // firebase.auth().createUserWithEmailAndPassword(email, password)

    console.log('Register attempt:', { nombre, apellido, email, telefono });

    // Mock successful registration
    const mockUser = {
        uid: 'mock-new-user-id',
        email: email,
        displayName: nombre + ' ' + apellido,
        phoneNumber: telefono,
        photoURL: null,
        provider: 'email'
    };

    AuthState.setUser(mockUser);

    alert('Cuenta creada exitosamente (Demo)');
    // window.location.href = 'dashboard.html';
}

// Handle Phone Login
function handlePhoneLogin(e) {
    e.preventDefault();

    const phone = document.getElementById('phoneNumber').value;
    const fullPhone = '+52' + phone.replace(/\D/g, '');

    // TODO: Integrate with Firebase Phone Auth
    // firebase.auth().signInWithPhoneNumber(fullPhone, window.recaptchaVerifier)

    console.log('Phone login attempt:', { phone: fullPhone });

    alert('Se enviaría un código SMS a: ' + fullPhone + ' (Demo - Firebase no configurado)');
}

// Handle Social Login (Google)
function handleSocialLogin(provider) {
    if (provider === 'google') {
        // TODO: Integrate with Firebase Google Auth
        // const provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithPopup(provider)

        console.log('Google login attempt');

        // Mock successful Google login
        const mockUser = {
            uid: 'mock-google-user-id',
            email: 'usuario@gmail.com',
            displayName: 'Usuario Google',
            photoURL: 'https://via.placeholder.com/150',
            provider: 'google'
        };

        AuthState.setUser(mockUser);

        alert('Inicio de sesión con Google exitoso (Demo)');
        // window.location.href = 'dashboard.html';
    }
}

// Check auth state and redirect if needed
function checkAuth() {
    if (!AuthState.isAuthenticated) {
        // Redirect to login if trying to access protected pages
        const protectedPages = ['dashboard.html', 'panel.html', 'app.html'];
        const currentPage = window.location.pathname.split('/').pop();

        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
}

// Logout function
function logout() {
    AuthState.logout();
    window.location.href = 'index.html';
}

// Initialize auth checks
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

/* 
   ============================================
   INSTRUCCIONES PARA INTEGRACIÓN CON FIREBASE
   ============================================

   1. Agregar SDK de Firebase en el <head>:
   <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
   <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"></script>

   2. Inicializar Firebase:
   const firebaseConfig = {
       apiKey: "TU_API_KEY",
       authDomain: "tu-proyecto.firebaseapp.com",
       projectId: "tu-proyecto",
       storageBucket: "tu-proyecto.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abcdef"
   };
   firebase.initializeApp(firebaseConfig);

   3. Reemplazar las funciones mock con llamadas reales a Firebase

   4. Para Phone Auth, agregar reCAPTCHA:
   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
*/
