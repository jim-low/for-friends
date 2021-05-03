const canvas = document.getElementById('bubbles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.99;
const MIN_RADIUS = 15;
const MAX_RADIUS = 40;

let bubbles = [];
let particles = [];

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Particle {
    constructor(x, y, radius, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity.x = velocity.x;
        this.velocity.y = velocity.y;
    }

    draw() {
        // ctx.strokeStyle = 'black';
        // ctx.fillStyle = 'black';

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.closePath();

        ctx.stroke();
        ctx.fill();
    }

    update() {
        this.velocity.y += gravity;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class Bubble {
    constructor(x, y, radius, color) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.speed = MAX_RADIUS/this.radius;
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
            particles.push(new Particle(this.x, this.y, 5, {
                x: Math.cos(angle * i),
                y: Math.sin(angle * i)
            }));
        }
    }

    update() {
        this.y -= this.speed;
        this.draw();
    }
}

function animate(objArr) {
    objArr.forEach(obj => {
        obj.draw();
        obj.update();
    });
}

function updateCanvas() {
    requestAnimationFrame(updateCanvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animate(bubbles);
    animate(particles);
}

function spawnBubble() {
    let radius = getRandomNum(MIN_RADIUS, MAX_RADIUS);
    let x = getRandomNum(radius, canvas.width - radius);
    let y = canvas.height + radius;
    bubbles.push(new Bubble(x, y, radius, 'red'));
    setTimeout(spawnBubble, 250);
}

updateCanvas();
spawnBubble();

