const canvas = document.getElementById('triangle')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})

function toRadian(degree) {
    return degree/180 * Math.PI
}

class Triangle {
    constructor(props) {
        this.pos = props.pos
        this.lineLength = props.lineLength
        this.color = props.color
        this.rotateSpeed = props.rotateSpeed
        this.angle = 0
    }

    draw() {
        const p1 = {
            x: mouse.x + Math.cos(this.angle) * this.lineLength,
            y: mouse.y + Math.sin(this.angle) * this.lineLength,
        }
        const p2 = {
            x: mouse.x + Math.cos(this.angle + (toRadian(120))) * this.lineLength,
            y: mouse.y + Math.sin(this.angle + (toRadian(120))) * this.lineLength,
        }
        const p3 = {
            x: mouse.x + Math.cos(this.angle + (toRadian(240))) * this.lineLength,
            y: mouse.y + Math.sin(this.angle + (toRadian(240))) * this.lineLength,
        }

        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.lineTo(p3.x, p3.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.closePath()
        ctx.stroke()
    }

    update() {
        this.angle += this.rotateSpeed
    }
}

const triangle = new Triangle({
    pos: {
        x: mouse.x,
        y: mouse.y,
    },
    lineLength: 150,
    rotateSpeed: 0.025,
    color: 'blue'
})

function refresh() {
    requestAnimationFrame(refresh)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    triangle.draw()
    triangle.update()
}

refresh()

