let card = document.getElementById("card")
let leftBtn = document.querySelector(".left-btn")
let rightBtn = document.querySelector(".right-btn")
let pageView = 1
let pageContent = [
	{
		title: "birthday card",
		para: "From: Jim <br> To: Bithiah"
	},
	{
		title: "part 1",
		para: "Happy Birthday Bithiah! This is just another typical birthday wish to you so i wish you all the best to your future, keep learning, keep studying and keep persevering through life even though you may experience more downs than ups you just have to keep pushing through it."
	},
	{
		title: "part 2",
		para: "Remember that not everything stays the way it is now and that applies to both sides of life be it happy or sad, so be strong and be proud that you've made it this far and you know you can go further."
	},
	{
		title: "part 3",
		para: "\"Hope you are doing well, Bithiah. This is my attempt at a personal project for your birthday. Hope you like it!\" <br><span>- Jim</span>"
	}
]

let NUM_OF_PAGES = pageContent.length

for(let i = 0; i < NUM_OF_PAGES; i++){
	let cardStructure = 
		`
		<div class="card card${i + 1}">
			<div class="heading">
				<h2>
					${pageContent[i].title}
				</h2>
			</div>
			<div class="para">
				<p>
					${pageContent[i].para}
				</p>
			</div>
		</div>
		`
	card.innerHTML += cardStructure
}

const checkPageNum = () => {
	document.querySelectorAll(".card").forEach(card => {
		let currPage = Number(card.classList.item(1).toString().slice(4))
		if(currPage === pageView) {
			card.style.display = "block"
		}else {
			card.style.display = "none"
		}
	})
}

const prevPage = () => {
	pageView -= 1
	if(pageView <= 0) pageView = 1
	checkPageNum()
}

const nextPage = () => {
	pageView += 1
	if(pageView > NUM_OF_PAGES) pageView = NUM_OF_PAGES
	checkPageNum()
}

leftBtn.addEventListener("click", () => {
	prevPage()
})

rightBtn.addEventListener("click", () => {
	nextPage()
})

document.addEventListener("keydown", (e) => {
	if(e.which === 37) {
		prevPage()
	}else if (e.which === 39) {
		nextPage()
	}
})

setInterval(() => {
	if(pageView === 1){
		leftBtn.style.cssText = "opacity: 0; pointer-events: none;"
	}else if (pageView === pageContent.length){
		rightBtn.style.cssText = "opacity: 0; pointer-events: none;"
	}else {
		leftBtn.style.cssText = "opacity: 1; pointer-events: visible;"
		rightBtn.style.cssText = "opacity: 1; pointer-events: visible;"
	}
}, 10);

checkPageNum()