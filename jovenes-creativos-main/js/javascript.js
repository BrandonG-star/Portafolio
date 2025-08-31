/* ========================================
   PORTFOLIO MODERNO - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       VARIABLES GLOBALES
       ======================================== */
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const header = document.getElementById('header');
    
    let isMenuOpen = false;
    let lastScrollY = window.scrollY;
    
    /* ========================================
       CURSOR PERSONALIZADO
       ======================================== */
    
    function createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.classList.add('visible');
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('visible');
        });
        
        // Animación del cursor
        function animateCursor() {
            const speed = 0.2;
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Efecto hover en elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
    
    /* ========================================
       MENÚ HAMBURGUESA
       ======================================== */
    
    function setupAdvancedMobileMenu() {
        if (!hamburger || !navMenu) {
            console.warn('Elementos del menú no encontrados');
            return;
        }
        
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            toggleMenu();
        });
        
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            
            hamburger.classList.toggle('active', isMenuOpen);
            navMenu.classList.toggle('active', isMenuOpen);
            document.body.classList.toggle('menu-open', isMenuOpen);
            
            // Animar elementos del menú
            if (isMenuOpen) {
                animateMenuItems();
            }
            
            // Menú abierto o cerrado
        }
        
        function animateMenuItems() {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `fadeInUpStagger 0.3s ease ${index * 0.1}s forwards`;
                }, 50);
            });
        }
        
        // Cerrar menú con enlaces
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768 && isMenuOpen) {
                    toggleMenu();
                }
            });
        });
        
        // Cerrar con clic fuera
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu();
            }
        });
        
        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });
        
        // Cerrar al redimensionar
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                toggleMenu();
            }
        });
    }
    
    /* ========================================
       EFECTOS DE SCROLL MODERNOS
       ======================================== */
    
    function setupScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const currentScrollY = window.scrollY;
            
            // Header con efecto hide/show
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            // Agregar clase scrolled al header
            header.classList.toggle('scrolled', currentScrollY > 50);
            
            // Parallax suave en hero
            const hero = document.querySelector('.hero');
            if (hero) {
                const speed = currentScrollY * 0.3;
                hero.style.transform = `translateY(${speed}px)`;
            }
            
            // Actualizar navegación activa
            updateActiveNavigation();
            
            lastScrollY = currentScrollY;
            ticking = false;
        }
        
        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
    
    /* ========================================
       NAVEGACIÓN ACTIVA Y SMOOTH SCROLL
       ======================================== */
    
    function setupSmoothNavigation() {
        // Smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Tracking analytics
                    trackEvent('Navigation', 'Section Click', targetId);
                }
            });
        });
    }
    
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const headerHeight = header.offsetHeight;
            
            if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight + 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            link.classList.toggle('active', href === currentSection);
        });
    }
    
    /* ========================================
       ANIMACIONES DE HABILIDADES AVANZADAS
       ======================================== */
    
    function setupSkillAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const skillProgress = entry.target.querySelector('.skill-progress');
                    const width = skillProgress.getAttribute('data-width');
                    
                    // Delay escalonado para efecto cascada
                    setTimeout(() => {
                        skillProgress.style.width = width + '%';
                        
                        // Efecto de conteo de números
                        const percentage = entry.target.querySelector('.skill-percentage');
                        animateNumber(percentage, parseInt(width), 2000);
                        
                        // Añadir efecto de glow
                        setTimeout(() => {
                            skillProgress.style.boxShadow = 'var(--glow-primary)';
                        }, 1000);
                        
                    }, index * 200);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillItems.forEach(skill => observer.observe(skill));
    }
    
    /* ========================================
       VALIDACIÓN DE FORMULARIO AVANZADA
       ======================================== */
    
    function setupAdvancedFormValidation() {
        if (!contactForm) return;
        
        const formInputs = contactForm.querySelectorAll('input, textarea');
        const submitButton = contactForm.querySelector('.btn-submit');
        const formMessage = document.getElementById('form-message');
        
        // Reglas de validación mejoradas
        const validationRules = {
            nombre: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
                message: 'El nombre debe contener solo letras (2-50 caracteres)'
            },
            email: {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                maxLength: 1000,
                message: 'El mensaje debe tener entre 10 y 1000 caracteres'
            }
        };
        
        // Debounce para validación
        const debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(null, args), delay);
            };
        };
        
        // Validación individual de campos
        function validateField(field) {
            const fieldName = field.name;
            const fieldValue = field.value.trim();
            const rules = validationRules[fieldName];
            const errorElement = document.getElementById(`${fieldName}-error`);
            
            if (!rules) return true;
            
            // Limpiar estado previo
            field.classList.remove('error', 'success');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
            
            // Validaciones
            if (rules.required && !fieldValue) {
                showFieldError(field, errorElement, 'Este campo es obligatorio');
                return false;
            }
            
            if (fieldValue && rules.minLength && fieldValue.length < rules.minLength) {
                showFieldError(field, errorElement, rules.message);
                return false;
            }
            
            if (fieldValue && rules.maxLength && fieldValue.length > rules.maxLength) {
                showFieldError(field, errorElement, rules.message);
                return false;
            }
            
            if (fieldValue && rules.pattern && !rules.pattern.test(fieldValue)) {
                showFieldError(field, errorElement, rules.message);
                return false;
            }
            
            // Campo válido
            if (fieldValue) {
                field.classList.add('success');
                addRippleEffect(field);
            }
            return true;
        }
        
        function showFieldError(field, errorElement, message) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
            
            // Vibrar en móvil si es compatible
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
        }
        
        // Event listeners con debounce
        formInputs.forEach(input => {
            const debouncedValidate = debounce(() => validateField(input), 300);
            
            input.addEventListener('input', debouncedValidate);
            input.addEventListener('blur', () => validateField(input));
            
            // Efectos visuales al enfocar
            input.addEventListener('focus', function() {
                this.classList.remove('error');
                const errorElement = document.getElementById(`${this.name}-error`);
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
                
                // Efecto de glow al enfocar
                this.style.boxShadow = 'var(--glow-primary), 0 0 0 3px rgba(99, 102, 241, 0.2)';
            });
            
            input.addEventListener('blur', function() {
                this.style.boxShadow = '';
            });
        });
        
        // Envío del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isFormValid = true;
            
            // Validar todos los campos
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                submitFormWithAnimation();
            } else {
                showFormMessage('❌ Por favor, corrige los errores antes de enviar.', 'error');
                
                // Efecto de sacudida en el formulario
                contactForm.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);
            }
        });
        
        function submitFormWithAnimation() {
            // Estado de carga con animación
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            
            // Crear efecto de partículas
            createSubmitParticles();
            
            // Simular envío
            setTimeout(() => {
                const isSuccess = Math.random() > 0.2; // 80% éxito
                
                if (isSuccess) {
                    showFormMessage('✅ ¡Mensaje enviado exitosamente! Te responderé pronto.', 'success');
                    contactForm.reset();
                    
                    // Limpiar estados de validación
                    formInputs.forEach(input => {
                        input.classList.remove('success', 'error');
                        const errorElement = document.getElementById(`${input.name}-error`);
                        if (errorElement) {
                            errorElement.classList.remove('show');
                        }
                    });
                    
                    // Confetti effect
                    createConfettiEffect();
                    
                } else {
                    showFormMessage('❌ Error al enviar. Inténtalo nuevamente.', 'error');
                }
                
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                
            }, 2500);
        }
        
        function showFormMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = `form-message show ${type}`;
            
            // Auto-ocultar después de 6 segundos
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 6000);
        }
    }
    
    /* ========================================
       EFECTOS VISUALES AVANZADOS
       ======================================== */
    
    function createRippleEffect(element, event) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;
        
        const rect = element.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = element.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        element.appendChild(circle);
    }
    
    function addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    }
    
    function createSubmitParticles() {
        const button = document.querySelector('.btn-submit');
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--gradient-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            const duration = 800 + Math.random() * 400;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }
    
    function createConfettiEffect() {
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: 50%;
                left: 50%;
                pointer-events: none;
                z-index: 9999;
                border-radius: 2px;
            `;
            
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 200 + Math.random() * 200;
            const duration = 1000 + Math.random() * 1000;
            
            confetti.animate([
                {
                    transform: 'translate(-50%, -50%) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%) rotate(720deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }
    }
    
    /* ========================================
       ANIMACIONES DE SCROLL AVANZADAS
       ======================================== */
    
    function setupAdvancedScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Determinar tipo de animación según clase
                    if (element.classList.contains('fade-in')) {
                        element.classList.add('visible');
                    }
                    if (element.classList.contains('slide-in-left')) {
                        element.classList.add('visible');
                    }
                    if (element.classList.contains('slide-in-right')) {
                        element.classList.add('visible');
                    }
                    
                    // Efecto de typing para títulos
                    const title = element.querySelector('h2, h3');
                    if (title && title.hasAttribute('data-typing')) {
                        typeWriter(title, title.textContent, 50);
                    }
                }
            });
        }, observerOptions);
        
        // Observar elementos
        const animatedElements = document.querySelectorAll('.project-card, .contact-item, .skill-item, .about-content');
        
        animatedElements.forEach((el, index) => {
            // Agregar clases de animación basadas en posición
            if (index % 2 === 0) {
                el.classList.add('slide-in-left');
            } else {
                el.classList.add('slide-in-right');
            }
            
            observer.observe(el);
        });
    }
    
    /* ========================================
       EFECTOS DE PARTÍCULAS FLOTANTES
       ======================================== */
    
    function createFloatingShapes() {
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'floating-shapes';
        document.body.appendChild(shapesContainer);
        
        for (let i = 0; i < 6; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            
            // Posiciones y tamaños aleatorios
            const size = 20 + Math.random() * 60;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 15;
            
            shape.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                top: ${top}%;
                animation-delay: ${delay}s;
                background: linear-gradient(45deg, 
                    rgba(99, 102, 241, 0.1), 
                    rgba(139, 92, 246, 0.1));
            `;
            
            shapesContainer.appendChild(shape);
        }
    }
    
    /* ========================================
       EFECTOS DE TILT MODERNOS
       ======================================== */
    
    function setupTiltEffects() {
        const tiltElements = document.querySelectorAll('.project-card, .skill-item');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', handleTilt);
            element.addEventListener('mouseleave', resetTilt);
        });
        
        function handleTilt(e) {
            const element = e.currentTarget;
            const rect = element.getBoundingClientRect();
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.02)
            `;
        }
        
        function resetTilt(e) {
            e.currentTarget.style.transform = '';
        }
    }
    
    /* ========================================
       UTILIDADES Y HELPERS
       ======================================== */
    
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            const value = Math.round(current);
            element.textContent = value + '%';
            
            if (current >= target) {
                element.textContent = target + '%';
                clearInterval(timer);
            }
        }, 16);
    }
    
    function typeWriter(element, text, speed = 100) {
        const originalText = text;
        element.textContent = '';
        element.classList.add('typing-cursor');
        
        let i = 0;
        function type() {
            if (i < originalText.length) {
                element.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing-cursor');
            }
        }
        
        setTimeout(type, 500);
    }
    
    function trackEvent(category, action, label = null) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        
        console.log('📊 Evento:', { category, action, label });
    }
    
    function showNotification(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Estructura del notification
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        // Estilos modernos
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '12px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            background: type === 'success' ? 'rgba(6, 182, 212, 0.9)' : 
                       type === 'error' ? 'rgba(236, 72, 153, 0.9)' : 
                       'rgba(99, 102, 241, 0.9)'
        });
        
        document.body.appendChild(notification);
        
        // Animar entrada
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto-remover
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }, duration);
    }
    
    /* ========================================
       EFECTOS DE PERFORMANCE
       ======================================== */
    
    function setupPerformanceOptimizations() {
        // Lazy loading para imágenes
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window && images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        }
        
        // Preload de recursos críticos
        const criticalResources = [
            'images/profile-photo.jpg',
            'images/projects/ecommerce-project.jpg'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = resource;
            document.head.appendChild(link);
        });
    }
    
    /* ========================================
       THEME TOGGLE (MODO OSCURO)
       ======================================== */
    
    function setupThemeToggle() {
        // Crear botón de tema si no existe
        if (!document.querySelector('.theme-toggle')) {
            const themeToggle = document.createElement('button');
            themeToggle.className = 'theme-toggle';
            themeToggle.innerHTML = '🌙';
            themeToggle.setAttribute('data-tooltip', 'Cambiar tema');
            
            Object.assign(themeToggle.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: 'none',
                background: 'var(--bg-glass)',
                backdropFilter: 'var(--backdrop-blur)',
                color: 'var(--text-primary)',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: '1000',
                transition: 'all var(--transition-normal)',
                boxShadow: 'var(--shadow-lg)'
            });
            
            document.body.appendChild(themeToggle);
            
            themeToggle.addEventListener('click', toggleTheme);
        }
    }
    
    function toggleTheme() {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        
        // Guardar preferencia
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Cambiar icono
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.innerHTML = isLight ? '☀️' : '🌙';
        }
        
        showNotification(`Tema ${isLight ? 'claro' : 'oscuro'} activado`, 'info', 2000);
    }
    
    /* ========================================
       INICIALIZACIÓN COMPLETA
       ======================================== */
    
    function initializePortfolio() {
        console.log('🚀 Inicializando Portfolio Moderno...');
        
        // Configurar todas las funcionalidades
        if (window.innerWidth > 768) {
            createCustomCursor();
        }
        
        setupAdvancedMobileMenu();
        setupSmoothNavigation();
        setupScrollEffects();
        setupSkillAnimations();
        setupAdvancedFormValidation();
        setupAdvancedScrollAnimations();
        setupTiltEffects();
        setupPerformanceOptimizations();
        setupThemeToggle();
        createFloatingShapes();
        
        // Agregar efectos de ripple a botones
        document.querySelectorAll('.btn').forEach(addRippleEffect);
        
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            const toggle = document.querySelector('.theme-toggle');
            if (toggle) toggle.innerHTML = '☀️';
        }
        
        // Inicializar navegación activa
        updateActiveNavigation();
        
        console.log('✅ Portfolio inicializado exitosamente');
        
        // Notificación de bienvenida
        setTimeout(() => {
            showNotification('¡Bienvenido a mi portfolio! 🚀', 'info', 3000);
        }, 1500);
    }
    
    // Inicializar todo
    initializePortfolio();
    
});

/* ========================================
   FUNCIONES GLOBALES AVANZADAS
   ======================================== */

// Función para scroll suave programático
function smoothScrollTo(targetId, offset = 0) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = target.offsetTop - headerHeight - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Función para animar elementos con delay
function animateElementsWithDelay(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * delay);
    });
}

// Función para detectar dispositivo táctil
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Función para manejar errores graciosamente
function handleError(error, context = 'General') {
    console.error(`Error en ${context}:`, error);
    
    // En desarrollo, mostrar detalles
    if (window.location.hostname === 'localhost') {
        showNotification(`Error en ${context}: ${error.message}`, 'error', 5000);
    }
}

// Función para optimizar rendimiento
function optimizePerformance() {
    // Reducir animaciones en dispositivos lentos
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--transition-fast', '0.1s');
        document.documentElement.style.setProperty('--transition-normal', '0.2s');
        document.documentElement.style.setProperty('--transition-slow', '0.3s');
    }
    
    // Pausar animaciones cuando la pestaña no está visible
    document.addEventListener('visibilitychange', () => {
        const isHidden = document.hidden;
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        
        animatedElements.forEach(el => {
            el.style.animationPlayState = isHidden ? 'paused' : 'running';
        });
    });
}

// Inicializar optimizaciones
optimizePerformance();

// Manejo global de errores
window.addEventListener('error', (e) => {
    handleError(e.error, 'JavaScript');
});

window.addEventListener('unhandledrejection', (e) => {
    handleError(e.reason, 'Promise');
    e.preventDefault();
});

/* ========================================
   EASTER EGGS Y DETALLES ESPECIALES
   ======================================== */

// Konami Code easter egg
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.keyCode);
        userInput = userInput.slice(-10);
        
        if (userInput.join(',') === konamiCode.join(',')) {
            activateEasterEgg();
            userInput = [];
        }
    });
    
    function activateEasterEgg() {
        showNotification('🎉 ¡Código Konami activado! Eres genial', 'success', 5000);
        
        // Efecto especial en todo el portfolio
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
})();

// Animación rainbow para easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Detectar doble clic en logo para modo desarrollador
document.querySelector('.nav-logo')?.addEventListener('dblclick', () => {
    const devMode = !document.body.classList.contains('dev-mode');
    document.body.classList.toggle('dev-mode', devMode);
    
    if (devMode) {
        showNotification('🔧 Modo desarrollador activado', 'info', 3000);
        console.log('🔧 Información de desarrollo:', {
            performance: performance.now(),
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            userAgent: navigator.userAgent,
            scrollPosition: window.scrollY
        });
    } else {
        showNotification('👤 Modo normal activado', 'info', 3000);
    }
});
