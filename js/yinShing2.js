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

const MAX_SPEED = 50;
const MIN_SPEED = 10;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Ball {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;

        this.dx = (Math.random() * MAX_SPEED) + MIN_SPEED;
        this.dy = (Math.random() * MAX_SPEED) + MIN_SPEED;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        context.fill();
        ctx.stroke();
    }

    move() {
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0)
            this.dx *= -1;

        if(this.y + this.radius > canvas.height || this.y - this.radius < 0)
            this.dy *= -1;

        this.x += this.dx;
        this.y += this.dy;
    }

    update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.move();
        this.draw();
    }
}

