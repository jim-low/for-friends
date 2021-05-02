const canvas = document.getElementById('bubbles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.99;
const MAX_RADIUS = 30;

let circles = [];
let particles = [];

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
    constructor(x, radius, color) {
        this.radius = radius;
        this.x = x;
        this.y = canvas.height + this.radius;
        this.floatSpeed = MAX_RADIUS/this.radius;
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
        this.y -= this.floatSpeed;
        this.draw();
    }
}

