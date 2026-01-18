// ===================================
// GSAP Animations & Interactions
// ===================================

// Register GSAP ScrollTrigger plugin
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ===================================
// DOM Elements
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ===================================
// Mobile Navigation Toggle
// ===================================
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    lastScroll = currentScroll;
});

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Smooth Scroll for Scroll-Down Button
// ===================================
const scrollDownBtn = document.querySelector('.scroll-down');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the next section after hero (about section)
        const heroSection = document.getElementById('home');
        const nextSection = heroSection ? heroSection.nextElementSibling : null;

        if (nextSection) {
            const headerOffset = 80;
            const elementPosition = nextSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback: scroll to about section by ID
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const headerOffset = 80;
                const elementPosition = aboutSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// ===================================
// GSAP Animations
// ===================================
if (typeof gsap !== 'undefined') {
    // Hero Section Animations
    const heroTitle = document.querySelector('.hero-title .line');
    if (heroTitle) {
        const heroLines = document.querySelectorAll('.hero-title .line');
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroLines.forEach((line, index) => {
            tl.fromTo(line,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8 },
                index * 0.2
            );
        });

        // Animate subtitle and CTA
        gsap.fromTo('.hero-subtitle',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
        );

        gsap.fromTo('.hero-cta',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'power3.out' }
        );

        gsap.fromTo('.hero-stats .stat-item',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.6, delay: 1.6, stagger: 0.1, ease: 'back.out(1.7)' }
        );
    }

    // Section Header Animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Feature Cards Animation
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                ease: 'back.out(1.2)'
            }
        );
    });

    // Service Cards Animation
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 60, rotationY: -15 },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 0.8,
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                ease: 'power3.out'
            }
        );
    });

    // Why Items Animation
    gsap.utils.toArray('.why-item').forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                ease: 'power2.out'
            }
        );
    });

    // Process Timeline Animation
    gsap.utils.toArray('.process-step').forEach((step, index) => {
        gsap.fromTo(step,
            { opacity: 0, x: -100 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                ease: 'power3.out'
            }
        );
    });

    // Testimonial Cards Animation
    gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                ease: 'back.out(1.4)'
            }
        );
    });

    // CTA Section Animation
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) {
        gsap.fromTo('.cta-content',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: ctaSection,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // Parallax Effect for Hero Background
    gsap.to('.particles', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ===================================
// Animated Counter
// ===================================
// ===================================
// Animated Counter
// ===================================
function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Intersection Observer for Counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const originalText = entry.target.getAttribute('data-target');
            const target = parseInt(originalText);
            const suffix = originalText.replace(target.toString(), ''); // Extract suffix (e.g., '+' or 'k')

            if (target) {
                animateCounter(entry.target, target, suffix);
                entry.target.classList.add('counted');
            }
        }
    });
}, observerOptions);

// Observe all counter elements
document.querySelectorAll('.stat-number[data-target], .stat-value[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// ===================================
// Form Validation & Submission
// ===================================
if (contactForm) {
    const formFields = {
        name: { required: true, pattern: /^[a-zA-Z\s]{2,50}$/ },
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        phone: { required: false, pattern: /^[\d\s\-\+\(\)]{10,}$/ },
        service: { required: true },
        message: { required: true, minLength: 10 }
    };

    function validateField(fieldName, value) {
        const field = formFields[fieldName];
        if (!field) return true;

        if (field.required && !value.trim()) {
            return { valid: false, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` };
        }

        if (value && field.pattern && !field.pattern.test(value)) {
            return { valid: false, message: `Please enter a valid ${fieldName}` };
        }

        if (field.minLength && value.length < field.minLength) {
            return { valid: false, message: `Please enter at least ${field.minLength} characters` };
        }

        return { valid: true };
    }

    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
        }
        field.style.borderColor = '#ef4444';
    }

    function clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
        field.style.borderColor = '';
    }

    // Real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = contactForm.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', () => {
                const validation = validateField(fieldName, field.value);
                if (!validation.valid) {
                    showError(field, validation.message);
                } else {
                    clearError(field);
                }
            });

            field.addEventListener('input', () => {
                if (field.value) {
                    clearError(field);
                }
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;
        const formData = {};

        // Validate all fields
        Object.keys(formFields).forEach(fieldName => {
            const field = contactForm.querySelector(`[name="${fieldName}"]`);
            if (field) {
                const value = field.value.trim();
                formData[fieldName] = value;
                const validation = validateField(fieldName, value);

                if (!validation.valid) {
                    showError(field, validation.message);
                    isValid = false;
                } else {
                    clearError(field);
                }
            }
        });

        if (!isValid) {
            return;
        }

        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Opening WhatsApp...';

        try {
            // Map service values to readable names
            const serviceNames = {
                'digital-marketing': 'Digital Marketing',
                'it-development': 'IT Development',
                'recruitment': 'Recruitment & Staffing',
                'other': 'Other'
            };

            const serviceDisplayName = serviceNames[formData.service] || formData.service;

            // Format message for WhatsApp
            let whatsappMessage = `*New Contact Form Submission - MaithliX*\n\n`;
            whatsappMessage += `*Name:* ${formData.name}\n`;
            whatsappMessage += `*Email:* ${formData.email}\n`;

            if (formData.phone) {
                whatsappMessage += `*Phone:* ${formData.phone}\n`;
            }

            whatsappMessage += `*Service Interest:* ${serviceDisplayName}\n\n`;
            whatsappMessage += `*Message:*\n${formData.message}`;

            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // WhatsApp number: +919576620711 (format: 919576620711 for URL)
            const whatsappNumber = '919576620711';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');

            // Show success message
            const formSuccess = document.getElementById('formSuccess');
            if (formSuccess) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                formSuccess.innerHTML = '<p>✅ Form submitted! We\'ve opened WhatsApp for you. If it didn\'t open, please contact us at +91 95766 20711</p>';
                gsap.fromTo(formSuccess,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );
            }

            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'grid';
                formSuccess.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);
            alert('Sorry, there was an error. Please try again or contact us directly at +91 95766 20711');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ===================================
// Hover Effects for Service Cards
// ===================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        if (typeof gsap !== 'undefined') {
            gsap.to(this.querySelector('.service-icon'), {
                rotation: 5,
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });

    card.addEventListener('mouseleave', function () {
        if (typeof gsap !== 'undefined') {
            gsap.to(this.querySelector('.service-icon'), {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
});

// ===================================
// Lazy Loading for Images (if any)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Performance: Reduce motion for users who prefer it
// ===================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (typeof gsap !== 'undefined') {
        gsap.globalTimeline.timeScale(0.1);
    }
}

// ===================================
// Initialize on DOM Load
// ===================================
// ===================================
// Initialize on DOM Load & Page Show
// ===================================
function initServicePreselection() {
    // Check for service parameter in URL and pre-select in form
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');

    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            // Check if the option exists
            const optionExists = [...serviceSelect.options].some(o => o.value === serviceParam);
            if (optionExists) {
                serviceSelect.value = serviceParam;
                // Force update if needed (sometimes browsers stick to old values)
                serviceSelect.setAttribute('value', serviceParam);

                // Scroll to contact form
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    // Use a slightly longer timeout and requestAnimationFrame to ensure rendering is complete
                    setTimeout(() => {
                        const headerOffset = 80;
                        const elementPosition = contactSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 600);
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('MaithliX website loaded successfully');
    document.body.classList.add('loaded');
    initServicePreselection();
});

// Handle back/forward cache
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        initServicePreselection();
    }
});
