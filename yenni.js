let btn = document.querySelector(".btn")
let surprise = document.querySelector(".surprise")
let angle = 0

btn.addEventListener("click", () => {
	btn.style.animation = "fadeOut .75s linear forwards"
	surprise.style.display = "flex"
	surprise.style.animation = "fadeIn 3s ease-in forwards"
})

setInterval(() => {
	if(angle > 360){ 
		angle = 0
	}
	angle += 10
	surprise.style.cssText += `background: linear-gradient(${angle}deg, rgba(255,102,204,1) 0%, #dd85d7 50%, rgba(255,102,204,1) 100%);`
}, 10);