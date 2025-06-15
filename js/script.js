// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add typing effect to hero section
    const heroText = document.querySelector('.hero-content p');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect when the page loads
        setTimeout(typeWriter, 1000);
    }
    
    // Add glow effect to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        window.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            profileImage.style.boxShadow = `
                0 0 30px rgba(0, 183, 255, ${0.3 + x * 0.2}),
                0 0 60px rgba(74, 222, 128, ${0.2 + y * 0.1})
            `;
        });
    }
    
    // Fix for project cards on mobile
    const adjustProjectCards = () => {
        const projectCards = document.querySelectorAll('.project-card');
        if (window.innerWidth <= 576) {
            projectCards.forEach(card => {
                card.style.height = 'auto';
            });
        } else {
            projectCards.forEach(card => {
                card.style.height = '100%';
            });
        }
    };
    
    // Featured project cards hover effect
    const featuredProjectCards = document.querySelectorAll('.featured-project-card');
    featuredProjectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            const link = this.querySelector('.featured-project-link');
            if (link) {
                link.style.color = 'var(--accent-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
            const link = this.querySelector('.featured-project-link');
            if (link) {
                link.style.color = 'var(--primary-color)';
            }
        });
    });
    
    // Run on load and resize
    adjustProjectCards();
    window.addEventListener('resize', adjustProjectCards);
    
    // Apple-inspired sound effects
    // Create audio objects with preloading
    const clickSound = new Audio('./audio/click.mp3');
    const hoverSound = new Audio('./audio/hover.mp3');
    const submitSound = new Audio('./audio/submit.mp3');
    
    // Preload sounds
    clickSound.load();
    hoverSound.load();
    submitSound.load();
    
    // Set volume to be extremely subtle (Apple-like)
    clickSound.volume = 0.1;
    hoverSound.volume = 0.02; // Very subtle hover sound
    submitSound.volume = 0.15;
    
    // Function to initialize sound effects after user interaction
    function initSounds() {
        console.log("Sound system initialized");
        
        // Add sound toggle button with Apple-inspired design
        const soundToggle = document.createElement('div');
        soundToggle.className = 'sound-toggle';
        soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        soundToggle.title = 'Toggle sound effects';
        document.body.appendChild(soundToggle);
        
        // Track last hover time to prevent sound spam
        let lastHoverTime = 0;
        
        // Add click sounds to interactive elements
        document.querySelectorAll('a, button, .btn, .featured-project-link, .project-link').forEach(element => {
            element.addEventListener('click', () => {
                console.log("Click sound playing");
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.error("Error playing click sound:", e));
            });
        });
        
        // Add specific hover sounds to header menu items
        document.querySelectorAll('.nav-links a').forEach(menuItem => {
            menuItem.addEventListener('mouseenter', () => {
                if (hoverSound.volume > 0) { // Check if sound is enabled
                    console.log("Hover sound playing");
                    hoverSound.currentTime = 0;
                    hoverSound.play().catch(e => console.error("Error playing hover sound:", e));
                }
            });
        });
        
        // Add hover sounds with debouncing (Apple uses hover sounds very sparingly)
        document.querySelectorAll('.featured-project-card, .project-card, .btn, .skill-item').forEach(element => {
            element.addEventListener('mouseenter', () => {
                const now = Date.now();
                if (now - lastHoverTime > 300) { // Only play if 300ms passed since last hover sound
                    lastHoverTime = now;
                    console.log("Hover sound playing (debounced)");
                    hoverSound.currentTime = 0;
                    hoverSound.play().catch(e => console.error("Error playing hover sound:", e));
                }
            });
        });
        
        // Add form submission sound
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                console.log("Submit sound playing");
                submitSound.currentTime = 0;
                submitSound.play().catch(e => console.error("Error playing submit sound:", e));
            });
        }
        
        // Sound toggle functionality
        let soundsEnabled = true;
        soundToggle.addEventListener('click', () => {
            soundsEnabled = !soundsEnabled;
            
            // Apple-like subtle animation
            soundToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                soundToggle.style.transform = 'scale(1)';
            }, 100);
            
            // Update volume based on toggle state
            clickSound.volume = soundsEnabled ? 0.1 : 0;
            hoverSound.volume = soundsEnabled ? 0.02 : 0;
            submitSound.volume = soundsEnabled ? 0.15 : 0;
            
            console.log("Sound toggled:", soundsEnabled ? "ON" : "OFF");
            
            // Update icon
            soundToggle.innerHTML = soundsEnabled ? 
                '<i class="fas fa-volume-up"></i>' : 
                '<i class="fas fa-volume-mute"></i>';
        });
    }
    
    // Initialize sounds after first user interaction (to comply with autoplay policies)
    document.addEventListener('click', function initOnFirstClick() {
        console.log("User clicked - initializing sounds");
        initSounds();
        document.removeEventListener('click', initOnFirstClick);
    }, { once: true });
});
