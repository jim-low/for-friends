const canvas = document.getElementById('oscillation')
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined
}

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor(colorArr) {
    return colorArr[getRandomInt(0, colorArr.length - 1)];
}

class Particle {
    constructor(props) {
        this.pos = props.pos;
        this.axis = this.pos;

        this.radius = props.radius;
        this.color = props.color;

        this.velocity = 0.05;
        this.radian = 0;
    }

    draw() {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
        ctx.closePath();

        ctx.fill();
    }

    update() {
        this.radian += this.velocity;

        this.pos.x = mouse.x + Math.cos(this.radian) * 50;
        this.pos.y = mouse.y + Math.sin(this.radian) * 50;
    }
}

let particles = [];

function refresh() {
    requestAnimationFrame(refresh);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.draw();
        particle.update();
    });
}

refresh();

