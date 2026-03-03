// Mobile Navigation
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize EmailJS with proper error handling
(function() {
    try {
        emailjs.init("wd2Q9JmjZ8mgqSTcL");
    } catch (err) {
        console.error("Error initializing EmailJS:", err);
    }
})();

// Enhanced form submission handler
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate form fields
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

    if (!isValid) {
        alert('Please fill in all required fields');
        return;
    }

    // Show sending status
    const btn = this.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Send email using EmailJS with proper parameters
    const templateParams = {
        from_name: this.querySelector('[name="name"]').value,
        from_email: this.querySelector('[name="email"]').value,
        message: this.querySelector('[name="message"]').value
    };

    emailjs.send('service_rkfdvth', 'template_9phy25i', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            this.reset();
        })
        .catch((err) => {
            console.error('FAILED...', err);
            alert('Failed to send message. Please try again later.');
        })
        .finally(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        });
});

// Room Animation
const h = document.querySelector("#h");
const b = document.body;

let base = (e) => {
    var x = e.pageX / window.innerWidth - 0.5;
    var y = e.pageY / window.innerHeight - 0.5;
    if (h) {
        h.style.transform = `
            perspective(90vw)
            rotateX(${y * 4 + 75}deg)
            rotateZ(${-x * 12 + 45}deg)
            translateZ(-9vw)
        `;
    }
};

if (b) {
    b.addEventListener("pointermove", base);
}

// Active section highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scroll = window.scrollY;
        
        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.8)';
    }
});

// Mobile menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Page transition
document.body.classList.add('page-transition');
window.addEventListener('beforeunload', () => {
    document.body.classList.remove('page-transition');
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('.section');
const options = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Navigation logic
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    function switchSection(id) {
        sections.forEach(section => section.classList.remove('active'));
        document.querySelector(id).classList.add('active');
        
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`a[href="${id}"]`).classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            switchSection(targetId);
        });
    });
});

// Add animation on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .content-right, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial styles for animation
document.querySelectorAll('.skill-category, .content-right, .contact-form').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run once on load
