const canvas = document.getElementById('chloe-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let hearts = [];
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

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.draw();
        heart.update();
    });
}

animate();

