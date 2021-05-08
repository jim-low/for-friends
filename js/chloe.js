const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.05;
const friction = 0.99;
const MIN_TIME = 100;
const MARGIN = 20;

let fireworks = [];
let trails = [];

let heartHeight = 13.5;
let heartRadius = heartHeight/3;

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Trail {
    constructor(pos, end) {
        this.pos = pos;
        this.end = end;
        this.radius = 3;

        this.force = getRandomNum(5, 20);

        this.velocity = {
            x: null,
            y: null,
        };

        this.hue = getRandomNum(0, 360);
    }

    draw() {
        ctx.fillStyle = `hsl(${this.hue}, 50%, 50%)`;

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
        ctx.closePath();

        ctx.fill();
    }

    calcVelocity() {
        const distance = {
            x: this.pos.x - this.end.x,
            y: this.pos.y - this.end.y,
        }

        const angle = Math.atan2(distance.y, distance.x);

        this.velocity = {
            x: Math.cos(angle) * -1 * this.force,
            y: Math.sin(angle) * -1 * this.force,
        };
    }

    update() {
        this.hue += 2;

        this.calcVelocity();

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }
}

class Heart {
    constructor(pos, height, radius) {
        this.pos = pos;
        this.height = height;
        this.radius = radius;

        this.hue = getRandomNum(0, 360);
        this.color = `hsl(${this.hue}, 50%, 50%)`;
        this.opacity = 1;
    }

    draw() {
        let startX = this.pos.x;
        let startY = this.pos.y - this.height;
        let xCtrlPtRaito = 1.75;
        let yCtrlPtRaito = this.height/2;

        ctx.fillStyle = this.color;
        ctx.lineWidth = .5;

        ctx.save()
        ctx.globalAlpha = this.opacity;

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
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

class Firework extends Heart {
    constructor(pos, height, radius, velocity) {
        super(pos, height, radius);
        this.velocity = velocity;

        this.velocity.x *= Math.random();
        this.velocity.y *= Math.random();
    }

    update() {
        this.hue += 2;
        this.opacity -= 0.01;

        this.velocity.x *= friction;
        this.velocity.y *= friction;

        this.velocity.y += gravity;

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }
}

function checkTrail(trailObj, index) {
    if(trailObj.pos.y <= trailObj.end.y) {
        playFirework(trailObj.end);
        trails.splice(index, 1);
    }
}

function playFirework(coordinates) {
    const FIREWORK_AMT = 100;
    const angle = (Math.PI*2)/15
    const force = 8;

    for(let i = 0; i < FIREWORK_AMT; ++i) {
        fireworks.push(new Firework({
            x: coordinates.x,
            y: coordinates.y,
        },
            heartHeight,
            heartRadius,
            {
                x: Math.cos(angle * i) * force,
                y: Math.sin(angle * i) * force,
            }
        ));
    }
}

function checkFirework(fireworkObj, index) {
    if(fireworkObj.opacity <= 0)
        fireworks.splice(index, 1);
}

function spawnTrail() {
    let start = {
        x: getRandomNum(MARGIN * -1, canvas.width + MARGIN),
        y: canvas.height + MARGIN
    };
    let end = {
        x: getRandomNum(MARGIN, canvas.width - MARGIN),
        y: getRandomNum(MARGIN, canvas.height - MARGIN),
    }
    trails.push(new Trail(start, end));
    setTimeout(spawnTrail, 750);
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    trails.forEach((trail, i) => {
        trail.draw();
        trail.update();
        checkTrail(trail, i);
    });
    fireworks.forEach((firework, i) => {
        firework.draw();
        firework.update();
        checkFirework(firework, i);
    });
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

addEventListener('click', e => {
    trails.push(new Trail({
        x: getRandomNum(MARGIN * -1, canvas.width + MARGIN),
        y: canvas.height + MARGIN
    }, {
        x: e.clientX,
        y: e.clientY
    }));
});

document.querySelector('.feature-hint').addEventListener('click', () => {
    document.querySelector('.feature-hint').remove();
});

// start canvas with absolute black background
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
animate();
setTimeout(spawnTrail, 3000);

