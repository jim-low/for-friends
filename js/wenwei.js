const canvas = document.getElementById('star-canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
    x: 0,
    y: 0
}

document.addEventListener('mousemove', e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})

class Kirby {

    constructor() {
        const width = 80
        const height = 80

        this.img = new Image()
        this.img.src = './../images/kirby/kirby-slep.png'
        this.width = width
        this.height = height

        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height / 2 - this.height / 2 - 50
        }
        this.canClick = false

        this.animated = false
        this.frame = 1
        this.maxFrame = 8

        this.text = "wake me up poyo"

        class Cake {
            constructor() {
                this.img = new Image()
                this.img.src = '../images/kirby/cake.png'

                this.scaleFactor = 0.7

                this.width = 80
                this.height = 80
                this.position = {
                    x: canvas.width / 2 - this.width / 2,
                    y: canvas.height / 2 - this.height / 2 - height - 5
                }

                console.log()
            }

            render() {
                ctx.drawImage(this.img, this.position.x, this.position.y, this.width * this.scaleFactor, this.height * this.scaleFactor)
            }
        }
        this.cake = new Cake()
    }

    setImage(path) {
        this.img.src = path
    }

    setImageSize(width, height) {
        this.width = width;
        this.height = height;
    }

    drawCake() {
        if (this.animated) {
            this.cake.render()
        }
    }

    drawKirby() {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
    }

    drawText() {
        ctx.font = '1.1em sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(this.text, canvas.width / 2, canvas.height / 2 + 20)

        if (!this.animated) return

        ctx.font = '0.85em sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('*kirby otw to giv cake', canvas.width / 2 + this.width + 5, canvas.height / 10 * 4)
    }

    animateKirby() {
        if (!this.canClick) return
    }

    indicateClick() {
        if (mouse.x >= this.position.x && mouse.x <= this.position.x + this.width && mouse.y >= this.position.y && mouse.y <= this.position.y + this.height) {
            document.body.style.cursor = 'pointer'
            this.canClick = true
        }
        else {
            document.body.style.cursor = 'auto'
            this.canClick = false
        }
    }

    startAnimation() {
        if (this.animated) return
        this.animated = true

        setInterval(() => {

            ++this.frame
            if (this.frame >= this.maxFrame) this.frame = 1
        }, 70);
    }

    update() {
        this.indicateClick();

        if (this.animated) {
            this.img.src = `./../images/kirby/kirby-running-animation/kirby run ${this.frame}.png`
            this.text = 'Happy Birthday, Wen Wei!'
        }
    }

    render() {
        this.drawKirby()
        this.drawCake()

        this.drawText()
    }
}


class Star {
    constructor(position, size) {
        this.position = {
            x: position.x,
            y: position.y
        }
        this.size = size
        this.opacity = 1.0
        this.fadeSpeed = 0.01
    }

    update() {
        // spin it
        this.opacity -= this.fadeSpeed // fade it
    }

    drawStar() {
        ctx.strokeStyle = `rgba(247, 228, 97, ${this.opacity})`
        ctx.lineWidth = this.size

        const spikes = 5

        const angleIncrement = (Math.PI * 2) / spikes

        ctx.beginPath()
        ctx.moveTo(this.position.x, this.position.y)

        let startPoint = { x: 0, y: 0 }
        for (let i = 0; i < spikes; ++i) {
            const angle = i * angleIncrement

            const outerX = this.position.x + this.size * Math.cos(angle)
            const outerY = this.position.y + this.size * Math.sin(angle)
            if (i == 0) {
                startPoint.x = outerX
                startPoint.y = outerY
            }
            ctx.lineTo(outerX, outerY)

            const innerX = this.position.x + (this.size / 2) * Math.cos(angle)
            const innerY = this.position.y + (this.size / 2) * Math.sin(angle)
            ctx.lineTo(innerX, innerY)
        }
        ctx.lineTo(startPoint.x, startPoint.y)

        ctx.closePath()
        ctx.stroke()
    }

    render() {
        this.drawStar()
    }
}

const starSize = 5
const stars = []
const kirby = new Kirby()

function checkEmptyStars() {
    for (let i = 0; i < stars.length; ++i) {
        const star = stars[i];
        if (star.opacity <= 0) {
            stars.splice(i, 1)
        }
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < stars.length; ++i) {
        const star = stars[i];
        star.update();
        star.render();
    }
    kirby.update()
    kirby.render()

    checkEmptyStars()
}
animate()

document.addEventListener('click', () => {
    stars.push(new Star(mouse, starSize))
    kirby.startAnimation()
})
