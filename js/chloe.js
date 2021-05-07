const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.05;
const friction = 0.99;
const MIN_TIME = 100;

let fireworks = [];

let heartHeight = canvas.width/20;
let heartRadius = heartHeight/3;

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Heart {
    constructor(pos, height, radius, color) {
        this.pos = pos;
        this.height = height;
        this.radius = radius;

        this.color = color;
        this.opacity = 1;
    }

    draw() {
        let startX = this.pos.x;
        let startY = this.pos.y - this.height;
        let xCtrlPtRaito = 1.75;
        let yCtrlPtRaito = this.height/2;

        ctx.fillStyle = this.color;
        ctx.lineWidth = .5;

        ctx.beginPath();

        ctx.moveTo(startX, startY);
        // right side of the heart
        ctx.arc(startX+this.radius, startY, this.radius, Math.PI, Math.PI*2);
        ctx.quadraticCurveTo(
            startX + (this.radius*xCtrlPtRaito), startY + yCtrlPtRaito,
            this.pos.x, this.pos.y
        );

        ctx.moveTo(startX, startY);
        // left side of the heart
        ctx.arc(startX-this.radius, startY, this.radius, 0, Math.PI, true);
        ctx.quadraticCurveTo(
            startX - (this.radius*xCtrlPtRaito), startY + yCtrlPtRaito,
            this.pos.x, this.pos.y
        );

        ctx.fill();
        ctx.closePath();
    }
}

class Firework extends Heart {
    constructor(pos, end, height, radius, color, velocity) {
        super(pos, height, radius, color);
        this.end = end;
        this.velocity = velocity;
    }

    update() {
        this.opacity -= 0.01;

        this.velocity.y += gravity;

        this.velocity.x *= friction;
        this.velocity.y *= friction;

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }
}

const container = document.querySelector('.container')
const block = document.querySelector('.block')
function init() {
    container.style.animation = 'descend 2s linear forwards';
    setTimeout(() => {
        // TODO: fix bug where a thin line from block element is still visible after animation
        block.style.animation = 'thin 2s ease-in-out forwards';
    }, 2500);
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(firework => {
        firework.draw();
        firework.update();
    });
}

function scaleHeartSize() {
    const HEIGHT_THRESHOLD = 30;
    const RADIUS_THRESHOLD = HEIGHT_THRESHOLD/3;

    heartHeight = canvas.width/20;
    heartRadius = heartHeight/3;

    if(heartHeight <= HEIGHT_THRESHOLD)
        heartHeight = HEIGHT_THRESHOLD;

    if(heartRadius <= RADIUS_THRESHOLD)
        heartRadius = RADIUS_THRESHOLD;
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    scaleHeartSize();
});

addEventListener('click', e => {
    const FIREWORK_AMT = 15;
    const angle = (Math.PI*2)/15
    for(let i = 0; i < FIREWORK_AMT; ++i) {
        fireworks.push(new Firework({
            x: e.clientX,
            y: e.clientY
        }, {
            x: 600,
            y: 600,
        },
            10,
            10/3,
            'red', {
                x: Math.cos(angle * i),
                y: Math.sin(angle * i),
            }
        ));
    }
});

document.querySelector('.feature-hint').addEventListener('click', () => {
    document.querySelector('.feature-hint').remove();
});

animate();

