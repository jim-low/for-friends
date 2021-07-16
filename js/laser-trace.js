const canvas = document.getElementById("laser-trace");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colorInput = document.querySelector(".laser-color");
const fadeTimeInput = document.querySelector(".fade-time");

const lastMouse = {
    x: null,
    y: null,
}

const currMouse = {
    x: null,
    y: null,
}

let mouseDown = false;
let laserColor = "#42C0FB";
let laserFade = 3;

class SparkleEffect {
    constructor() {
        this.pos = {
            x: currMouse.x,
            y: currMouse.y,
        };

        const RAND_ANGLE = (Math.random() * (360))/180 * Math.PI;
        const FORCE = 7.25;
        this.velocity = {
            x: Math.cos(RAND_ANGLE) * FORCE * (Math.floor(Math.random() * 2) % 2 == 0 ? 1 : -1),
            y: Math.sin(RAND_ANGLE) * FORCE
        };

        this.opacity = 1;
    }

    draw(lastPos = this.pos) {
        ctx.strokeStyle = "#F29B2B";
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

        this.fade(laserFade * 1000);
    }

    draw() {
        ctx.lineJoin = "round";
        ctx.lineWidth = this._laserWidth;
        ctx.strokeStyle = this._laserColor;

        ctx.save();
        ctx.globalAlpha = this.opacity;

        ctx.beginPath();
        ctx.moveTo(this._startPos.x, this._startPos.y);
        ctx.lineTo(this._endPos.x, this._endPos.y);
        ctx.stroke();
        ctx.closePath();

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

fadeTimeInput.addEventListener("change", () => {
    laserFade = fadeTimeInput.value;
});

colorInput.addEventListener("change", () => {
    laserColor = colorInput.value;
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

function addEffects() {
    laserPositions.push(new Laser(5, laserColor));

    for (let i = 0; i < 5; ++i)
        sparks.push(new SparkleEffect());
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mouseDown)
        addEffects();

    animateEffects();
}

function setupTextAnimation() {
    const messageBox = document.getElementById("message");
    const message = messageBox.textContent;
    messageBox.innerText = null;

    for (let i = 0; i < message.length; ++i)
        messageBox.innerHTML += `<span class="effect">${message[i]}</span>`;

    const timer = setInterval(setAnimation, 150);
    let i = 0;
    function setAnimation() {
        const span = document.querySelectorAll("span.effect")[i];
        span.classList.add("amazingAnimationLmao");

        ++i;
        if (i == message.length)
            clearInterval(timer);
    }

}

animate();
setupTextAnimation();

