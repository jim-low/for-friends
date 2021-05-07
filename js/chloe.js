const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;
const friction = 0.99;
const MIN_TIME = 100;

let hearts = [];

let heartHeight = canvas.width/20;
let heartRadius = heartHeight/3;

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Heart {
    constructor(pos, height, radius) {
        this.pos = pos;

        this.height = height;
        this.radius = radius;
    }

    draw() {
        let startX = this.pos.x;
        let startY = this.pos.y - this.height;
        let xCtrlPtRaito = 1.75;
        let yCtrlPtRaito = this.height/2;

        ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
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
    constructor(start, end, height, radius, velocity) {
        super(start, height, radius);

        this.end = end;
        this.velocity = velocity;
    }

    update() {
        this.opacity -= 0.01;

        this.velocity.y += gravity;

        this.velocity.x *= friction;
        this.velocity.y *= friction;

        this.start.x += this.velocity.x;
        this.start.y += this.velocity.y;
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
    ctx.fillStyle = 'rgba(248, 131, 121)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.draw();
        heart.update();
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

document.querySelector('.feature-hint').addEventListener('click', _ => {
    document.querySelector('.feature-hint').remove();
});

