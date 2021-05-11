const canvas = document.getElementById('oscillation')
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let maxForce = canvas.width/7.5;
let minForce = maxForce/3;

const MIN_VELOCITY = 0.02;
const MAX_VELOCITY = 0.06;

const colors = [
    "#2D7CD6",
    "#5ABEC4",
    "#BB39C2",
    "#AC44E9",
    "#D3DD2D",
    "#2CEC2C",
    "#98FB98",
    "#FF8080",
]

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
}

const moveEvents = ['mousemove', 'touchmove']
const clickEvents = ['click', 'touchstart']

moveEvents.forEach(event => {
    addEventListener(event, (e) => {
        mouse.x = e.clientX ? e.clientX : e.touches[0].pageX;
        mouse.y = e.clientY ? e.clientY : e.touches[0].pageY;
    });
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    maxForce = canvas.width/7.5;
    minForce = maxForce/3;
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor(colorArr) {
    return colorArr[getRandomInt(0, colorArr.length)];
}

class Particle {
    constructor(props) {
        this.pos = props.pos;
        this.axis = this.pos;

        this.radius = props.radius;

        this.velocity = (Math.random() * (MAX_VELOCITY - MIN_VELOCITY)) + MIN_VELOCITY;
        this.velocity *= getRandomInt(0, 2) % 2 == 0 ? 1 : -1;

        this.radian = Math.random() * 360;
        this.force = (Math.random() * (maxForce - minForce)) + minForce;

        this.color = props.color;
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

        this.pos.x = mouse.x + Math.cos(this.radian) * this.force;
        this.pos.y = mouse.y + Math.sin(this.radian) * this.force;
    }
}

let particles = [];

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height);

function refresh() {
    requestAnimationFrame(refresh);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.draw();
        particle.update();
    });
}

clickEvents.forEach(event => {
    addEventListener(event, () => {
        particles.push(new Particle({
            pos: {
                x: -10,
                y: -10,
            },
            radius: 5,
            color: getRandomColor(colors)
        }));
    });
});

document.querySelector('.feature-hint').addEventListener('click', () => {
    document.querySelector('.feature-hint').remove();
});

refresh();

