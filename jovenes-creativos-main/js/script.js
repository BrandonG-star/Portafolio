// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Verificar que los elementos existen antes de agregar event listeners
if (hamburger && navLinks) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que el clic se propague al documento
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Formulario con validación en tiempo real
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

const fields = {
  name: { regex: /^[a-zA-Z\s]{3,}$/, error: "Ingresa un nombre válido" },
  email: { regex: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, error: "Correo inválido" },
  subject: { regex: /^.{3,}$/, error: "El asunto es requerido" },
  message: { regex: /^.{5,}$/, error: "El mensaje debe tener al menos 5 caracteres" }
};

Object.keys(fields).forEach(id => {
  const input = document.getElementById(id);
  const errorMsg = document.getElementById(`${id}Error`);
  input.addEventListener('input', () => {
    if (!fields[id].regex.test(input.value.trim())) {
      errorMsg.textContent = fields[id].error;
      errorMsg.style.display = "block";
    } else {
      errorMsg.style.display = "none";
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  Object.keys(fields).forEach(id => {
    const input = document.getElementById(id);
    const errorMsg = document.getElementById(`${id}Error`);
    if (!fields[id].regex.test(input.value.trim())) {
      errorMsg.textContent = fields[id].error;
      errorMsg.style.display = "block";
      valid = false;
    }
  });

  if (valid) {
    successMessage.style.display = 'block';
    form.reset();
  }
});

// Animar barras de progreso al hacer scroll
const progressSpans = document.querySelectorAll('.progress span');
const skillsSection = document.getElementById('skills');

window.addEventListener('scroll', () => {
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    progressSpans.forEach(span => {
      const percentage = span.dataset.skill;
      span.style.width = percentage + "%";
    });
  }
});

// Efecto typing
const typedText = document.querySelector('.typed-text');
if (typedText) {
  let text = typedText.textContent;
  typedText.textContent = "";
  let i = 0;
  function typeEffect() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i++;
      setTimeout(typeEffect, 100);
    }
  }
  typeEffect();
}
// tsParticles - Fondo animado
tsParticles.load("tsparticles", {
  fpsLimit: 60,
  background: {
    color: { value: "#0a0a0a" }
  },
  particles: {
    number: { value: 80, density: { enable: true, area: 800 } },
    color: { value: "#00aaff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: { min: 1, max: 4 } },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      outModes: { default: "out" }
    },
    links: {
      enable: true,
      distance: 150,
      color: "#00aaff",
      opacity: 0.4,
      width: 1
    }
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { quantity: 4 }
    }
  },
  detectRetina: true
});
