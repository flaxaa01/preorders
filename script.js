console.log("Brand landing page loaded successfully.");

// Canvas Snow Settings
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
const toggleBtn = document.getElementById('settingsToggle');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let numFlakes = 45; // Decreased slightly for a more subtle, low-key look
let flakes = [];
let animationId;
let snowActive = true;

// Generate snow particles
function createFlakes() {
    flakes = [];
    for (let i = 0; i < numFlakes; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 0.8, // subtle variation in sizing
            d: Math.random() * numFlakes,
            speed: Math.random() * 0.8 + 0.3 // slow drift velocity
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'; // low visibility drift lines
    ctx.beginPath();
    for (let i = 0; i < numFlakes; i++) {
        const f = flakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    move();
}

function move() {
    for (let i = 0; i < numFlakes; i++) {
        const f = flakes[i];
        f.y += f.speed;
        f.x += Math.sin(f.d) * 0.3;

        if (f.y > height) {
            flakes[i] = { x: Math.random() * width, y: 0, r: f.r, d: f.d, speed: f.speed };
        }
    }
}

function updateAnimation() {
    if (snowActive) {
        draw();
        animationId = requestAnimationFrame(updateAnimation);
    } else {
        ctx.clearRect(0, 0, width, height);
    }
}

// Cog Click Action -> Toggles Visual FX
toggleBtn.addEventListener('click', () => {
    snowActive = !snowActive;
    if (snowActive) {
        updateAnimation();
    } else {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, width, height);
    }
});

// Screen resize adjustments
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createFlakes();
});

createFlakes();
updateAnimation();
