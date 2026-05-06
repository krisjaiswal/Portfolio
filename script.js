/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    window.scrollY >= 50 ? header.classList.add('scroll-header')
        : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== CHANGING TEXT ANIMATION ===============*/
const textArray = ["Creative<br>Developer", "Freelancer", "Frontend<br>Developer"];
let textIndex = 0;
const changingText = document.getElementById('changing-text');

if (changingText) {
    setInterval(() => {
        changingText.style.opacity = 0;
        changingText.style.transform = 'translateY(10px)';

        setTimeout(() => {
            textIndex = (textIndex + 1) % textArray.length;
            changingText.innerHTML = textArray[textIndex];
            changingText.style.opacity = 1;
            changingText.style.transform = 'translateY(0)';
        }, 500);
    }, 3000);
}

/*=============== EXPERIENCE TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        const allContents = document.querySelectorAll('.experience__content')
        allContents.forEach(content => {
            content.classList.remove('active-content')
        })

        target.classList.add('active-content')

        tabs.forEach(tab => {
            tab.classList.remove('active-tab')
        })
        tab.classList.add('active-tab')
    })
})

/*=============== SCROLL REVEAL ANIMATION (VANILLA JS) ===============*/
const revealElements = document.querySelectorAll('.section:not(#home)');

const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            // Unobserve if you only want it to animate once
            // observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach((el) => {
    el.classList.add('reveal-hidden');
    revealObserver.observe(el);
});

/*=============== WHAT I OFFER ACCORDION ===============*/
const offerCards = document.querySelectorAll('.offer__card')

offerCards.forEach((card) => {
    const header = card.querySelector('.offer__header')

    if (header) {
        header.addEventListener('click', () => {
            const isActive = card.classList.contains('active-offer')

            offerCards.forEach((otherCard) => {
                otherCard.classList.remove('active-offer')
            })

            if (!isActive) {
                card.classList.add('active-offer')
            }
        })
    }
})

/*=============== VANILLA TILT EFFECT ===============*/
const tiltCards = document.querySelectorAll('.projects__card, .offer__card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Subtle tilt: max 5 degrees
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease'; // Remove transform transition to avoid lag
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease';
    });
});

/*=============== PARTICLE SYSTEM ===============*/
(function () {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 130;
    const REPULSION_DIST = 100;
    const PARTICLE_COLOR = '255, 219, 77';
    const LINE_COLOR = '255, 219, 77';

    let W = window.innerWidth;
    let H = window.innerHeight;
    let mouse = { x: -9999, y: -9999 };
    let animFrame;

    canvas.width = W;
    canvas.height = H;

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.baseX = this.x;
            this.baseY = this.y;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.4 + 0.15;
        }
        update() {
            // Slow drift
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around edges
            if (this.x < 0) this.x = W;
            if (this.x > W) this.x = 0;
            if (this.y < 0) this.y = H;
            if (this.y > H) this.y = 0;

            // Mouse repulsion
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < REPULSION_DIST && dist > 0) {
                const force = (REPULSION_DIST - dist) / REPULSION_DIST;
                this.x += (dx / dist) * force * 3.5;
                this.y += (dy / dist) * force * 3.5;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${this.opacity})`;
            ctx.fill();
        }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        animFrame = requestAnimationFrame(loop);
    }

    loop();
})();

/*=============== RADIAL MOUSE GLOW ===============*/
(function () {
    const glow = document.getElementById('mouse-glow');
    if (!glow) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    const LERP = 0.08;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateGlow() {
        currentX += (targetX - currentX) * LERP;
        currentY += (targetY - currentY) * LERP;
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
})();

