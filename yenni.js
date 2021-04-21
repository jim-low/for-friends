let btn = document.querySelector(".btn")
let surprise = document.querySelector(".surprise")
let angle = 0

btn.addEventListener("click", () => {
    btn.style.animation = "fadeOut .75s linear forwards"
    surprise.style.display = "flex"
    surprise.style.animation = "fadeIn 3s ease-in forwards"
})

setInterval(() => {
    if(angle > 359){
        angle = 0
    }
    angle += 10
    surprise.style.cssText += `background: linear-gradient(${angle}deg, rgba(255,192,203,1) 0%,  rgba(214,126,230, 1) 50%, rgba(255,192,203,1) 100%);`
}, 30);
