const c = document.getElementById('oscillation')
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined
}

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
});

