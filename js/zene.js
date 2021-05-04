const canvas = document.getElementById('bubbles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.50;
const MIN_RADIUS = 20;
let maxRadius = canvas.width/25;
const colors = [
    'rgba(137, 207, 240, 1)',
    'rgba(64, 164, 255, 1)',
    'rgba(65, 209, 211, 1)',
    'rgba(192, 137, 244, 1)',
    'rgba(229, 205, 251, 1)',
    'rgba(175, 25, 211, 1)',
];

let mouse = {
    x: null,
    y: null
};

let bubbles = [];
let particles = [];

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;

        this.color = color;
        this.opacity = 1;
    }

    draw() {
        ctx.fillStyle = this.color.slice(0, this.color.length - 2) + this.opacity + ")";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.closePath();

        ctx.fill();
    }

    update() {
        this.velocity.y += gravity;
        this.opacity -= 0.03;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class Bubble {
    constructor(x, y, radius, color) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.speed = maxRadius/this.radius;
        this.color = color;
    }

    draw() {
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.closePath();

        ctx.stroke();
    }

    burst() {
        const MAX_PARTICLES = 5;
        const angle = (Math.PI*2)/MAX_PARTICLES;
        for(let i = 0; i < MAX_PARTICLES; ++i) {
            particles.push(new Particle(this.x, this.y, 2, this.color, {
                x: Math.cos(angle * i),
                y: getRandomNum(3, 8) * -1
            }));
        }
    }

    update() {
        this.y -= this.speed;
        this.draw();
    }
}

function withinCircle(bubbleObj) {
    return Math.hypot(bubbleObj.x - mouse.x, bubbleObj.y - mouse.y) < bubbleObj.radius;
}

function checkStatus(obj, index) {
    if(obj.y + obj.radius < 0)
        bubbles.splice(index, 1);

    if(obj.opacity < 0)
        particles.splice(index, 1);
}

function animate(objArr) {
    objArr.forEach((obj, idx) => {
        obj.draw();
        obj.update();
        checkStatus(obj, idx);
    });
}

function updateCanvas() {
    requestAnimationFrame(updateCanvas);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate(bubbles);
    animate(particles);
}

function spawnBubble() {
    let radius = getRandomNum(MIN_RADIUS, maxRadius);
    let x = getRandomNum(radius, canvas.width - radius);
    let y = canvas.height + radius;
    bubbles.push(new Bubble(x, y, radius, getRandomColor()));
    setTimeout(spawnBubble, 250);
}

addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    maxRadius = canvas.width/25;
    bubbles.length = 0;
    particles.length = 0;
});

addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

addEventListener('click', () => {
    for(let i = 0; i < bubbles.length; ++i) {
        if(withinCircle(bubbles[i])) {
            bubbles[i].burst();
            bubbles.splice(i, 1);
            break;
        }
    }
});

updateCanvas();
setTimeout(spawnBubble, 3000);

