const canvas = document.getElementById("downfall");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle {
    constructor(pos, radius) {
        this.pos = pos;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
}

class Sun extends Circle {
    constructor(pos, radius, noOfTriangle) {
        super(pos, radius);
        this.noOfTriangle = noOfTriangle;
    }

    draw() {
        super.draw();
        this.surroundWithTriangles();
    }

    // 1. get the angle distributed to each corner
    // 2. draw triangle and rotate relative to positional angle
    // 3. color the triangle
    surroundWithTriangles() {
        const angle = Math.PI * 2 / this.noOfTriangle;
        for (let i = 0; i < this.noOfTriangle; ++i) {
            new Triangle({
                x: this.pos.x + Math.cos(angle) * this.radius,
                y: this.pos.y + Math.sin(angle) * this.radius,
            }, 50, 10, angle * i).draw();
        }
    }
}

class Triangle {
    constructor(pos, height, base, angle) {
        this.pos = pos;
        this.height = height;
        this.base = base;
        this.angle = angle;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.pos.x + this.angle * this.base, this.pos.y + this.angle * this.height);
        ctx.lineTo(this.pos.x * this.base, this.pos.y * this.base - this.base);
        ctx.lineTo(this.pos.x * this.base, this.pos.y * this.base + this.base);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
}

function refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(refresh);
}

refresh();

