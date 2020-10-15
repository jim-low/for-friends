const addBtn = document.querySelector(".addBtn")
const quotesList = document.querySelector(".quotesList")
const upCont = document.querySelector(".updateCont")
let upSelect = document.querySelector(".selection select")
let newInputs = document.querySelectorAll(".newInput input")

const getQuoteInfo = () => {
	let quote = prompt("Enter quote")
	while (quote === "") {
		quote = prompt("Please enter a quote")
	}

	let book = prompt("Enter book")
	while (book === "") {
		book = prompt("Please enter a book")
	}

	let author = prompt("Enter author")
	while (author === "") {
		author = prompt("Please enter the author")
	}

	return [quote, book, author]
}

const updateBtns = () => {
	document.querySelectorAll(".up-rm .upBtn").forEach(btn => {
		btn.addEventListener("click", () => {
			upCont.classList.remove("inactive")
			upSelect.addEventListener("change", () => getUpdateInfo(btn, upSelect.value))
		})
	})

	document.querySelectorAll(".up-rm .rmBtn").forEach(btn => {
		btn.addEventListener("click", () => {
			if (confirm("Confirm action?")) {
				btn.parentNode.parentNode.remove()
			}
		})
	})
}

addBtn.addEventListener("click", () => {
	let prompts = getQuoteInfo()
	console.log(prompts);

	if (!prompts.includes(null)) {
		let quoteComp = `
			<li class="quoteComponent">
				<p class="quoteInfo">
					<span class="quote">"${prompts[0]}"</span>
					<span class="book">from: ${prompts[1]}</span>
					<span class="author">written by: ${prompts[2]}</span>
					<span class="edited inactive">last edited: </span>
				</p>
				<div class="up-rm">
					<button class="upBtn">update</button>
					<button class="rmBtn">remove</button>
				</div>
			</li>
			`

		quotesList.innerHTML += quoteComp
		updateBtns()
	}

})

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		upCont.classList.add("inactive")
	}
})

updateBtns()