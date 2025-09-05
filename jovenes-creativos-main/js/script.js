// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Cerrar el menú al hacer clic en los enlaces
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Cerrar el menú móvil al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

const fields = {
  name: { regex: /^[a-zA-ZÀ-ÿ\s]{3,}$/, error: "Ingresa un nombre válido (mínimo 3 caracteres)" },
  email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: "Ingresa un email válido" },
  subject: { regex: /^.{3,}$/, error: "El asunto debe tener al menos 3 caracteres" },
  message: { regex: /^.{10,}$/, error: "El mensaje debe tener al menos 10 caracteres" }
};

// Real-time validation
Object.keys(fields).forEach(id => {
  const input = document.getElementById(id);
  const errorMsg = document.getElementById(`${id}Error`);
  
  if (input && errorMsg) {
    input.addEventListener('input', () => {
      if (!fields[id].regex.test(input.value.trim())) {
        errorMsg.textContent = fields[id].error;
        errorMsg.style.display = "block";
        input.style.borderColor = '#ff4444';
      } else {
        errorMsg.style.display = "none";
        input.style.borderColor = 'var(--primary)';
      }
    });
  }
});

// Form submission
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.keys(fields).forEach(id => {
      const input = document.getElementById(id);
      const errorMsg = document.getElementById(`${id}Error`);
      if (input && errorMsg && !fields[id].regex.test(input.value.trim())) {
        errorMsg.textContent = fields[id].error;
        errorMsg.style.display = "block";
        input.style.borderColor = '#ff4444';
        valid = false;
      }
    });

    if (valid) {
      // Simular envío exitoso
      successMessage.style.display = 'block';
      form.reset();
      // Reset border colors
      Object.keys(fields).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
          input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    }
  });
}

// Efecto de escritura
const typedText = document.querySelector('.typed-text');
if (typedText) {
  const text = typedText.textContent;
  typedText.textContent = "";
  let i = 0;
  
  function typeEffect() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i++;
      setTimeout(typeEffect, 100);
    }
  }
  
  // Efecto de inicio de escritura después de cargar la página
  setTimeout(typeEffect, 1000);
}

//Animación del progreso de las habilidades
const animateSkillBars = () => {
  const skillCards = document.querySelectorAll('.skill-card');
  const skillsSection = document.getElementById('skills');
  
  if (!skillsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillCards.forEach((card, index) => {
          const progressBar = card.querySelector('.progress-bar');
          const skillLevel = card.getAttribute('data-skill') || progressBar?.getAttribute('data-width');
          
          if (progressBar && skillLevel) {
            setTimeout(() => {
              progressBar.style.width = skillLevel + '%';
            }, index * 200); // Animación escalonada
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(skillsSection);
};

// Inicializar la animación de las barras de habilidades
animateSkillBars();

// Desplazamiento suave para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Cuenta para encabezado fijo
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Header efecto de scroll
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (header) {
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling abajo
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling arriba
      header.style.transform = 'translateY(0)';
    }
    
    // Agregar fondo al desplazarse
    if (currentScrollY > 50) {
      header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
      header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
  }
  
  lastScrollY = currentScrollY;
});

// Efectos al pasar el cursor sobre la tarjeta con inclinación 3D
const addTiltEffect = () => {
  const cards = document.querySelectorAll('.skill-card, .project-card, .testimonial-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transformStyle = 'preserve-3d';
    });
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
};

// Inicializar efectos de inclinación
addTiltEffect();

// Configuración de Partículas universal (v1 + v2)
window.addEventListener('load', () => {
  console.log('Verificando disponibilidad de tsParticles...');
  if (typeof tsParticles !== "undefined") {
    console.log('Inicializando tsParticles...');
    try {
      tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: {
      color: { value: "#0a0a0a" }
    },
    particles: {
      number: { 
        value: 80, 
        density: { enable: true, area: 800 } 
      },
      color: { value: "#00aaff" },
      shape: { type: "circle" },
      opacity: { 
        value: 0.3, 
        random: true,
        animation: {
          enable: true,
          speed: 1,
          // compatibilidad con v1 y v2
          minimumValue: 0.1, 
          min: 0.1,
          sync: false
        }
      },
      size: { 
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          // compatibilidad con v1 y v2
          minimumValue: 0.5, 
          min: 0.5,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        // compatibilidad con v1 y v2
        outModes: { default: "out" },
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#00aaff",
        opacity: 0.2,
        width: 1
      }
    },
    interactivity: {
      // compatibilidad con v1 y v2
      detectsOn: "canvas",
      detect_on: "canvas",
      events: {
        onHover: { 
          enable: true, 
          mode: "repulse",
          parallax: {
            enable: false,
            force: 60,
            smooth: 10
          }
        },
        onClick: { 
          enable: true, 
          mode: "push" 
        },
        resize: true
      },
      modes: {
        repulse: { 
          distance: 100, 
          duration: 0.4 
        },
        push: { 
          quantity: 4 
        },
        grab: {
          distance: 140,
          links: {
            opacity: 1
          }
        }
      }
    },
    detectRetina: true
    }).then(() => {
        console.log('tsParticles inicializado correctamente');
      }).catch(error => {
        console.error('Error al inicializar tsParticles:', error);
      });
    } catch (error) {
      console.error('Error al cargar tsParticles:', error);
    }
  } else {
    console.error('tsParticles no está disponible');
  }
});

// Carga diferida de imágenes
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Inicializar carga diferida
lazyLoadImages();

// Añadir animación de carga para las tarjetas de habilidad
const addLoadingAnimation = () => {
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
};

// Inicializar animaciones de carga cuando se carga la página
window.addEventListener('load', () => {
  addLoadingAnimation();
});

// Optimización del rendimiento: eventos de desplazamiento de limitación
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Aplicar limitación a los eventos de desplazamiento
window.addEventListener('scroll', throttle(() => {
  // Cualquier animación basada en desplazamiento puede ir aquí
}, 16)); // ~60fps

console.log('Portfolio loaded successfully! 🚀');

const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true;

  // Validaciones
  if (name === "") { document.getElementById('nameError').textContent = "Ingresa tu nombre"; valid = false; }
  else { document.getElementById('nameError').textContent = ""; }

  if (!/\S+@\S+\.\S+/.test(email)) { document.getElementById('emailError').textContent = "Correo inválido"; valid = false; }
  else { document.getElementById('emailError').textContent = ""; }

  if (subject === "") { document.getElementById('subjectError').textContent = "Ingresa un asunto"; valid = false; }
  else { document.getElementById('subjectError').textContent = ""; }

  if (message === "") { document.getElementById('messageError').textContent = "Escribe tu mensaje"; valid = false; }
  else { document.getElementById('messageError').textContent = ""; }

  if (!valid) return;

  // Mostrar loader
  submitBtn.classList.add("loading");

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      successMessage.textContent = "¡Mensaje enviado correctamente!";
      successMessage.style.display = "block";
      successMessage.style.color = "#0f0";
      form.reset();
    } else {
      successMessage.textContent = "Hubo un error al enviar. Intenta de nuevo.";
      successMessage.style.display = "block";
      successMessage.style.color = "#ff4d4d";
    }
  } catch (err) {
    successMessage.textContent = "Error de conexión. Intenta más tarde.";
    successMessage.style.display = "block";
    successMessage.style.color = "#ff4d4d";
  } finally {
    // Ocultar loader
    submitBtn.classList.remove("loading");
  }
});

