const canvas = document.getElementById("laser-trace");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: null,
    y: null,
}

let mouseDown = false;

class SparkleEffect {
    constructor() {
        this.pos = {
            x: mouse.x,
            y: mouse.y,
        };

        let randomAngle = (Math.random() * (180))/180 * Math.PI;
        this.velocity = {
            x: Math.cos(randomAngle) * (Math.floor(Math.random() * 2) % 2 == 0 ? 1 : -1),
            y: Math.sin(randomAngle) * 10
        };
    }

    draw(lastPos = this.pos) {
        ctx.beginPath();

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(this.pos.x, this.pos.y);
        ctx.stroke();

        ctx.closePath();
    }

    update() {
        const lastPos = {
            x: this.pos.x,
            y: this.pos.y,
        };

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.draw(lastPos);
        console.log(this.pos);
    }
}

class Laser {
}

addEventListener("mousedown", () => mouseDown = true );
addEventListener("mouseup", () => mouseDown = false );
addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const sparks = [];

function animateSparks() {
    sparks.forEach(spark => spark.update());
}

function animate() {
    requestAnimationFrame(animate);

    if (mouseDown)
        sparks.push(new SparkleEffect());
    animateSparks();
}

animate();

