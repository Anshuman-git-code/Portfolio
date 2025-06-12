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
            if (hamburger.classList.contains('active')) {
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
    const heroText = document.querySelector('.hero p');
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
});
