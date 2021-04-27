const canvas = document.getElementById('chloe-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Heart {
    constructor(x, y, size, color, velocity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.radius = Math.hypot(this.size, this.size)/2;
        this.velocity = velocity;

        this.color = color;
        this.opacity = 1;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
        ctx.beginPath();

        ctx.moveTo(this.x, this.y);

        ctx.lineTo(this.x + this.size, this.y - this.size);
        ctx.lineTo(this.x, this.y - (this.size*2));
        ctx.lineTo(this.x - this.size, this.y - (this.size*2) + this.size);
        ctx.lineTo(this.x, this.y);
        ctx.fill();

        ctx.arc(this.x-(this.size/2), this.y-(3*this.size)/2, this.radius, 0, Math.PI*2);
        ctx.arc(this.x+(this.size/2), this.y-(3*this.size)/2, this.radius, 0, Math.PI*2);
        ctx.fill();

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

