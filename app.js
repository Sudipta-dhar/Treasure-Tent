// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initAnimatedCounters();
    initScrollAnimations();
    initContactForm();
    initNavbarScroll();
    initPricingModals();
    initAboutAnimations();
});

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navLinks = document.querySelector('.nav__links');
    
    if (navToggle && navLinks) {
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'nav__mobile';
        mobileMenu.innerHTML = navLinks.outerHTML;
        document.querySelector('.nav').appendChild(mobileMenu);
        
        navToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
            });
        });
    }
}

// Smooth Scrolling - Fixed navigation
function initSmoothScrolling() {
    // Handle all navigation links including mobile
    const allNavLinks = document.querySelectorAll('a[href^="#"], .nav__mobile a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle CTA buttons with data-scroll-to
    const ctaButtons = document.querySelectorAll('[data-scroll-to]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = '#' + this.getAttribute('data-scroll-to');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Pre-select demo for demo buttons
                if (this.getAttribute('data-scroll-to') === 'contact') {
                    setTimeout(() => {
                        const inquirySelect = document.querySelector('#inquiry');
                        if (inquirySelect) {
                            inquirySelect.value = 'demo';
                        }
                    }, 1000);
                }
            }
        });
    });
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature, .ai__feature, .market, .pricing__tier, .credential, .founder__card, .value__card, .timeline__item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        fadeObserver.observe(element);
    });
}

// About Section Animations
function initAboutAnimations() {
    // Animate founder cards on hover
    const founderCards = document.querySelectorAll('.founder__card');
    founderCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.founder__avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
                avatar.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.founder__avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Animate timeline items with staggered entrance
    const timelineItems = document.querySelectorAll('.timeline__item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
    
    // Animate specialization tags
    const specTags = document.querySelectorAll('.spec__tag');
    specTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Contact Form - Fixed validation and feedback
function initContactForm() {
    const contactForm = document.querySelector('.contact__form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                inquiry: formData.get('inquiry'),
                message: formData.get('message')
            };
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
}

function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.inquiry) {
        errors.push('Please select an inquiry type');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message with at least 10 characters');
    }
    
    if (errors.length > 0) {
        showFormMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message status status--${type}`;
    messageDiv.innerHTML = message;
    messageDiv.style.marginBottom = '16px';
    
    // Insert message at top of form
    const form = document.querySelector('.contact__form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }
    }, 5000);
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(var(--color-surface), 0.98)';
            nav.style.boxShadow = 'var(--shadow-md)';
        } else {
            nav.style.background = 'rgba(var(--color-surface), 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Pricing Modals - Fixed implementation
function initPricingModals() {
    const pricingButtons = document.querySelectorAll('.pricing__tier .btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tier = this.closest('.pricing__tier');
            const tierName = tier.querySelector('h3').textContent;
            const tierPrice = tier.querySelector('.price__amount').textContent;
            showPricingModal(tierName, tierPrice);
        });
    });
}

function showPricingModal(tierName, tierPrice) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const isCustom = tierPrice === 'Custom';
    const priceDisplay = isCustom ? 'Custom Pricing' : `${tierPrice} RMB`;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Get Started with ${tierName}</h3>
                <button class="modal-close" aria-label="Close modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-tier-info">
                    <h4>${tierName}</h4>
                    <div class="modal-price">${priceDisplay}</div>
                </div>
                <p>Ready to transform your smart home with our ${tierName}?</p>
                <p>${isCustom ? 'Contact our sales team for a personalized quote.' : 'Get started today or contact us for more information.'}</p>
                <div class="modal-contact">
                    <p><strong>Sales Email:</strong> sales@treasuretent.ai</p>
                    <p><strong>Support Phone:</strong> +86 400-123-4567</p>
                    <p><strong>Response Time:</strong> Within 2 hours</p>
                </div>
                <div class="modal-actions">
                    <button class="btn btn--primary modal-contact-btn">Contact Sales</button>
                    <button class="btn btn--outline modal-learn-btn">Learn More</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const contactBtn = modal.querySelector('.modal-contact-btn');
    const learnBtn = modal.querySelector('.modal-learn-btn');
    
    closeBtn.addEventListener('click', closeModal);
    contactBtn.addEventListener('click', () => {
        closeModal();
        scrollToContactForm(isCustom ? 'enterprise' : 'demo');
    });
    learnBtn.addEventListener('click', () => {
        closeModal();
        scrollToSection('products');
    });
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Add modal styles dynamically
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 20px;
                opacity: 0;
                animation: fadeIn 0.3s ease forwards;
            }
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            .modal-content {
                background: var(--color-surface);
                border-radius: var(--radius-lg);
                max-width: 500px;
                width: 100%;
                box-shadow: var(--shadow-lg);
                border: 1px solid var(--color-card-border);
                transform: scale(0.9);
                animation: scaleIn 0.3s ease forwards;
            }
            @keyframes scaleIn {
                to { transform: scale(1); }
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 24px;
                border-bottom: 1px solid var(--color-border);
            }
            .modal-header h3 {
                margin: 0;
                color: var(--color-text);
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: 4px;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--radius-base);
                transition: background-color 0.2s ease;
            }
            .modal-close:hover {
                background: var(--color-secondary);
            }
            .modal-body {
                padding: 24px;
            }
            .modal-tier-info {
                text-align: center;
                margin-bottom: 20px;
                padding: 16px;
                background: var(--color-bg-1);
                border-radius: var(--radius-base);
            }
            .modal-tier-info h4 {
                margin: 0 0 8px 0;
                color: var(--color-primary);
            }
            .modal-price {
                font-size: 18px;
                font-weight: var(--font-weight-bold);
                color: var(--color-text);
            }
            .modal-contact {
                background: var(--color-bg-3);
                padding: 16px;
                border-radius: var(--radius-base);
                margin: 16px 0;
            }
            .modal-contact p {
                margin: 8px 0;
                font-size: 14px;
            }
            .modal-actions {
                display: flex;
                gap: 12px;
                margin-top: 20px;
            }
            .modal-actions .btn {
                flex: 1;
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
}

function scrollToContactForm(inquiryType = 'demo') {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = contactSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Pre-fill inquiry type
        setTimeout(() => {
            const inquirySelect = document.querySelector('#inquiry');
            if (inquirySelect) {
                inquirySelect.value = inquiryType;
                // Trigger change event for better UX
                inquirySelect.dispatchEvent(new Event('change'));
            }
        }, 1000);
    }
}

function scrollToSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = section.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Enhanced form interaction
document.addEventListener('DOMContentLoaded', function() {
    // Add visual feedback for form interactions
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 0 3px var(--color-focus-ring)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--color-border)';
            this.style.boxShadow = 'none';
        });
        
        // Add validation feedback
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = 'var(--color-success)';
            } else if (this.value.length > 0) {
                this.style.borderColor = 'var(--color-error)';
            }
        });
    });
});

// Loading optimization
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Initialize any remaining functionality
    setTimeout(() => {
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.feature, .ai__feature, .market, .credential, .founder__card, .value__card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                if (!this.classList.contains('founder__card')) {
                    this.style.transform = 'translateY(-4px)';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                if (!this.classList.contains('founder__card')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
    }, 500);
});

// Navigation Active State
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav__links a, .nav__mobile a');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Initialize active nav link tracking
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
    
    // Add CSS for active nav links
    if (!document.querySelector('#nav-active-styles')) {
        const navActiveStyles = document.createElement('style');
        navActiveStyles.id = 'nav-active-styles';
        navActiveStyles.textContent = `
            .nav__links a.active,
            .nav__mobile a.active {
                color: var(--color-primary) !important;
                position: relative;
            }
            .nav__links a.active::after {
                content: '';
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 6px;
                height: 6px;
                background: var(--color-primary);
                border-radius: 50%;
            }
            .nav__mobile a.active {
                background-color: var(--color-secondary);
            }
        `;
        document.head.appendChild(navActiveStyles);
    }
});