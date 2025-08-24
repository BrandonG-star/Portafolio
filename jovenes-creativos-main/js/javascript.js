/* ================================
   PORTFOLIO - JAVASCRIPT
   ================================ */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // SMOOTH SCROLLING PARA NAVEGACIÓN
    // ================================
    
    // Seleccionar todos los enlaces que comienzan con #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Calcular la posición considerando el header fijo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto (para futuras implementaciones)
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // ================================
    // EFECTO PARALLAX EN EL HERO
    // ================================
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);

    // ================================
    // ANIMACIONES AL HACER SCROLL
    // ================================
    
    // Función para detectar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para animar elementos cuando aparecen en pantalla
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.project-card, .skill, .contact-item');
        
        animatedElements.forEach((element, index) => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.classList.add('animated');
                }, index * 100); // Retraso escalonado
            }
        });
    }
    
    // Inicializar elementos para animación
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.project-card, .contact-item');
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    // Inicializar animaciones y agregar listener de scroll
    initAnimations();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar

    // ================================
    // NAVBAR ACTIVO SEGÚN SECCIÓN
    // ================================
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top - 100; // Offset para el header
            
            if (sectionTop <= 0 && rect.bottom >= 0) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Actualizar clases activas
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1); // Remover #
            
            if (href === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Ejecutar una vez al cargar

    // ================================
    // EFECTO TYPING PARA EL TÍTULO
    // ================================
    
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto typing al título principal (opcional)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }

    // ================================
    // LOADER DE IMÁGENES PROGRESIVO
    // ================================
    
    function lazyLoadImages() {
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
    }
    
    // Inicializar lazy loading si hay imágenes con data-src
    if (document.querySelectorAll('img[data-src]').length > 0) {
        lazyLoadImages();
    }

    // ================================
    // VALIDACIÓN DE FORMULARIO (si se agrega)
    // ================================
    
    function setupContactForm() {
        const contactForm = document.querySelector('#contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aquí puedes agregar la lógica de envío del formulario
                const formData = new FormData(this);
                
                // Ejemplo de validación simple
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                if (name && email && message) {
                    // Simular envío exitoso
                    showNotification('¡Mensaje enviado exitosamente!', 'success');
                    this.reset();
                } else {
                    showNotification('Por favor, completa todos los campos.', 'error');
                }
            });
        }
    }
    
    setupContactForm();

    // ================================
    // SISTEMA DE NOTIFICACIONES
    // ================================
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos inline para la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '5px',
            color: 'white',
            fontSize: '14px',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'
        });
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ================================
    // CONTADOR DE SKILLS (ANIMACIÓN)
    // ================================
    
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const percentage = bar.dataset.percentage;
            const fill = bar.querySelector('.skill-fill');
            
            if (fill && isElementInViewport(bar)) {
                setTimeout(() => {
                    fill.style.width = percentage + '%';
                }, 200);
            }
        });
    }
    
    // Si tienes barras de progreso para las skills, descomentar:
    // window.addEventListener('scroll', animateSkillBars);

    // ================================
    // DARK MODE TOGGLE (OPCIONAL)
    // ================================
    
    function setupDarkMode() {
        const darkModeToggle = document.querySelector('#dark-mode-toggle');
        
        if (darkModeToggle) {
            // Verificar preferencia guardada
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.body.classList.toggle('dark-mode', savedTheme === 'dark');
            }
            
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }
    }
    
    setupDarkMode();

    // ================================
    // MENÚ MÓVIL (HAMBURGER)
    // ================================
    
    function setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.classList.toggle('active');
            });
            
            // Cerrar menú al hacer clic en un enlace
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                });
            });
        }
    }
    
    setupMobileMenu();

    // ================================
    // SMOOTH REVEAL DE ELEMENTOS
    // ================================
    
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);

    // ================================
    // INICIALIZACIÓN FINAL
    // ================================
    
    // Ejecutar funciones de inicialización
    console.log('🚀 Portfolio JavaScript cargado correctamente');
    
    // Agregar clases de reveal a elementos que queremos animar
    const elementsToReveal = document.querySelectorAll('.project-card, .about-content, .contact-item');
    elementsToReveal.forEach(el => el.classList.add('reveal'));
    
    // Ejecutar reveal inicial
    revealOnScroll();
    
    // Performance: Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Ejecutar funciones de scroll con throttle
            updateActiveNavLink();
            animateOnScroll();
            revealOnScroll();
        }, 10);
    });

});

// ================================
// FUNCIONES GLOBALES AUXILIARES
// ================================

// Función para smooth scroll programático
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Función para cambiar el tema
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Función para mostrar/ocultar elementos
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para formatear texto
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Función para generar IDs únicos
function generateId(prefix = 'id') {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
}

/* ================================
   FIN DEL ARCHIVO JAVASCRIPT
   ================================ */