/**
 * ============================================================
 * SCRIPT.JS — Portfolio Interactive Logic
 * 
 * Features:
 * 1. Mobile navigation toggle
 * 2. Scroll-based navbar styling & active link tracking
 * 3. Scroll reveal animations (Intersection Observer)
 * 4. Contact form validation (real, no fake success)
 * 5. Back-to-top button
 * 6. Hero canvas particle animation
 * 7. Resume download handler
 * 8. Dynamic footer year
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── DOM References ─────────────────────────────────────

  const navbar       = document.getElementById('navbar');
  const hamburger    = document.getElementById('hamburger');
  const navMenu      = document.getElementById('navMenu');
  const navLinks     = document.querySelectorAll('.nav-link');
  const sections     = document.querySelectorAll('section');
  const backToTop    = document.getElementById('backToTop');
  const footerYear   = document.getElementById('footerYear');
  const heroCanvas   = document.getElementById('heroCanvas');
  const resumeBtn    = document.getElementById('resumeBtn');

  // Contact form elements
  const contactForm   = document.getElementById('contactForm');
  const submitBtn     = document.getElementById('submitBtn');
  const formSuccess   = document.getElementById('formSuccess');
  const formError     = document.getElementById('formError');
  const fields = {
    name:    { input: document.getElementById('contactName'),    error: document.getElementById('nameError') },
    email:   { input: document.getElementById('contactEmail'),   error: document.getElementById('emailError') },
    subject: { input: document.getElementById('contactSubject'), error: document.getElementById('subjectError') },
    message: { input: document.getElementById('contactMessage'), error: document.getElementById('messageError') },
  };


  // ── 1. Dynamic Footer Year ────────────────────────────

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


  // ── 2. Mobile Navigation ──────────────────────────────

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });


  // ── 3. Scroll: Navbar & Active Link & Back-to-Top ─────

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back-to-top button visibility
    if (scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link tracking (scroll spy)
    let currentSection = '';
    const offset = 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop - offset && scrollY < sectionTop + sectionHeight - offset) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  }

  // Back-to-top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ── 4. Scroll Reveal (Intersection Observer) ──────────

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ── 5. Contact Form Validation ────────────────────────

  /**
   * Validates an email address format.
   * Returns true if the email matches a standard pattern.
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Shows an error for a specific field.
   */
  function showFieldError(field, message) {
    field.input.classList.add('error');
    field.error.textContent = message;
  }

  /**
   * Clears the error for a specific field.
   */
  function clearFieldError(field) {
    field.input.classList.remove('error');
    field.error.textContent = '';
  }

  // Clear errors on user input (real-time feedback)
  Object.values(fields).forEach(field => {
    field.input.addEventListener('input', () => {
      clearFieldError(field);
      formError.classList.remove('show');
    });
  });

  // Form submit handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide previous alerts
    formSuccess.classList.remove('show');
    formError.classList.remove('show');

    let isValid = true;

    // Get trimmed values
    const nameVal    = fields.name.input.value.trim();
    const emailVal   = fields.email.input.value.trim();
    const subjectVal = fields.subject.input.value.trim();
    const messageVal = fields.message.input.value.trim();

    // Validate Name
    if (!nameVal) {
      showFieldError(fields.name, 'Name is required.');
      isValid = false;
    } else if (nameVal.length < 2) {
      showFieldError(fields.name, 'Name must be at least 2 characters.');
      isValid = false;
    } else {
      clearFieldError(fields.name);
    }

    // Validate Email
    if (!emailVal) {
      showFieldError(fields.email, 'Email is required.');
      isValid = false;
    } else if (!isValidEmail(emailVal)) {
      showFieldError(fields.email, 'Please enter a valid email.');
      isValid = false;
    } else {
      clearFieldError(fields.email);
    }

    // Validate Subject
    if (!subjectVal) {
      showFieldError(fields.subject, 'Subject is required.');
      isValid = false;
    } else if (subjectVal.length < 3) {
      showFieldError(fields.subject, 'Subject must be at least 3 characters.');
      isValid = false;
    } else {
      clearFieldError(fields.subject);
    }

    // Validate Message
    if (!messageVal) {
      showFieldError(fields.message, 'Message is required.');
      isValid = false;
    } else if (messageVal.length < 10) {
      showFieldError(fields.message, 'Message must be at least 10 characters.');
      isValid = false;
    } else {
      clearFieldError(fields.message);
    }

    if (!isValid) {
      formError.classList.add('show');
      return;
    }

    // ── REAL ACTION: Open mailto with the form data ──
    // Since no backend is configured, we use mailto: to compose
    // an actual email in the user's email client.
    const recipient = 'johndoe@example.com';
    const subject   = encodeURIComponent(subjectVal);
    const body      = encodeURIComponent(
      `Name: ${nameVal}\nEmail: ${emailVal}\n\n${messageVal}`
    );

    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Show success feedback
    formSuccess.classList.add('show');
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Open email client
    window.location.href = mailtoLink;

    // Reset form after a short delay
    setTimeout(() => {
      contactForm.reset();
    }, 500);

    // Auto-hide success after 8 seconds
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 8000);
  });


  // ── 6. Resume Download Handler ────────────────────────

  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Inform the user that they need to add their actual resume file
      alert(
        '📄 Resume Download\n\n' +
        'To enable this button:\n' +
        '1. Add your resume file (e.g., "John_Doe_Resume.pdf") to the project folder.\n' +
        '2. Update the link in index.html to point to your file.\n\n' +
        'Example: <a href="John_Doe_Resume.pdf" download>'
      );
    });
  }


  // ── 7. Hero Canvas Particle Animation ─────────────────

  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
      heroCanvas.width  = window.innerWidth;
      heroCanvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      // Fewer particles for performance — scales with screen width
      const count = Math.floor((heroCanvas.width * heroCanvas.height) / 18000);
      const particleCount = Math.min(count, 80); // Cap at 80

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * heroCanvas.width,
          y: Math.random() * heroCanvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

      particles.forEach(p => {
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = heroCanvas.width;
        if (p.x > heroCanvas.width) p.x = 0;
        if (p.y < 0) p.y = heroCanvas.height;
        if (p.y > heroCanvas.height) p.y = 0;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();
      });

      // Draw subtle connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineOpacity = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();

    // Rebuild on resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationId);
        resizeCanvas();
        createParticles();
        drawParticles();
      }, 200);
    });
  }

});
