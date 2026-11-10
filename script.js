const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

// Simple accessible testimonial carousel: rotates card order on arrow clicks.
const grid = document.querySelector('#testimonial-grid');
document.querySelector('#next-testimonial')?.addEventListener('click', () => {
  if (grid?.firstElementChild) grid.append(grid.firstElementChild);
});
document.querySelector('#prev-testimonial')?.addEventListener('click', () => {
  if (grid?.lastElementChild) grid.prepend(grid.lastElementChild);
});

const footerForm = document.querySelector('.footer-form');
const formError = document.querySelector('.form-error');
const formStatus = document.querySelector('.form-status');

const counters = document.querySelectorAll('.metrics strong');

const animateCounter = (element) => {
  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;

    if (target % 1 !== 0) {
      element.textContent = `${value.toFixed(1)}${suffix}`;
    } else {
      element.textContent = `${Math.round(value)}${suffix}`;
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(step);
};

counters.forEach((counter) => animateCounter(counter));

const popup = document.createElement('div');
popup.className = 'form-popup';
popup.innerHTML = `
  <div class="popup-icon">✓</div>
  <div>
    <strong>Requested successfully</strong>
    <span>We will get back to you soon.</span>
  </div>
  <button class="close-popup" type="button" aria-label="Close popup">×</button>
`;
document.body.appendChild(popup);

const popupClose = popup.querySelector('.close-popup');
popupClose?.addEventListener('click', () => popup.classList.remove('show'));

footerForm?.addEventListener('submit', (event) => {
  const emailInput = footerForm.querySelector('input[name="email"]');
  const messageInput = footerForm.querySelector('textarea[name="message"]');
  const email = emailInput?.value.trim() || '';
  const message = messageInput?.value.trim() || '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  emailInput?.classList.remove('invalid');
  messageInput?.classList.remove('invalid');
  formError?.classList.remove('show');
  formStatus?.classList.remove('show');
  formError.textContent = '';
  formStatus.textContent = '';

  if (!email || !message) {
    if (!email) emailInput?.classList.add('invalid');
    if (!message) messageInput?.classList.add('invalid');
    formError.textContent = 'Please enter your work email and a message.';
    formError.classList.add('show');
    event.preventDefault();
    return;
  }

  if (!emailRegex.test(email)) {
    emailInput?.classList.add('invalid');
    formError.textContent = 'Please enter a valid work email address.';
    formError.classList.add('show');
    event.preventDefault();
    return;
  }

  event.preventDefault();

  const formData = new FormData(footerForm);

  fetch(footerForm.action, {
    method: footerForm.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) throw new Error('Submission failed');
      formStatus.textContent = 'Requested successfully';
      formStatus.classList.add('show');
      popup.innerHTML = `
        <div class="popup-icon">✓</div>
        <div>
          <strong>Thank you for contacting our team</strong>
          <span>We will reach you shortly.</span>
        </div>
        <button class="close-popup" type="button" aria-label="Close popup">×</button>
      `;
      popup.classList.add('show');
      setTimeout(() => {
        popup.classList.remove('show');
        popup.innerHTML = `
          <div class="popup-icon">✓</div>
          <div>
            <strong>Thank you for contacting our team</strong>
            <span>We will reach you shortly.</span>
          </div>
          <button class="close-popup" type="button" aria-label="Close popup">×</button>
        `;
      }, 4000);
      footerForm.reset();
    })
    .catch(() => {
      formError.textContent = 'Oops! There was a problem submitting your form.';
      formError.classList.add('show');
    });
});
