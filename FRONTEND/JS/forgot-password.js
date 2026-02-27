document.addEventListener('DOMContentLoaded', function() {
    const sendOtpBtn = document.getElementById('sendOtp');
    const verifyOtpBtn = document.getElementById('verifyOtp');
    const phoneInput = document.getElementById('phone');
    const otpSection = document.getElementById('otpSection');
    const otpInput = document.getElementById('otp');
    const resultMessage = document.getElementById('resultMessage');

    function showError(id, msg) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = msg;
            el.classList.add('show');
        }
    }
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });
        resultMessage.textContent = '';
    }
    
    sendOtpBtn.addEventListener('click', function() {
        clearErrors();
        const phone = phoneInput.value.trim();
        if (!/^[0-9]{10}$/.test(phone)) {
            showError('phoneError', 'Enter a 10-digit phone number');
            return;
        }
        // simulate sending OTP
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        otpSection.classList.remove('hidden');
        resultMessage.textContent = 'OTP sent to +' + phone;
        resultMessage.dataset.otp = generatedOtp;
        console.log('DEBUG: OTP is', generatedOtp);
    });

    verifyOtpBtn.addEventListener('click', function() {
        clearErrors();
        const entered = otpInput.value.trim();
        const correct = resultMessage.dataset.otp;
        if (entered === '') {
            showError('otpError', 'Please enter the OTP');
            return;
        }
        if (entered === correct) {
            resultMessage.textContent = 'OTP verified! You may now reset your password.';
            otpSection.classList.add('hidden');
            // optionally redirect to reset page
        } else {
            showError('otpError', 'Incorrect OTP. Try again.');
        }
    });
});