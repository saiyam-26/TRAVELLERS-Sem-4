// Form validation and password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrengthDisplay = document.getElementById('passwordStrength');

    // Toggle Password Visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    if (toggleConfirmPasswordBtn) {
        toggleConfirmPasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    // Password Strength Indicator
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = '';
            let strengthClass = '';

            if (password.length === 0) {
                strength = '';
            } else if (password.length < 6) {
                strength = 'Too short (min 6 characters)';
                strengthClass = 'weak';
            } else if (/^[a-z0-9]*$/.test(password)) {
                strength = 'Weak - Add uppercase & numbers';
                strengthClass = 'weak';
            } else if (/^[a-zA-Z0-9]*$/.test(password)) {
                strength = 'Medium - Consider adding special characters';
                strengthClass = 'medium';
            } else {
                strength = 'Strong ✓';
                strengthClass = 'strong';
            }

            passwordStrengthDisplay.textContent = strength;
            passwordStrengthDisplay.className = 'password-strength ' + strengthClass;
        });
    }

    // Form Validation
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => {
                el.classList.remove('show');
                el.textContent = '';
            });

            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;

            let isValid = true;

            // Validate First Name
            if (firstName === '') {
                showError('firstNameError', 'First name is required');
                isValid = false;
            } else if (firstName.length < 2) {
                showError('firstNameError', 'First name must be at least 2 characters');
                isValid = false;
            }

            // Validate Last Name
            if (lastName === '') {
                showError('lastNameError', 'Last name is required');
                isValid = false;
            } else if (lastName.length < 2) {
                showError('lastNameError', 'Last name must be at least 2 characters');
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate Phone
            if (phone === '') {
                showError('phoneError', 'Phone number is required');
                isValid = false;
            } else if (!/^[0-9]{10}$/.test(phone)) {
                showError('phoneError', 'Phone number must be 10 digits');
                isValid = false;
            }

            // Validate Password
            if (password === '') {
                showError('passwordError', 'Password is required');
                isValid = false;
            } else if (password.length < 6) {
                showError('passwordError', 'Password must be at least 6 characters');
                isValid = false;
            } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
                showError('passwordError', 'Password must contain uppercase, lowercase, and numbers');
                isValid = false;
            }

            // Validate Confirm Password
            if (confirmPassword === '') {
                showError('confirmPasswordError', 'Please confirm your password');
                isValid = false;
            } else if (password !== confirmPassword) {
                showError('confirmPasswordError', 'Passwords do not match');
                isValid = false;
            }

            // Validate Terms
            if (!terms) {
                showError('termsError', 'You must accept the terms and conditions');
                isValid = false;
            }

            // If valid, submit to API
            if (isValid) {
                const payload = { firstName, lastName, email, phone, password };
                fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                        alert('Account created successfully! Redirecting...');
                        window.location.href = 'index.html';
                    } else {
                        alert(data.error || 'Registration failed');
                    }
                })
                .catch(err => alert('Network error'));
            }
        });
    }

    // Helper function to show error messages
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    // Real-time validation on blur
    document.getElementById('firstName')?.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('firstNameError', 'First name is required');
        } else if (this.value.length < 2) {
            showError('firstNameError', 'First name must be at least 2 characters');
        } else {
            document.getElementById('firstNameError').classList.remove('show');
        }
    });

    document.getElementById('lastName')?.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('lastNameError', 'Last name is required');
        } else if (this.value.length < 2) {
            showError('lastNameError', 'Last name must be at least 2 characters');
        } else {
            document.getElementById('lastNameError').classList.remove('show');
        }
    });

    document.getElementById('email')?.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() === '') {
            showError('emailError', 'Email is required');
        } else if (!emailRegex.test(this.value)) {
            showError('emailError', 'Please enter a valid email address');
        } else {
            document.getElementById('emailError').classList.remove('show');
        }
    });

    document.getElementById('phone')?.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('phoneError', 'Phone number is required');
        } else if (!/^[0-9]{10}$/.test(this.value)) {
            showError('phoneError', 'Phone number must be 10 digits');
        } else {
            document.getElementById('phoneError').classList.remove('show');
        }
    });
});
