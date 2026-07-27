// Mobile Navigation - Burger Menu
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            if (navLinks) navLinks.classList.remove('active');
            if (burger) burger.classList.remove('toggle');
        }
    });
});

// Initialize EmailJS
(function() {
    try {
        emailjs.init("wd2Q9JmjZ8mgqSTcL");
    } catch (err) {
        console.error("Error initializing EmailJS:", err);
    }
})();

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) return;

        const btn = this.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const templateParams = {
            from_name: this.querySelector('[name="user_name"]').value,
            from_email: this.querySelector('[name="user_email"]').value,
            message: this.querySelector('[name="message"]').value
        };

        emailjs.send('service_rkfdvth', 'template_9phy25i', templateParams)
            .then(() => {
                alert('Message sent successfully!');
                this.reset();
            })
            .catch(() => {
                alert('Failed to send message. Please try again later.');
            })
            .finally(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            });
    });
}

// Active section highlighting on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
        }
    }
});

// Scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .content-right, .contact-form');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 80) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial hidden state for reveal animation
document.querySelectorAll('.skill-category, .content-right, .contact-form').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(24px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
