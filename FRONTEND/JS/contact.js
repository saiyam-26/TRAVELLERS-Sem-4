document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  function clearErrors() {
    form.querySelectorAll('.error-message').forEach(el => el.remove());
  }

  function showError(input, msg) {
    clearErrors();
    const span = document.createElement('span');
    span.className = 'error-message';
    span.style.color = '#d32f2f';
    span.style.fontSize = '13px';
    span.style.display = 'block';
    span.style.marginTop = '6px';
    span.textContent = msg;
    input.parentNode.appendChild(span);
    input.focus();
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const firstName = form.querySelector('#firstName');
    const lastName = form.querySelector('#lastName');
    const phone = form.querySelector('#phone');
    const message = form.querySelector('#message');
    const age = form.querySelector('#age');

    if (!firstName.value.trim() || firstName.value.trim().length < 2) {
      return showError(firstName, 'Enter a valid first name (min 2 chars)');
    }
    if (!lastName.value.trim() || lastName.value.trim().length < 2) {
      return showError(lastName, 'Enter a valid last name (min 2 chars)');
    }

    const phoneDigits = phone.value.replace(/[^0-9]/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      return showError(phone, 'Enter a valid phone number (10 digits)');
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      return showError(message, 'Message too short (min 10 chars)');
    }

    if (age && age.value) {
      const a = Number(age.value);
      if (Number.isNaN(a) || a < 0) return showError(age, 'Enter a valid age');
    }

    // If valid: simple success flow (no backend submission)
    alert('Message sent — we will contact you soon.');
    form.reset();
    // update navbar across pages if user is stored
  });
});
