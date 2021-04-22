const addBtn = document.querySelector(".addBtn")
const quotesList = document.querySelector(".quotesList")
const upCont = document.querySelector(".updateCont")
let upSelect = document.querySelector(".selection select")
let newInputs = document.querySelectorAll(".newInput input")
let submitBtn = document.querySelector(".btns .submit")
let cancelBtn = document.querySelector(".btns .cancel")
let toUpdates = []

const init = () => {
    if (localStorage.getItem("quotesCount") === null) {
        localStorage.setItem("quotesCount", "1")
    }

    renderQuotes()
}

const renderQuotes = () => {
    let num = Number(localStorage.getItem("quotesCount"))
    for (let i = 1; i <= num; i++) {
        if (localStorage.getItem(`quote${i}`) !== null && localStorage.getItem(`quote${i}`) !== "null") {
            let quoteComp = `
                <li class="quoteComponent comp${i}">
                <div class="quoteInfo">
                <p class="quote">
                <span class="update">${localStorage.getItem(`quote${i}`)}</span>
                </p>
                <p class="book">
                from: <span class="update">${localStorage.getItem(`book${i}`)}</span>
                </p>
                <p class="author">
                written by: <span class="update">${localStorage.getItem(`author${i}`)}</span>
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
    let quoteNum = Number(localStorage.getItem("quotesCount"))

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
        localStorage.setItem(`quote${quoteNum}`, quote)
        localStorage.setItem(`book${quoteNum}`, book)
        localStorage.setItem(`author${quoteNum}`, author)
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
                localStorage.removeItem(`quote${num}`)
                localStorage.removeItem(`book${num}`)
                localStorage.removeItem(`author${num}`)
                btn.parentNode.parentNode.remove()
            }
        })
    })
}

addBtn.addEventListener("click", () => {
    let prompts = getQuoteInfo()
    let quotes = Number(localStorage.getItem("quotesCount"))

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
        localStorage.setItem("quotesCount", quotes.toString())
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
    localStorage.setItem(`quote${num}`, toUpdates[0].innerText)
    localStorage.setItem(`book${num}`, toUpdates[1].innerText)
    localStorage.setItem(`author${num}`, toUpdates[2].innerText)
    upCont.classList.add("inactive")
})

cancelBtn.addEventListener("click", () => upCont.classList.add("inactive"))

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        upCont.classList.add("inactive")
    }
})

updateBtns()
init()
