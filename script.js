// script.js - Main JavaScript for Hayes Barton Homes

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initTestimonialSlider();
    initScrollEffects();
    initContactForm();
    initNavigation();
    initDropdowns();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    if (!mobileMenuBtn || !mobileMenu) return;

    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    });

    // Close mobile menu with close button
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu with overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Mobile dropdown toggle functionality
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle active class on dropdown
            dropdown.classList.toggle('active');
            this.classList.toggle('active');
            
            // Rotate icon
            if (icon) {
                icon.style.transform = dropdown.classList.contains('active') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0deg)';
            }
        });
        
        // Prevent parent link navigation when clicking dropdown toggle
        const link = toggle.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                if (!toggle.classList.contains('active')) {
                    e.preventDefault();
                }
            });
        }
    });

    // Handle Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!mobileMenu || !mobileMenu.classList.contains('active')) return;
        
        if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
            closeMobileMenu();
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav a:not(.mobile-dropdown-toggle a)');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => {
                closeMobileMenu();
            }, 300);
        });
    });
}

// Close mobile menu function
function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
    }
    
    document.body.style.overflow = '';
    
    // Close all dropdowns inside mobile menu
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    mobileDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
    
    // Reset dropdown toggle icons
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.classList.remove('active');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Update aria attributes
    if (mobileMenu) {
        mobileMenu.setAttribute('aria-hidden', 'true');
    }
    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    
    if (!testimonialItems.length || !testimonialPrev || !testimonialNext) return;

    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        testimonialItems[index].classList.add('active');
        currentTestimonial = index;
    }

    testimonialNext.addEventListener('click', () => {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialItems.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
        resetAutoRotation();
    });

    testimonialPrev.addEventListener('click', () => {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) {
            prevIndex = testimonialItems.length - 1;
        }
        showTestimonial(prevIndex);
        resetAutoRotation();
    });

    // Auto rotate testimonials
    function startAutoRotation() {
        testimonialInterval = setInterval(() => {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex >= testimonialItems.length) {
                nextIndex = 0;
            }
            showTestimonial(nextIndex);
        }, 5000);
    }

    function resetAutoRotation() {
        clearInterval(testimonialInterval);
        startAutoRotation();
    }

    // Pause auto rotation on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            startAutoRotation();
        });
    }

    startAutoRotation();
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
            
            // Calculate header height for offset
            const headerHeight = document.querySelector('header')?.offsetHeight || 100;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
            
            e.preventDefault();
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send the form data to a server
            // For this example, we'll just show a success message
            alert(`Thank you ${name}! Your message has been sent. We'll get back to you within 24 hours.`);
            this.reset();
            
            // You could also send the data to a server here:
            // fetch('your-server-endpoint', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Message sent successfully!');
            //     this.reset();
            // })
            // .catch(error => {
            //     alert('There was an error sending your message. Please try again.');
            // });
        });
    }
}

// Navigation Active State
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === './')) {
            link.classList.add('active');
        }
    });
}

// Enhanced Dropdowns
function initDropdowns() {
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    
    dropdownParents.forEach(parent => {
        const dropdown = parent.querySelector('.dropdown');
        const link = parent.querySelector('a');
        
        if (!dropdown || !link) return;
        
        // Desktop hover behavior
        parent.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) {
                showDropdown(dropdown);
            }
        });
        
        parent.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                hideDropdown(dropdown);
            }
        });
        
        // Touch behavior for mobile
        link.addEventListener('touchstart', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const isVisible = dropdown.style.opacity === '1';
                if (isVisible) {
                    hideDropdown(dropdown);
                } else {
                    showDropdown(dropdown);
                }
            }
        });
    });
    
    function showDropdown(dropdown) {
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
        dropdown.style.transform = 'translateY(0)';
    }
    
    function hideDropdown(dropdown) {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateY(15px)';
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                if (!dropdown.parentElement.contains(e.target)) {
                    hideDropdown(dropdown);
                }
            });
        }
    });
}

// Image lazy loading enhancement
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize lazy loading on DOM content loaded
document.addEventListener('DOMContentLoaded', initLazyLoading);
