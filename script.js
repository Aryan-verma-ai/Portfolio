// ===================================================================================
// TSPARTICLES - ANIMATED BACKGROUND LOGIC
// ===================================================================================
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#281372" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.2, sync: false } },
        size: { value: 2.5, random: true, anim: { enable: false } },
        line_linked: { enable: true, distance: 200, color: "#00e5ff", opacity: 0.3, width: 1 },
        move: { enable: true, speed: 1, direction: "none", random: false, straight: true, out_mode: "out", bounce: false, attract: { enable: false } }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 140, line_opacity: 0.6 },
            push: { particles_nb: 4 },
        }
    },
    retina_detect: true
});

// ===================================================================================
// CUSTOM CURSOR LOGIC
// ===================================================================================
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    let isHovering = false, isIdle = false;
    let velocityX = 0, velocityY = 0;
    let idleTimeout;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isHovering = e.target.closest('[data-hoverable]') !== null;
        if (isIdle) {
            isIdle = false;
            velocityX = 0;
            velocityY = 0;
        }
        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
            isIdle = true;
            startFloatingAnimation();
        }, 5000);
    });

    function animateCursor() {
        if (isIdle) {
            cursorX += velocityX;
            cursorY += velocityY;
            if (cursorX <= 0 || cursorX >= window.innerWidth) { velocityX *= -1; }
            if (cursorY <= 0 || cursorY >= window.innerHeight) { velocityY *= -1; }
        } else {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
        }
        const currentElement = document.elementFromPoint(cursorX, cursorY);
        const isOverImage = currentElement && (currentElement.tagName === 'IMG' || currentElement.closest('img'));
        const isOverHoverable = currentElement && currentElement.closest('[data-hoverable]');
        const cursorSize = (isOverHoverable && !isOverImage) ? 80 : 80;
        cursor.style.left = `${cursorX - cursorSize / 2}px`;
        cursor.style.top = `${cursorY - cursorSize / 2}px`;
        cursor.style.width = `${cursorSize}px`;
        cursor.style.height = `${cursorSize}px`;
        if (isOverHoverable) {
            if (isOverImage) {
                cursor.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
                cursor.style.mixBlendMode = 'normal';
                cursor.style.border = '2px solid rgba(0, 255, 255, 0.7)';
            } else {
                cursor.style.backgroundColor = 'white';
                cursor.style.mixBlendMode = 'difference';
                cursor.style.border = 'none';
            }
        } else {
            cursor.style.backgroundColor = 'rgba(0, 255, 255, 0.5)';
            cursor.style.mixBlendMode = 'normal';
            cursor.style.border = '2px solid #00FFFF';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    function startFloatingAnimation() {
        velocityX = (Math.random() - 0.5) * 2;
        velocityY = (Math.random() - 0.5) * 2;
    }
});

// ===================================================================================
// PAGE LOADER
// ===================================================================================
(() => {
    const loader = document.getElementById('loader');
    const particleHost = document.getElementById('loader-particles');
    const PARTICLE_COUNT = 18;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = document.createElement('span');
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.3;
        const distance = 140 + Math.random() * 120;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--dy', `${dy}px`);
        p.style.animationDelay = `${1.7 + Math.random() * 0.25}s`;
        particleHost.appendChild(p);
    }
    const hideLoader = () => {
        loader.classList.add('loader-hide');
        document.body.style.overflow = '';
        revealHero();
        setTimeout(() => loader.remove(), 800);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('load', () => {
        setTimeout(hideLoader, 2200);
    });
    setTimeout(hideLoader, 3200);
})();

// ===================================================================================
// TYPING EFFECT
// ===================================================================================
(() => {
    const target = document.getElementById('typed-text');
    if (!target) return;
    const roles = [
        'Full Stack Developer',
        'AI Enthusiast',
        'Love Travelling',
        'Creative Problem Solver'
    ];
    let roleIndex = 0, charIndex = 0, deleting = false;
    const tick = () => {
        const current = roles[roleIndex];
        if (!deleting) {
            charIndex++;
            target.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 1400);
                return;
            }
        } else {
            charIndex--;
            target.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(tick, deleting ? 40 : 75);
    };
    tick();
})();

// ===================================================================================
// NAVBAR
// ===================================================================================
(() => {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const onScroll = () => {
        navbar.classList.toggle('solid', window.scrollY > 40);
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (toggle && mobileMenu) {
        toggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
        mobileMenu.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => mobileMenu.classList.remove('open'));
        });
    }
})();

// ===================================================================================
// SCROLL REVEAL
// ===================================================================================
function revealHero() {
    document.querySelectorAll('.in-view-init').forEach((el) => {
        el.classList.add('in-view');
    });
}

(() => {
    const items = document.querySelectorAll('.reveal:not(.in-view-init), .tl-item');
    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('in-view'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    items.forEach((el) => observer.observe(el));
})();

// ===================================================================================
// BUTTON RIPPLE
// ===================================================================================
document.querySelectorAll('.btn-ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const span = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        span.className = 'ripple-span';
        span.style.width = span.style.height = `${size}px`;
        span.style.left = `${e.clientX - rect.left - size / 2}px`;
        span.style.top = `${e.clientY - rect.top - size / 2}px`;
        this.appendChild(span);
        setTimeout(() => span.remove(), 650);
    });
});

// ===================================================================================
// SUBTLE CARD TILT
// ===================================================================================
document.querySelectorAll('.hang-card-inner, .project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
    card.style.transformStyle = 'preserve-3d';
});

// ===================================================================================
// CONTACT FORM
// ===================================================================================
(() => {
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:aryanverma.dev@gmail.com?subject=${subject}&body=${body}`;
        note.textContent = 'Opening your email app…';
        setTimeout(() => { note.textContent = ''; }, 4000);
        form.reset();
    });
})();

// ===================================================================================
// FOOTER YEAR
// ===================================================================================
(() => {
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();

// ===================================================================================
// CERTIFICATES SECTION LOGIC (MANUAL SLIDER)
// ===================================================================================
document.addEventListener('DOMContentLoaded', () => {
    const certificates = [
        { image: './images/certificates/ai-for-marketing.png', title: 'AI for Marketing', issuer: 'Emory University (Coursera) • Aug 6, 2025', verify: 'https://coursera.org/verify/specialization/9PG59EFYQQ2R' },
        { image: './images/certificates/design-thinking.png', title: 'Design Thinking', issuer: 'UVA Darden School of Business (Coursera) • Dec 17, 2024', verify: 'https://coursera.org/verify/specialization/V3QM2W6M0JDE' },
        { image: './images/certificates/esg-investing.png', title: 'ESG Investing: Financial Decisions in Flux', issuer: 'Interactive Brokers (Coursera) • Jan 2, 2025', verify: 'https://coursera.org/verify/specialization/Q8ZQ92HEC8HD' },
        { image: './images/certificates/natural-disaster-climate-risk.png', title: 'Natural Disaster & Climate Risk Assessment', issuer: 'BIDAcademy (Coursera) • Dec 2, 2024', verify: 'https://coursera.org/verify/specialization/TO9W1ANM4BL6' },
        { image: './images/certificates/social-media-marketing.png', title: 'Social Media Marketing in Practice', issuer: 'Digital Marketing Institute (Coursera) • Dec 2, 2024', verify: 'https://coursera.org/verify/specialization/ABN1F9QSYVLL' },
        { image: './images/certificates/azure-ai-fundamentals.png', title: 'Azure AI Fundamentals', issuer: 'Microsoft Certified • Nov 21, 2024', verify: '#' },
        { image: './images/certificates/azure-fundamentals.png', title: 'Azure Fundamentals', issuer: 'Microsoft Certified • Jun 27, 2025', verify: '#' },
        { image: './images/certificates/ai-masterclass-chitkara.png', title: 'AI, ChatGPT, DeepSeek & Metaverse Masterclass', issuer: 'Chitkara University • May 19–21, 2025 • Scored 99/100', verify: '#' }
    ];

    const track = document.getElementById('certificates-track');
    const modal = document.getElementById('certificate-modal');
    const closeBtn = document.getElementById('close-certificate-modal');
    const modalImage = document.getElementById('certificate-modal-image');
    const modalTitle = document.getElementById('certificate-modal-title');
    const modalIssuer = document.getElementById('certificate-modal-issuer');
    const modalVerify = document.getElementById('certificate-modal-verify');

    if (!track) return;

    const buildCard = (cert) => {
        const card = document.createElement('div');
        card.className = 'cert-card';
        card.setAttribute('data-hoverable', '');
        card.innerHTML = `
            <div class="cert-media">
                <img src="${cert.image}" alt="${cert.title}">
            </div>
            <div class="cert-body">
                <h3>${cert.title}</h3>
                <p>${cert.issuer}</p>
                <div class="cert-verify">Verify Credential →</div>
            </div>
        `;
        card.addEventListener('click', () => {
            modalImage.src = cert.image;
            modalTitle.textContent = cert.title;
            modalIssuer.textContent = cert.issuer;
            modalVerify.href = cert.verify;
            modal.classList.remove('hidden');
        });
        return card;
    };

    // Render certificates
    certificates.forEach((cert) => {
        track.appendChild(buildCard(cert));
    });

    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // Manual Slider Logic
    const certContainer = document.getElementById('cert-marquee-container');
    const certPrevBtn = document.getElementById('cert-prev');
    const certNextBtn = document.getElementById('cert-next');

    if (certContainer && certPrevBtn && certNextBtn) {
        const firstCard = document.querySelector('.cert-card');
        const gap = 24;
        const scrollAmount = firstCard ? (firstCard.offsetWidth + gap) : 324;

        certPrevBtn.addEventListener('click', () => {
            certContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        certNextBtn.addEventListener('click', () => {
            certContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});