gsap.registerPlugin(ScrollTrigger);
document.documentElement.classList.add('is-loading');

/* ==========================================================================
    SCROLL PROGRESS & NAVBAR COLOR TRIGGER
    ========================================================================== */
const progressEl = document.getElementById('scroll-progress');
const navbarEl = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressEl.style.width = scrollPercent + '%';

    if (scrollY > 80) {
    navbarEl.classList.add('navbar-scrolled');
    } else {
    navbarEl.classList.remove('navbar-scrolled');
    }
}, { passive: true });

/* ==========================================================================
    CUSTOM CURSOR
    ========================================================================== */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const interactiveSelectors = 'a, button, input, textarea, .tech-tag, .project-card, .hero-photo-card';
document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
});

// Dark Section Cursor Inversion
const contactSection = document.getElementById('contact');
ScrollTrigger.create({
    trigger: contactSection,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter: () => cursor.classList.add('cursor-white'),
    onLeave: () => cursor.classList.remove('cursor-white'),
    onEnterBack: () => cursor.classList.add('cursor-white'),
    onLeaveBack: () => cursor.classList.remove('cursor-white')
});

/* ==========================================================================
    SPLIT TEXT WRAPPER UTILITY
    ========================================================================== */
function splitWordsIntoSpans(element) {
    if (!element) return;
    const text = element.textContent.trim();
    const words = text.split(/\s+/);
    element.innerHTML = words.map(w => `<span class="split-word"><span class="split-word-inner">${w}</span></span>`).join(' ');
}

splitWordsIntoSpans(document.getElementById('about-heading'));
splitWordsIntoSpans(document.getElementById('contact-heading'));

/* ==========================================================================
    HERO ENTRANCE ANIMATIONS
    ========================================================================== */
function triggerHeroEntrance() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
    .to('#hero-canvas', {
        scale: 1,
        autoAlpha: 1,
        duration: 1.0
    })
    .from('#hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.7
    }, '-=0.6')
    .from('.hero-title-text', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1
    }, '-=0.5')
    .fromTo('#hero-photo', {
        scale: 0.6,
        rotation: -18,
        y: -2,
        opacity: 0
    }, {
        scale: 1,
        rotation: -6,
        y: -2,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform',
        onStart: () => {
            document.getElementById('hero-photo').style.transition = 'none';
        },
        onComplete: () => {
            document.getElementById('hero-photo').style.removeProperty('transition');
        }
    }, '-=0.7')
    .from('#hero-desc', {
        y: 20,
        opacity: 0,
        duration: 0.8
    }, '-=0.5')
    .from('#hero-scroll', {
        y: 15,
        opacity: 0,
        duration: 0.6
    }, '-=0.4');
}

gsap.set('#hero-canvas', {
    autoAlpha: 0,
    scale: 0.96
});

/* ==========================================================================
    LOADING SCREEN TIMELINE
    ========================================================================== */
window.addEventListener('load', () => {
    const loaderLine = document.getElementById('loader-line');
    const loaderScreen = document.getElementById('loading-screen');

    if (!loaderLine || !loaderScreen) {
        document.documentElement.classList.remove('is-loading');
        triggerHeroEntrance();
        return;
    }

    // Expand line after 0.3s over 0.8s
    gsap.to(loaderLine, {
    width: 120,
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.out',
    onComplete: () => {
        // Fade out loading overlay over 0.5s
        gsap.to(loaderScreen, {
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            document.documentElement.classList.remove('is-loading');
            loaderScreen.style.display = 'none';
            triggerHeroEntrance();
        }
        });
    }
    });
});

/* ==========================================================================
    ABOUT SECTION ANIMATIONS
    ========================================================================== */
// Heading word stagger
gsap.from('#about-heading .split-word-inner', {
    scrollTrigger: {
    trigger: '#about-heading',
    start: 'top 80%'
    },
    opacity: 0,
    y: 20,
    duration: 0.7,
    stagger: 0.08,
    ease: 'power2.out'
});

// Left column slide from x: -40
gsap.from('#about-left-col', {
    scrollTrigger: {
    trigger: '.about-intro',
    start: 'top 75%'
    },
    opacity: 0,
    x: -40,
    duration: 0.85,
    ease: 'power2.out'
});

// Right column slide from x: 40
gsap.fromTo('#about-right-col', {
    opacity: 0,
    x: 40,
    rotation: 2
}, {
    scrollTrigger: {
    trigger: '.about-intro',
    start: 'top 75%'
    },
    opacity: 1,
    x: 0,
    rotation: 2,
    duration: 0.85,
    ease: 'power2.out',
    onStart: () => {
        document.getElementById('about-right-col').style.transition = 'none';
    },
    onComplete: () => {
        const aboutImage = document.getElementById('about-right-col');
        aboutImage.style.removeProperty('transform');
        requestAnimationFrame(() => aboutImage.style.removeProperty('transition'));
    }
});

// CountUp Stats
const aboutStatNums = document.querySelectorAll('.about-stat-number');
aboutStatNums.forEach(stat => {
    const targetVal = parseFloat(stat.getAttribute('data-target'));
    const counter = { val: 0 };

    ScrollTrigger.create({
    trigger: '#about-right-col',
    start: 'top 80%',
    once: true,
    onEnter: () => {
        if (targetVal === 0) {
        stat.textContent = '0';
        return;
        }
        gsap.to(counter, {
        val: targetVal,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
            stat.textContent = Math.round(counter.val);
        }
        });
    }
    });
});

// Tech Stack: rows slide in, then tags gently fade up within each row.
// Keep the tags visible by default; the animation only runs when the section enters the viewport.
const techRows = gsap.utils.toArray('.tech-stack-row');
const techTimeline = gsap.timeline({
    scrollTrigger: {
    trigger: '#tech-stack-wrap',
    start: 'top 80%',
    once: true
    }
});

techRows.forEach((row) => {
    const tags = row.querySelectorAll('.tech-tag');

    techTimeline.fromTo(row,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
    '>'
    );

    techTimeline.fromTo(tags,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.3, stagger: 0.02, ease: 'power2.out' },
    '>-0.3'
    );
});

/* ==========================================================================
    PROJECTS SECTION ANIMATIONS
    ========================================================================== */
gsap.utils.toArray('.project-card').forEach((card) => {
    gsap.from(card, {
    scrollTrigger: {
        trigger: card,
        start: 'top 85%'
    },
    opacity: 0,
    y: 50,
    duration: 0.85,
    ease: 'power2.out'
    });
});

/* ==========================================================================
    EXPERIENCE SECTION ANIMATION
    ========================================================================== */
gsap.from('#experience-card', {
    scrollTrigger: {
    trigger: '#experience-card',
    start: 'top 80%'
    },
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power2.out'
});

/* ==========================================================================
    CONTACT SECTION ANIMATIONS
    ========================================================================== */
gsap.from('#contact-heading .split-word-inner', {
    scrollTrigger: {
    trigger: '#contact-heading',
    start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.08,
    ease: 'power2.out'
});

gsap.from('.contact-left', {
    scrollTrigger: {
    trigger: '.contact-grid',
    start: 'top 75%'
    },
    opacity: 0,
    x: -40,
    duration: 0.85,
    ease: 'power2.out'
});

gsap.from('.contact-right', {
    scrollTrigger: {
    trigger: '.contact-grid',
    start: 'top 75%'
    },
    opacity: 0,
    x: 40,
    duration: 0.85,
    ease: 'power2.out'
});

/* ==========================================================================
    COPY EMAIL & CONTACT FORM INTERACTIONS
    ========================================================================== */
const copyBtn = document.getElementById('copy-email-btn');
const emailAddress = 'patilmitul1911@gmail.com';

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailAddress).then(() => {
    copyBtn.textContent = 'copied ✓';
    copyBtn.classList.add('copied');
    setTimeout(() => {
        copyBtn.textContent = 'copy';
        copyBtn.classList.remove('copied');
    }, 2000);
    });
});

const contactForm = document.getElementById('contact-form');
const formStatusMsg = document.getElementById('form-status-msg');
const formSubmitBtn = contactForm.querySelector('.form-submit-btn');

emailjs.init({
    publicKey: 'JwbPNtnPEjarDMOyp'
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'Sending...';
    formStatusMsg.classList.remove('active');

    try {
        const formData = new FormData(contactForm);
        await emailjs.send('service_ilql8hc', 'template_30irqg6', {
            name: formData.get('name'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message')
        });
        formStatusMsg.textContent = 'Message sent ✓';
        formStatusMsg.classList.add('active');
        contactForm.reset();
    } catch (error) {
        formStatusMsg.textContent = 'Could not send message. Please try again.';
        formStatusMsg.classList.add('active');
        console.error('EmailJS send failed:', error);
    } finally {
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = 'Send Message';
        setTimeout(() => {
            formStatusMsg.classList.remove('active');
        }, 4000);
    }
});

/* ==========================================================================
    MOBILE NAVIGATION
    ========================================================================== */
const navToggle = document.getElementById('nav-toggle');
const mobileNavPanel = document.getElementById('mobile-nav-panel');

function closeMobileNav() {
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    mobileNavPanel.classList.remove('is-open');
    mobileNavPanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mobile-menu-open');
}

navToggle.addEventListener('click', () => {
    const isOpen = mobileNavPanel.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobileNavPanel.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('mobile-menu-open', isOpen);
});

/* ==========================================================================
    SMOOTH NAVIGATION SCROLL
    ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        e.preventDefault();
        const targetOffset = targetElement.getBoundingClientRect().top + window.pageYOffset - (targetId === '#hero' ? 0 : 70);
        closeMobileNav();
        window.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
        });
    }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
});
