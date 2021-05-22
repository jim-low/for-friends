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

