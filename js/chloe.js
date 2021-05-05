const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const MIN_TIME = 100;

let hearts = [];

let heartHeight = canvas.width/20;
let heartRadius = heartHeight/3;

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Heart {
    constructor(x, y, height, radius, velocity) {
        this.x = x;
        this.y = y;

        this.height = height;
        this.radius = radius;
        this.velocity = velocity;

        this.opacity = 1;
    }

    draw() {
        let startX = this.x;
        let startY = this.y - this.height;
        let xCtrlPtRaito = 1.75;
        let yCtrlPtRaito = this.height/2;

        ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
        ctx.strokeStyle = `rgba(0, 0, 0, ${this.opacity})`;
        ctx.lineWidth = .5;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // right side of the heart
        ctx.arc(startX+this.radius, startY, this.radius, Math.PI, Math.PI*2);
        ctx.quadraticCurveTo(
            startX + (this.radius*xCtrlPtRaito), startY + yCtrlPtRaito,
            this.x, this.y
        );

        ctx.moveTo(startX, startY);

        // left side of the heart
        ctx.arc(startX-this.radius, startY, this.radius, 0, Math.PI, true);
        ctx.quadraticCurveTo(
            startX - (this.radius*xCtrlPtRaito), startY + yCtrlPtRaito,
            this.x, this.y
        );

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.opacity -= 0.02;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
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

function checkState(heartObj, index) {
    if(heartObj.opacity <= 0)
        hearts.splice(index, 1);
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(248, 131, 121)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, idx) => {
        heart.draw();
        heart.update();
        checkState(heart, idx);
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

function spawnHeart() {
    const containerInfo = container.getBoundingClientRect();
    const containerX = containerInfo.x;
    const containerY = containerInfo.y;

    const X_MARGIN = heartRadius * 2;
    const Y_MARGIN = heartHeight + 40;

    let x = getRandomNum(X_MARGIN, canvas.width - (X_MARGIN));
    let y = getRandomNum(Y_MARGIN, canvas.height - (Y_MARGIN));

    while(x >= containerX && x <= containerX + container.clientWidth + X_MARGIN && y >= containerY && y <= containerY + container.clientHeight + Y_MARGIN) {
        x = getRandomNum(X_MARGIN, canvas.width - (X_MARGIN));
        y = getRandomNum(Y_MARGIN, canvas.height - (Y_MARGIN));
    }

    hearts.push(new Heart(x, y, heartHeight, heartRadius, {x: 0, y: 0}));
    setTimeout(spawnHeart, MIN_TIME);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    scaleHeartSize();
});

addEventListener('click', e => {
    const HEART_COUNT = 5;
    let angle = (Math.PI*2)/HEART_COUNT;
    for(let i = 0; i < HEART_COUNT; ++i) {
        hearts.push(new Heart(e.clientX, e.clientY, 15, 5, {
            x: Math.cos(angle * i),
            y: Math.sin(angle * i)
        }));
    }
});

document.querySelector('.feature-hint').addEventListener('click', _ => {
    document.querySelector('.feature-hint').remove();
});

animate();
setTimeout(init, 1000);
setTimeout(spawnHeart, 4000);

