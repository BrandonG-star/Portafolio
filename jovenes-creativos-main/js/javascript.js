/* ========================================
   PORTFOLIO - JAVASCRIPT COMPLETO
   ======================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       VARIABLES GLOBALES
       ======================================== */
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    /* ========================================
       MENÚ HAMBURGUESA RESPONSIVE
       ======================================== */
    
    function setupMobileMenu() {
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle clases
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevenir scroll del body cuando el menú está abierto
                if (navMenu.classList.contains('active')) {
                    document.body.classList.add('menu-open');
                } else {
                    document.body.classList.remove('menu-open');
                }
            });
            
            // Cerrar menú al hacer clic en un enlace
            navLinks.forEach((link, index) => {
                link.addEventListener('click', (e) => {
                    // Solo cerrar en móvil
                    if (window.innerWidth <= 768) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                });
            });
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', function(event) {
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    const isClickInsideNav = navMenu.contains(event.target);
                    const isClickOnHamburger = hamburger.contains(event.target);
                    
                    if (!isClickInsideNav && !isClickOnHamburger) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                }
            });
            
            // Cerrar menú al cambiar orientación o redimensionar
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
            
        }
    }
    
    /* ========================================
       NAVEGACIÓN SUAVE Y ENLACES ACTIVOS
       ======================================== */
    
    function setupSmoothScrolling() {
        // Smooth scrolling para todos los enlaces que empiecen con #
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const headerHeight = document.querySelector('header').offsetHeight;
            
            // Verificar si la sección está visible en el viewport
            if (rect.top <= headerHeight + 50 && rect.bottom >= headerHeight + 50) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Actualizar enlaces activos
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            link.classList.toggle('active', href === currentSection);
        });
    }
    
    /* ========================================
       ANIMACIONES DE BARRAS DE HABILIDADES
       ======================================== */
    
    function animateSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgress = entry.target.querySelector('.skill-progress');
                    const width = skillProgress.getAttribute('data-width');
                    
                    // Animar la barra con un pequeño delay
                    setTimeout(() => {
                        skillProgress.style.width = width + '%';
                    }, 200);
                    
                    // Dejar de observar este elemento
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        // Observar todas las habilidades
        document.querySelectorAll('.skill-item').forEach(skill => {
            observer.observe(skill);
        });
    }
    
    /* ========================================
       MANIPULACIÓN DEL DOM - ANIMACIONES
       ======================================== */
    
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.project-card, .contact-item, .about-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    /* ========================================
       VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
       ======================================== */
    
    function setupFormValidation() {
        if (!contactForm) return;
        
        const formInputs = contactForm.querySelectorAll('input, textarea');
        const submitButton = contactForm.querySelector('.btn-submit');
        const formMessage = document.getElementById('form-message');
        
        // Reglas de validación
        const validationRules = {
            nombre: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: 'El nombre debe contener solo letras y espacios (mín. 2 caracteres)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingresa un email válido (ejemplo@correo.com)'
            },
            asunto: {
                required: true,
                minLength: 5,
                maxLength: 100,
                message: 'El asunto debe tener entre 5 y 100 caracteres'
            },
            mensaje: {
                required: true,
                minLength: 10,
                maxLength: 500,
                message: 'El mensaje debe tener entre 10 y 500 caracteres'
            }
        };
        
        // Función de validación individual
        function validateField(field) {
            const fieldName = field.name;
            const fieldValue = field.value.trim();
            const rules = validationRules[fieldName];
            const errorElement = document.getElementById(`${fieldName}-error`);
            
            if (!rules) return true;
            
            // Limpiar estado previo
            field.classList.remove('error', 'success');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            
            // Validar campo requerido
            if (rules.required && !fieldValue) {
                showFieldError(field, errorElement, 'Este campo es obligatorio');
                return false;
            }
            
            // Si el campo está vacío y no es requerido, es válido
            if (!fieldValue && !rules.required) {
                return true;
            }
            
            // Validar longitud mínima
            if (rules.minLength && fieldValue.length < rules.minLength) {
                showFieldError(field, errorElement, rules.message);
                return false;
            }
            
            // Validar longitud máxima
            if (rules.maxLength && fieldValue.length > rules.maxLength) {
                showFieldError(field, errorElement, rules.message);
                return false;
            }
            
            // Validar patrón
            if (rules.pattern && !rules.pattern.test(fieldValue)) {
                showFieldError(field, errorElement, rules.message);
                return false;
            }
            
            // Campo válido
            field.classList.add('success');
            return true;
        }
        
        function showFieldError(field, errorElement, message) {
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        // Event listeners para validación en tiempo real
        formInputs.forEach(input => {
            // Validar al escribir (con debounce)
            let timeoutId;
            input.addEventListener('input', function() {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    validateField(this);
                }, 300);
            });
            
            // Validar al perder el foco
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Limpiar errores al enfocar
            input.addEventListener('focus', function() {
                this.classList.remove('error');
                const errorElement = document.getElementById(`${this.name}-error`);
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            });
        });
        
        // Manejar envío del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar todos los campos
            let isFormValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                submitForm();
            } else {
                showFormMessage('Por favor, corrige los errores antes de enviar.', 'error');
            }
        });
        
        function submitForm() {
            // Mostrar estado de carga
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            
            // Simular envío (reemplazar con tu lógica de envío real)
            setTimeout(() => {
                // Simular éxito (70% del tiempo) o error (30% del tiempo)
                const isSuccess = Math.random() > 0.3;
                
                if (isSuccess) {
                    showFormMessage('¡Mensaje enviado exitosamente! Te responderé pronto.', 'success');
                    contactForm.reset();
                    
                    // Limpiar clases de validación
                    formInputs.forEach(input => {
                        input.classList.remove('success', 'error');
                        const errorElement = document.getElementById(`${input.name}-error`);
                        if (errorElement) {
                            errorElement.classList.remove('show');
                        }
                    });
                } else {
                    showFormMessage('Error al enviar el mensaje. Inténtalo nuevamente.', 'error');
                }
                
                // Restaurar botón
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                
            }, 2000); // 2 segundos de delay simulado
        }
        
        function showFormMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = `form-message show ${type}`;
            
            // Auto-ocultar después de 5 segundos
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        }
    }
    
    /* ========================================
       EVENT LISTENERS ADICIONALES
       ======================================== */
    
    function setupEventListeners() {
        // Listener de scroll para múltiples funcionalidades
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            // Throttle del scroll para mejor performance
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(() => {
                updateActiveNavLink();
                
                // Efecto parallax sutil en el hero
                const scrolled = window.pageYOffset;
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    const speed = scrolled * 0.3;
                    heroContent.style.transform = `translateY(${speed}px)`;
                }
                
            }, 10);
        });
        
        // Listener para cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            // Cerrar menú móvil si se cambia a desktop
            if (window.innerWidth > 768) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Listener para teclas de accesibilidad
        document.addEventListener('keydown', (e) => {
            // Cerrar menú móvil con Escape
            if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    /* ========================================
       UTILIDADES ADICIONALES
       ======================================== */
    
    // Función para detectar dispositivo móvil
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }
    
    // Función para agregar clases CSS dinámicamente
    function addDynamicStyles() {
        // Detectar soporte para backdrop-filter
        if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
            document.querySelector('header').style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        // Detectar preferencia de movimiento reducido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#27ae60' : 
                           type === 'error' ? '#e74c3c' : '#3498db',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        });
        
        document.body.appendChild(notification);
        
        // Animar entrada
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Remover después del tiempo especificado
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
    
    /* ========================================
       INICIALIZACIÓN
       ======================================== */
    
    function init() {
        // Configurar todas las funcionalidades
        setupMobileMenu();
        setupSmoothScrolling();
        animateSkillBars();
        setupScrollAnimations();
        setupFormValidation();
        setupEventListeners();
        addDynamicStyles();
        
        // Ejecutar funciones iniciales
        updateActiveNavLink();
        
        // Mostrar notificación de bienvenida
        setTimeout(() => {
            showNotification('¡Bienvenido a mi portfolio! 👋', 'info', 4000);
        }, 1000);
    }
    
    // Inicializar cuando el DOM esté listo
    init();
    
});

/* ========================================
   FUNCIONES GLOBALES AUXILIARES
   ======================================== */

// Función para smooth scroll programático (accesible globalmente)
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

// Función para validar email (reutilizable)
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

// Función para debounce (optimización de performance)
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Función para throttle (optimización de performance)
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Función para detectar si un elemento está visible
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para animar números (contador)
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.round(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Función para copiar texto al portapapeles
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

// Función para agregar listeners de eventos de forma masiva
function addEventListeners(elements, events, handler) {
    const elementsList = typeof elements === 'string' ? 
        document.querySelectorAll(elements) : elements;
    
    const eventsList = Array.isArray(events) ? events : [events];
    
    elementsList.forEach(element => {
        eventsList.forEach(event => {
            element.addEventListener(event, handler);
        });
    });
}

// Función para remover clases de múltiples elementos
function removeClassFromElements(elements, className) {
    const elementsList = typeof elements === 'string' ? 
        document.querySelectorAll(elements) : elements;
    
    elementsList.forEach(element => {
        element.classList.remove(className);
    });
}

// Función para agregar clases a múltiples elementos
function addClassToElements(elements, className) {
    const elementsList = typeof elements === 'string' ? 
        document.querySelectorAll(elements) : elements;
    
    elementsList.forEach(element => {
        element.classList.add(className);
    });
}

// Función para alternar modo oscuro (si se implementa en el futuro)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Guardar preferencia en localStorage
    if (typeof Storage !== 'undefined') {
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    }
    
    return isDark;
}

// Función para cargar preferencias guardadas
function loadSavedPreferences() {
    if (typeof Storage !== 'undefined') {
        // Cargar tema oscuro si está guardado
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            document.body.classList.add('dark-mode');
        }
        
        // Cargar otras preferencias aquí...
    }
}

// Función para manejar errores globalmente
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
    
    // En desarrollo, mostrar error en consola
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Detalles del error:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            error: e.error
        });
    }
    
    // En producción, podrías enviar el error a un servicio de logging
    // sendErrorToLoggingService(e.error);
});

// Función para manejar promesas rechazadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rechazada:', e.reason);
    
    // Prevenir que el error aparezca en la consola del navegador
    // e.preventDefault();
});

/* ========================================
   MEJORAS DE PERFORMANCE
   ======================================== */

// Lazy loading para imágenes (si no se usa el atributo loading="lazy")
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                    
                    // Opcional: agregar clase cuando la imagen se carga
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
            img.classList.add('lazy');
        });
    } else {
        // Fallback para navegadores sin soporte
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}



// Optimización de scroll con RequestAnimationFrame
const optimizedScroll = (() => {
    let ticking = false;
    
    function updateScrollEffects() {
        // Aquí van las funciones que dependen del scroll
        // Ya implementadas en el código principal
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    return requestTick;
})();









/* ========================================
   FIN DEL ARCHIVO JAVASCRIPT
   ======================================== */