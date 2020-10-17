const addBtn = document.querySelector(".addBtn")
const quotesList = document.querySelector(".quotesList")
const upCont = document.querySelector(".updateCont")
let upSelect = document.querySelector(".selection select")
let newInputs = document.querySelectorAll(".newInput input")
let submitBtn = document.querySelector(".submitBtn button")
let toUpdates = []

const init = () => {
	if (sessionStorage.getItem("quotesCount") === null) {
		sessionStorage.setItem("quotesCount", "1")
	}

	renderQuotes()
}

const renderQuotes = () => {
	let num = Number(sessionStorage.getItem("quotesCount"))
	for (let i = 1; i <= num; i++) {
		if (sessionStorage.getItem(`quote${i}`) !== null && sessionStorage.getItem(`quote${i}`) !== "null") {
			let quoteComp = `
				<li class="quoteComponent comp${i}">
					<div class="quoteInfo">
						<p class="quote">
							<span class="update">${sessionStorage.getItem(`quote${i}`)}</span>
						</p>
						<p class="book">
							from: <span class="update">${sessionStorage.getItem(`book${i}`)}</span>
						</p>
						<p class="author">
							written by: <span class="update">${sessionStorage.getItem(`author${i}`)}</span>
						</p>
					</div>
					<div class="up-rm">
						<button class="upBtn">update</button>
						<button class="rmBtn">remove</button>
					</div>
				</li>
				`
			quotesList.innerHTML += quoteComp
			updateBtns()
		}
	}
}

const getQuoteInfo = () => {
	let quoteNum = Number(sessionStorage.getItem("quotesCount"))

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

	if(quote === null || book === null || author === null) {
		console.log(("do nothing lmao"));
	}else {
		sessionStorage.setItem(`quote${quoteNum}`, quote)
		sessionStorage.setItem(`book${quoteNum}`, book)
		sessionStorage.setItem(`author${quoteNum}`, author)	
	}

	return [quote, book, author]
}

const updateBtns = () => {
	document.querySelectorAll(".up-rm .upBtn").forEach(btn => {
		btn.addEventListener("click", () => {
			upSelect.value = "none"
			newInputs.forEach(input => {
				input.value = ""
				input.style.display = "none"
			})
			let comp = btn.parentNode.parentNode.querySelector(".quoteInfo")
			let quote = comp.querySelector(".quote .update")
			let book = comp.querySelector(".book .update")
			let author = comp.querySelector(".author .update")
			toUpdates = []
			toUpdates.push(quote)
			toUpdates.push(book)
			toUpdates.push(author)

			upCont.classList.remove("inactive")
			upSelect.addEventListener("change", () => {
				newInputs.forEach(input => input.style.display = "none")
				switch (upSelect.value) {
					case "quote":
						newInputs[0].style.display = "block"
						break
					case "book":
						newInputs[1].style.display = "block"
						break
					case "author":
						newInputs[2].style.display = "block"
						break
					case "all":
						newInputs.forEach(inp => inp.style.display = "block")
				}
			})
		})
	})

	document.querySelectorAll(".up-rm .rmBtn").forEach(btn => {
		btn.addEventListener("click", () => {
			if (confirm("Confirm action?")) {
				let num = Number(btn.parentNode.parentNode.classList[1].slice(4))
				sessionStorage.removeItem(`quote${num}`)
				sessionStorage.removeItem(`book${num}`)
				sessionStorage.removeItem(`author${num}`)
				btn.parentNode.parentNode.remove()
			}
		})
	})
}

addBtn.addEventListener("click", () => {
	let prompts = getQuoteInfo()
	let quotes = Number(sessionStorage.getItem("quotesCount"))

	if (!prompts.includes(null)) {
		let quoteComp = `
			<li class="quoteComponent comp${quotes}">
				<div class="quoteInfo">
					<p class="quote">
						<span class="update">${prompts[0]}</span>
					</p>
					<p class="book">
						from: <span class="update">${prompts[1]}</span>
					</p>
					<p class="author">
						written by: <span class="update">${prompts[2]}</span>
					</p>
				</div>
				<div class="up-rm">
					<button class="upBtn">update</button>
					<button class="rmBtn">remove</button>
				</div>
			</li>
			`
		quotesList.innerHTML += quoteComp
		quotes++
		sessionStorage.setItem("quotesCount", quotes.toString())
		updateBtns()
	}
})

submitBtn.addEventListener("click", () => {
	let num = Number(toUpdates[0].parentNode.parentNode.parentNode.classList[1].slice(4))
	for (let i = 0; i < toUpdates.length; i++) {
		if (newInputs[i].value !== "") {
			toUpdates[i].innerHTML = newInputs[i].value
		}
	}
	sessionStorage.setItem(`quote${num}`, toUpdates[0].innerText)
	sessionStorage.setItem(`book${num}`, toUpdates[1].innerText)
	sessionStorage.setItem(`author${num}`, toUpdates[2].innerText)
	upCont.classList.add("inactive")
})

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		upCont.classList.add("inactive")
	}
})

updateBtns()
init()