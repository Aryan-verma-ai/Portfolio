// ===================================================================================
// TSPARTICLES - ANIMATED BACKGROUND LOGIC
// ===================================================================================
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#4E338A" }, // Particle color
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 3, random: true, anim: { enable: false } },
        line_linked: { enable: true, distance: 150, color: "#00FFFF", opacity: 0.4, width: 1 }, // Line color
        move: { enable: true, speed: 1, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false } }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 140, line_opacity: 1 },
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
// IMAGE GALLERY LOGIC
// ===================================================================================
document.addEventListener('DOMContentLoaded', () => {

    const galleryItems = [
        {
            image: './images/techacks1.jpeg',
            title: 'Volunteer at Techacks4.0 36hrs Hackathon',
            description: 'Contributed as a dedicated volunteer at the 36-hour Techacks4.0 hackathon.'
        },
        {
            image: './images/techacks2.jpeg',
            title: 'Techacks Winners',
            description: 'A group photo with the winners of Techacks, celebrating their success.'
        },
        {
            image: './images/techacks3.jpeg',
            title: 'Techacks Organizing Team',
            description: 'The dedicated organizing team behind the Techacks event.'
        },
        {
            image: './images/techacks4.jpeg',
            title: 'Learning Session',
            description: 'Engaging in a collaborative learning session during the hackathon.'
        },
        {
            image: './images/techacks5.jpeg',
            title: 'Award Ceremony',
            description: 'Receiving an award for contributions or participation at the event.'
        },
        {
            image: './images/techacks6.jpeg',
            title: 'Team Brainstorming',
            description: 'Intense brainstorming session with the team, developing innovative ideas.'
        },
    ];

    const mainImage = document.getElementById('mainGalleryImage');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryDescription = document.getElementById('galleryDescription');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');

    let currentIndex = 0;

    const updateGallery = () => {
        const item = galleryItems[currentIndex];
        mainImage.src = item.image;
        galleryTitle.textContent = item.title;
        galleryDescription.textContent = item.description;
    };

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateGallery();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateGallery();
    });

    updateGallery();
});


// ===================================================================================
// PROJECT CAROUSEL & MODAL LOGIC
// ===================================================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Project Data ---
    const projects = [
        {
            image: './images/sportify.png',
            title: 'Sportify - E-commerce App',
            description: 'A full-stack e-commerce platform for sports equipment. Features include user authentication, product listings, a shopping cart, and a secure checkout process.',
            github: 'https://github.com/your-username/sportify',
            live: 'https://sportify-demo.vercel.app'
        },
        {
            image: './images/techacks1.jpeg',
            title: 'Techacks - Hackathon Volunteer',
            description: 'A dedicated volunteer at the 36-hour Techacks4.0 hackathon, supporting event logistics and participant needs.',
            github: 'https://github.com/your-username/techacks',
            live: '#'
        },
        {
            image: './images/another-project-image.jpg',
            title: 'My Awesome Project',
            description: 'This is a great example of a web application I built using modern technologies. It solves a real-world problem.',
            github: 'https://github.com/your-username/another-project',
            live: 'https://another-project-demo.vercel.app'
        }
        // Add more project objects here as needed
    ];

    // --- 2. DOM Elements ---
    const carousel = document.getElementById('project-carousel');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');

    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalGithub = document.getElementById('modal-github');
    const modalLive = document.getElementById('modal-live');

    let currentIndex = 0;

    // --- 3. Function to Render Projects ---
    const renderProjects = () => {
        carousel.innerHTML = '';
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card bg-ui-bg rounded-2xl overflow-hidden shadow-2xl relative cursor-pointer group';
            card.setAttribute('data-hoverable', '');

            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105';
            imageWrapper.style.backgroundImage = `url('${project.image}')`;
            card.appendChild(imageWrapper);

            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/60 rounded-2xl';
            card.appendChild(overlay);

            const textContainer = document.createElement('div');
            textContainer.className = 'absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white z-10';

            const title = document.createElement('h3');
            title.className = 'text-3xl md:text-4xl font-bold text-glow-blue mb-2 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100';
            title.textContent = project.title;

            const viewDetailsBtn = document.createElement('button');
            viewDetailsBtn.className = 'bg-glow-blue text-bg-primary-dark px-6 py-3 rounded-full font-semibold text-lg mt-4 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100';
            viewDetailsBtn.textContent = 'View Details';
            viewDetailsBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                showModal(projects[index]);
            });

            textContainer.appendChild(title);
            textContainer.appendChild(viewDetailsBtn);
            card.appendChild(textContainer);
            carousel.appendChild(card);
        });

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.addEventListener('dblclick', () => {
                showModal(projects[index]);
            });
        });
    };

    // --- 4. Carousel Navigation Logic ---
    const updateCarousel = () => {
        const itemWidth = carousel.firstElementChild.getBoundingClientRect().width;
        carousel.scrollLeft = currentIndex * itemWidth;
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % projects.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateCarousel();
    });

    // --- 5. Modal Functionality ---
    const showModal = (project) => {
        modalImage.src = project.image;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalGithub.href = project.github;
        modalLive.href = project.live;

        if (project.live === '#') {
            modalLive.classList.add('hidden');
        } else {
            modalLive.classList.remove('hidden');
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const hideModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    closeModalBtn.addEventListener('click', hideModal);

    modal.addEventListener('click', (e) => {
        if (e.target.id === 'project-modal') {
            hideModal();
        }
    });

    renderProjects();
});

