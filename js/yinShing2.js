const birthdayWords = document.querySelectorAll('.birthday-word');

function setAnimations(enlargeDuration) {
    let subDur = 0;

    for (let i = 0; i < birthdayWords.length; ++i) {
        setTimeout(() => {
            birthdayWords[i].style.animation = `enlarge ${enlargeDuration}s cubic-bezier(0.5, 0.6, 0.7, 0.65) forwards, glow 1s ease-in infinite`;
        }, (subDur - i) * 1000);

        subDur += enlargeDuration;
    }
}

// will play animation after half a second
setTimeout(() => {
    setAnimations(2);
}, 500);

// start of balls animation code
const canvas = document.getElementById('balls-canvas');
const ctx = canvas.getContext('2d');

const MAX_RADIUS = 20;
const MIN_RADIUS = 10;
const MAX_SPEED = 8;
const MIN_SPEED = 3;
const colors = [
    'rgba(255, 135, 135, 0.7)',
    'rgba(248, 238, 87, 0.7)',
    'rgba(75, 232, 245, 0.7)',
    'rgba(250, 129, 248, 0.7)',
    'rgba(252, 173, 107, 0.7)',
];

const balls = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.dx = (Math.random() * MAX_SPEED) + MIN_SPEED;
        this.dx *= Math.floor(Math.random() * 2) % 2 == 0 ? 1 : -1;

        this.dy = (Math.random() * MAX_SPEED) + MIN_SPEED;
        this.dy *= Math.floor(Math.random() * 2) % 2 == 0 ? 1 : -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    bounce() {
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0)
            this.dx *= -1;

        if(this.y + this.radius > canvas.height || this.y - this.radius < 0)
            this.dy *= -1;

        this.x += this.dx;
        this.y += this.dy;
    }

    update() {
        this.bounce();
        this.draw();
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ball.draw();
        ball.update();
    });
}

canvas.addEventListener('click', e => {
    let x = e.clientX;
    let y = e.clientY;
    let radius = Math.floor(Math.random() * MAX_RADIUS) + MIN_RADIUS;
    balls.push(new Ball(x, y, radius));
    console.log(balls);
});

animate();

