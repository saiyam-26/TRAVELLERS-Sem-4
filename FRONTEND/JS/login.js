document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // toggle visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function(e) {
            e.preventDefault();
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // clear errors
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('emailError', 'Email is required');
            valid = false;
        } else if (!emailRegex.test(email)) {
            showError('emailError', 'Enter a valid email');
            valid = false;
        }
        if (password === '') {
            showError('passwordError', 'Password is required');
            valid = false;
        }
        if (valid) {
            const payload = { email, password };
            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Logged in successfully!');
                    window.location.href = 'index.html';
                } else {
                    showError('passwordError', data.error || 'Login failed');
                }
            })
            .catch(err => showError('passwordError', 'Network error'));
        }
    });

    function showError(id, msg) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = msg;
            el.classList.add('show');
        }
    }
});