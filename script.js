// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Navbar scroll effects
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.scrollY;
        
        // Background opacity and shadow
        const opacity = Math.min(0.98, 0.95 + (scrolled * 0.0001));
        navbar.style.background = `rgba(255, 255, 255, ${opacity})`;
        
        if (scrolled > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar active link highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Counter animations
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number, .impact-number, .figure-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = counter.textContent.includes('KSh') || counter.textContent.includes('km') 
                        ? counter.textContent.replace(/\d+/, target) 
                        : target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.includes('KSh') || counter.textContent.includes('km') 
                        ? counter.textContent.replace(/\d+/, Math.floor(current).toLocaleString()) 
                        : Math.floor(current).toLocaleString();
                }
            }, 20);
        };

        const observerCounters = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observerCounters.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            observerCounters.observe(counter);
        });
    }

    animateCounters();

    // CTA button enhanced interactions
    document.querySelectorAll('.cta-button').forEach(button => {
        // Hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Click ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const parallax = scrolled * -0.3;
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });

    // Hero stats stagger animation
    const heroStats = document.querySelectorAll('.hero-stats .stat');
    heroStats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.2}s`;
    });

    // Table row hover effects
    document.querySelectorAll('.table-row').forEach((row, index) => {
        row.addEventListener('mouseenter', () => {
            row.style.transform = 'scale(1.02)';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.transform = 'scale(1)';
        });
    });

    // Form handling (for future contact form)
    function initContactForm() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Add form submission logic here
                alert('Thank you! Your message has been sent. We\'ll get back to you soon.');
            });
        });
    }

    // Intersection Observer for staggered animations
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.phase-card, .deployment-card, .problem-point').forEach(el => {
        staggerObserver.observe(el);
    });

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 800) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Preloader (if you want to add one)
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Performance optimization - throttle scroll events
    let ticking = false;
    function throttleScroll(callback) {
        if (!ticking) {
            requestAnimationFrame(() => {
                callback();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', () => throttleScroll(handleScroll));
    
    function handleScroll() {
        // All scroll handlers are called here
        updateActiveNav();
    }

    console.log('WFU Website JavaScript loaded successfully! 🚀');
});
// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    const button = form?.querySelector('.cta-button');
    const buttonText = button?.querySelector('.button-text');
    const buttonLoading = button?.querySelector('.button-loading');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        button.disabled = true;
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline-flex';
        
        // Simulate form submission
        try {
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success
            form.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. Our team will respond within 24 hours.</p>
                    <a href="index.html#apply" class="cta-button primary">Back to Home</a>
                </div>
            `;
            
        } catch (error) {
            alert('Something went wrong. Please try again.');
        } finally {
            button.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
        }
    });

    // Input animations
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    // ... rest of your existing JS
});
// Add CSS for ripple effect and back-to-top (injected dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .back-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2c5aa0 0%, #1e3a8a 100%);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 20px rgba(44, 90, 160, 0.3);
    }
    
    .back-to-top:hover {
        transform: translateY(-3px) scale(1.1);
        box-shadow: 0 8px 30px rgba(44, 90, 160, 0.4);
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(style);