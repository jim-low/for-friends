const canvas = document.getElementById("laser-trace");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lastMouse = {
    x: null,
    y: null,
}

const currMouse = {
    x: null,
    y: null,
}

let mouseDown = false;

class SparkleEffect {
    constructor() {
        this.pos = {
            x: currMouse.x,
            y: currMouse.y,
        };

        let randomAngle = (Math.random() * (180))/180 * Math.PI;
        this.velocity = {
            x: Math.cos(randomAngle) * (Math.floor(Math.random() * 2) % 2 == 0 ? 1 : -1) * 3,
            y: Math.sin(randomAngle) * 10
        };

        this.opacity = 1;
    }

    draw(lastPos = this.pos) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        ctx.save()
        ctx.globalAlpha = this.opacity;

        ctx.beginPath();

        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(this.pos.x, this.pos.y);
        ctx.stroke();

        ctx.closePath();
        ctx.restore();
    }

    update() {
        const lastPos = {
            x: this.pos.x,
            y: this.pos.y,
        };

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.opacity -= 0.05;

        this.draw(lastPos);
    }
}

class Laser {
    constructor(laserWidth, laserColor) {
        this._laserWidth = laserWidth;
        this._laserColor = laserColor;
        this._startPos = {
            x: lastMouse.x,
            y: lastMouse.y,
        };
        this._endPos = {
            x: currMouse.x,
            y: currMouse.y,
        };
        this.opacity = 1;
        this.fadeStart = false;

        this.fade(100);
    }

    draw() {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = this._laserWidth;
        ctx.strokeStyle = this._laserColor;

        ctx.save();
        ctx.globalAlpha = this.opacity;

        ctx.moveTo(this._startPos.x, this._startPos.y);
        ctx.lineTo(this._endPos.x, this._endPos.y);
        ctx.stroke();

        ctx.restore();
    }

    update() {
        if (this.fadeStart)
            this.opacity -= 0.025;
        this.draw();
    }

    fade(secondsTillFade) {
        setTimeout(() => {
            this.fadeStart = true;
            console.log("IT IS TIME TO FADE MY BOISSSSSSSSS");
        }, secondsTillFade);
    }
}

addEventListener("mousedown", () => mouseDown = true );
addEventListener("mouseup", () => mouseDown = false );
addEventListener("mousemove", (e) => {
    lastMouse.x = currMouse.x || e.clientX;
    lastMouse.y = currMouse.y || e.clientY;

    currMouse.x = e.clientX;
    currMouse.y = e.clientY;
});

const sparks = [];
const laserPositions = [];

function animateEffects() {
    laserPositions.forEach((laser, i) => {
        laser.update();
        if (laser.opacity < 0.1)
            laserPositions.splice(i, 1);
    });

    sparks.forEach((spark, i) => {
        spark.update();
        if (spark.opacity < 0.1)
            sparks.splice(i, 1);
    });
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mouseDown) {
        laserPositions.push(new Laser(5, "#42C0FB"));
        sparks.push(new SparkleEffect());
    }
    animateEffects();
    console.log(laserPositions.length);
}

animate();

