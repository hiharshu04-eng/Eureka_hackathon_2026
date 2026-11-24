// ==========================================
// HACKFEST 2.0 - PROBLEM STATEMENTS
// EUREKA CLUB | VIT BHOPAL
// ==========================================

// 1. LUCIDE ICONS
if (window.lucide) {
    lucide.createIcons();
}

// 2. CONNECTED GLOWING PARTICLES
const canvas = document.getElementById("particle-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];

    const count = Math.min(
        90,
        Math.floor((canvas.width * canvas.height) / 13000)
    );

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 1.8 + 0.7
        });
    }
}

function animateParticles() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#45aaff";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#008cff";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 125) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle =
                    `rgba(30,130,255,${0.22 * (1 - distance / 125)})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animateParticles);
}

if (canvas) {
    resizeCanvas();
    animateParticles();
    window.addEventListener("resize", resizeCanvas);
}

// 3. MOUSE INTERACTION
window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// 4. SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
    ".problem-card, .section-header, .track-b-content, .search-container, .filter-container"
);

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(35px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// 5. TRACK A SEARCH FUNCTION
const searchInput = document.getElementById("problem-search");
const problemCards = document.querySelectorAll(".problem-card");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "all";

function filterProblems() {
    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    problemCards.forEach(card => {
        const category = card.dataset.category;
        const text = card.innerText.toLowerCase();

        const matchesCategory =
            activeFilter === "all" || category === activeFilter;

        const matchesSearch = text.includes(searchText);

        card.style.display =
            matchesCategory && matchesSearch ? "block" : "none";
    });
}

if (searchInput) {
    searchInput.addEventListener("input", filterProblems);
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");
        activeFilter = button.dataset.filter;

        filterProblems();
    });
});

// 6. TRACK BUTTON SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

console.log("HACKFEST 2.0 | Problem Statements Loaded");