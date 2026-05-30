
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const icon = hamburger.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});


const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 80;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 24px rgba(26,92,173,0.25)';
  } else {
    navbar.style.boxShadow = '0 2px 16px rgba(26,92,173,0.18)';
  }
});

const modal      = document.getElementById('skillModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const modalIcon  = document.getElementById('modalIcon');
const modalClose = document.getElementById('modalClose');


const skillIcons = {
  'HTML':             '<i class="fab fa-html5" style="color:#e34f26;font-size:3rem;"></i>',
  'CSS':              '<i class="fab fa-css3-alt" style="color:#264de4;font-size:3rem;"></i>',
  'JavaScript':       '<i class="fab fa-js" style="color:#f7df1e; font-size:2.6rem;"></i>',
  'Git':              '<i class="fab fa-git-alt" style="color:#f05032;font-size:3rem;"></i>',
  'Responsive Design':'<i class="fas fa-mobile-alt" style="color:#1a5cad;font-size:3rem;"></i>',
  'Flexbox':          '<i class="fas fa-th-large" style="color:#14459e;font-size:3rem;"></i>',
  'DOM Manipulation': '<i class="fas fa-code" style="color:#0d9488;font-size:3rem;"></i>',
};

document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', () => {
    const skill = card.dataset.skill;
    const desc  = card.dataset.desc;
    modalTitle.textContent = skill;
    modalDesc.textContent  = desc;
    modalIcon.innerHTML    = skillIcons[skill] || '<i class="fas fa-star" style="font-size:3rem;color:#1a5cad;"></i>';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


const sendBtn    = document.getElementById('sendBtn');
const nameInput  = document.getElementById('name');
const emailInput = document.getElementById('email');
const msgInput   = document.getElementById('message');
const nameErr    = document.getElementById('nameErr');
const emailErr   = document.getElementById('emailErr');
const msgErr     = document.getElementById('msgErr');
const successMsg = document.getElementById('successMsg');

function clearErrors() {
  [nameInput, emailInput, msgInput].forEach(el => el.classList.remove('error'));
  [nameErr, emailErr, msgErr].forEach(el => el.textContent = '');
  successMsg.classList.remove('show');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

sendBtn.addEventListener('click', () => {
  clearErrors();
  let valid = true;

  const name  = nameInput.value.trim();
  const email = emailInput.value.trim();
  const msg   = msgInput.value.trim();

  if (!name) {
    nameErr.textContent = 'Please enter your name.';
    nameInput.classList.add('error');
    valid = false;
  }

  if (!email) {
    emailErr.textContent = 'Please enter your email.';
    emailInput.classList.add('error');
    valid = false;
  } else if (!isValidEmail(email)) {
    emailErr.textContent = 'Please enter a valid email address.';
    emailInput.classList.add('error');
    valid = false;
  }

  if (!msg) {
    msgErr.textContent = 'Please write your message.';
    msgInput.classList.add('error');
    valid = false;
  } else if (msg.length < 10) {
    msgErr.textContent = 'Please enter at least 10 characters.';
    msgInput.classList.add('error');
    valid = false;
  }

  if (valid) {
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    setTimeout(() => {
      successMsg.classList.add('show');
      nameInput.value  = '';
      emailInput.value = '';
      msgInput.value   = '';
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send Message';

      setTimeout(() => successMsg.classList.remove('show'), 5000);
    }, 1200);
  }
});

[nameInput, emailInput, msgInput].forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('error');
    const errId = input.id + 'Err';
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = '';
  });
});

const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .about-content, .contact-form-wrap'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});
