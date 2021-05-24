const canvas = document.getElementById('triangle')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10
}
const MAX_LINE_LENGTH = 150
const MIN_LINE_LENGTH = 60
const ROTATE_SPEED = 0.025

let lineLength = MAX_LINE_LENGTH
let hue = 0
let angle = 0

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    setLineLength()
})

function setLineLength() {
    lineLength = canvas.width / 10
    if (lineLength < MIN_LINE_LENGTH)
        lineLength = MIN_LINE_LENGTH

    if (lineLength > MAX_LINE_LENGTH)
        lineLength = MAX_LINE_LENGTH

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // change initial triangle size
    triangles[0] = new Triangle({
        pos: {
            x: canvas.width / 2,
            y: canvas.height / 2,
        },
        lineLength: lineLength,
        rotateSpeed: ROTATE_SPEED,
        shrinkRate: 0,
        followMouse: true,
    })
}

function toRadian(degree) {
    return (degree / 180) * Math.PI
}

class Triangle {
    constructor(props) {
        this.pos = props.pos
        this.lineLength = props.lineLength
        this.rotateSpeed = props.rotateSpeed
        this.shrinkRate = props.shrinkRate
        this.angle = angle
        this.followMouse = props.followMouse || false
    }

    draw() {
        const p1 = {
            x: this.pos.x + Math.cos(this.angle) * this.lineLength,
            y: this.pos.y + Math.sin(this.angle) * this.lineLength,
        }
        const p2 = {
            x: this.pos.x + Math.cos(this.angle + toRadian(120)) * this.lineLength,
            y: this.pos.y + Math.sin(this.angle + toRadian(120)) * this.lineLength,
        }
        const p3 = {
            x: this.pos.x + Math.cos(this.angle + toRadian(240)) * this.lineLength,
            y: this.pos.y + Math.sin(this.angle + toRadian(240)) * this.lineLength,
        }

        ctx.strokeStyle = `hsl(${hue}, 80%, 50%)`
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
        this.lineLength -= this.shrinkRate

        if (!this.followMouse) {
            return
        }

        const delay = 0.05
        this.pos.x += (mouse.x - this.pos.x) * delay
        this.pos.y += (mouse.y - this.pos.y) * delay
    }
}

const triangles = []

function refresh() {
    requestAnimationFrame(refresh)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    triangles.forEach((triangle, i) => {
        triangle.draw()
        triangle.update()
        if (triangle.lineLength <= 5)
            triangles.splice(i, 1)
    })
    angle += ROTATE_SPEED
    hue += 1
}

// initial static triangle
triangles.push(
    new Triangle({
        pos: {
            x: mouse.x,
            y: mouse.y,
        },
        lineLength: lineLength,
        rotateSpeed: ROTATE_SPEED,
        shrinkRate: 0,
        followMouse: true,
    })
)

function spawnTriangle() {
    triangles.push(
        new Triangle({
            pos: {
                x: triangles[0].pos.x,
                y: triangles[0].pos.y,
            },
            lineLength: lineLength,
            rotateSpeed: ROTATE_SPEED,
            shrinkRate: lineLength / 50,
        })
    )
    if(Math.hypot((mouse.y - triangles[0].pos.y), (mouse.x - triangles[0].pos.x)) > mouse.radius)
        setTimeout(spawnTriangle)
}

['mousemove', 'touchmove'].forEach((triggerEvent) => {
    addEventListener(triggerEvent, (e) => {
        mouse.x = e.clientX ? e.clientX : e.touches[0].pageX
        mouse.y = e.clientY ? e.clientY : e.touches[0].pageY
        spawnTriangle()
    })
})

refresh()
