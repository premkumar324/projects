// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide the loader when the page is fully loaded
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Initialize animations
    initAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize the view details buttons
    initViewDetailsButtons();
    
    // Initialize back to top button
    initBackToTop();
});

// Initialize animations with GSAP
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.to('.hero-text h1', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-text p', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.to('.cta-buttons', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-image', {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    // Projects section animations
    gsap.to('.section-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 80%',
        }
    });
    
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            },
            delay: i * 0.2
        });
    });
    
    // Skills section animations
    gsap.utils.toArray('.skill-category').forEach((category, i) => {
        gsap.to(category, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
            },
            delay: i * 0.2
        });
    });
    
    // Education section animations
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
            },
            delay: i * 0.3
        });
    });
    
    gsap.to('.performance-table', {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.performance-table',
            start: 'top 80%',
        }
    });
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the target section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if it's open
                const mobileNav = document.querySelector('.mobile-nav');
                const hamburgerMenu = document.querySelector('.hamburger-menu');
                const overlay = document.querySelector('.mobile-nav-overlay');
                
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    hamburgerMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Get the section title to position it at the top
                const sectionTitle = targetSection.querySelector('.section-title');
                const navHeight = 80; // Approximate navbar height
                let scrollPosition;
                
                if (sectionTitle) {
                    // Calculate position to place the section title at the top with some padding
                    const titleOffset = sectionTitle.getBoundingClientRect().top;
                    scrollPosition = window.pageYOffset + titleOffset - navHeight;
                } else {
                    // Fallback to section top if title not found
                    scrollPosition = targetSection.offsetTop;
                }
                
                // Smooth scroll to the calculated position
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                document.querySelectorAll('.mobile-nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                // Add active class to the clicked link and its counterpart
                document.querySelectorAll(`a[href="${targetId}"]`).forEach(navLink => {
                    navLink.classList.add('active');
                });
            }
        });
    });
}

// Initialize mobile navigation
function initMobileNav() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (hamburgerMenu && mobileNav) {
        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.mobile-nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('mobile-nav-overlay');
            document.body.appendChild(overlay);
        }
        
        function toggleMobileNav() {
            mobileNav.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        }
        
        hamburgerMenu.addEventListener('click', toggleMobileNav);
        overlay.addEventListener('click', toggleMobileNav);
        
        if (mobileNavLinks.length > 0) {
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    toggleMobileNav();
                });
            });
        }
    }
}

// Initialize custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });
        
        // Hover effects for links and buttons
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .timeline-content, .grade-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'var(--secondary)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
                cursorFollower.style.backgroundColor = 'var(--secondary)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'var(--secondary)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.backgroundColor = 'var(--primary)';
            });
        });
    }
}

// Initialize view details buttons
function initViewDetailsButtons() {
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectDetails = button.nextElementSibling;
            projectDetails.classList.toggle('active');
            button.classList.toggle('active');
            
            if (projectDetails.classList.contains('active')) {
                button.querySelector('span').textContent = 'Hide Details';
            } else {
                button.querySelector('span').textContent = 'View Details';
            }
            
            // Animate the mobile description when details are shown
            if (projectDetails.classList.contains('active')) {
                const mobileDescription = projectDetails.querySelector('.mobile-description');
                if (mobileDescription) {
                    gsap.to(mobileDescription, {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        delay: 0.3
                    });
                }
            }
        });
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    if (currentSectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
        
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }
}); 