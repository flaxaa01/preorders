console.log("Brand landing page loaded successfully.");

// --- BACKGROUND SNOW VISUALS ---
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
const toggleBtn = document.getElementById('settingsToggle');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let numFlakes = 45;
let flakes = [];
let animationId;
let snowActive = true;

function createFlakes() {
    flakes = [];
    for (let i = 0; i < numFlakes; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 0.8,
            d: Math.random() * numFlakes,
            speed: Math.random() * 0.8 + 0.3
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
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

toggleBtn.addEventListener('click', () => {
    snowActive = !snowActive;
    if (snowActive) {
        updateAnimation();
    } else {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, width, height);
    }
});

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createFlakes();
});

createFlakes();
updateAnimation();


// --- ASYNC FORM HANDLER ---
const preOrderForm = document.getElementById('preOrderForm');
const formContent = document.getElementById('formContent');
const submitBtn = document.getElementById('submitBtn');

preOrderForm.addEventListener('submit', function(e) {
    // 1. Prevent standard form redirecting behavior
    e.preventDefault();

    // 2. Change button status to feedback it's processing
    submitBtn.textContent = "SENDING...";
    submitBtn.disabled = true;

    // 3. Collect form values
    const url = preOrderForm.action;
    const formData = new FormData(preOrderForm);

    // 4. Send the submission silently via Fetch API
    fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        // 5. Replace whole block layout instantly with your drop success messaging
        formContent.style.opacity = 0;
        
        setTimeout(() => {
            formContent.innerHTML = `
                <h1 style="font-size: 2rem; letter-spacing: 4px; line-height: 1.5; animation: fadeIn 1s ease;">
                    YOU'RE NOW ON THE LIST
                </h1>
            `;
            formContent.style.opacity = 1;
        }, 300);
    })
    .catch(error => {
        console.error('Submission failed:', error);
        submitBtn.textContent = "ERROR. TRY AGAIN";
        submitBtn.disabled = false;
    });
});
