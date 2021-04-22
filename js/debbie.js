const cardFront = document.querySelector('.front')
const innerPages = document.querySelectorAll('.inner .page')
let phoneMedia = window.matchMedia("(max-width: 480px)")

if(phoneMedia.matches) {
    cardFront.addEventListener('click', () => { // opening the card
        cardFront.style.animation = "moveDown .5s ease-out forwards"
        setTimeout(() => {
            cardFront.style.display = "none"
            innerPages[0].parentNode.style.display = "flex"
            innerPages[0].style.animation = "moveUp .5s ease-out forwards"
            innerPages[1].style.display = "initial"
        }, 600)
    })

    innerPages.forEach(page => {
        page.addEventListener('click', () => { // closing the card
            innerPages[1].style.display = "none"
            innerPages[0].style.animation = "moveDown .5s ease-out forwards"
            setTimeout(() => {
                cardFront.style.display = "flex"
                cardFront.style.animation = "moveUp .5s ease-out forwards"
                innerPages[0].parentNode.style.display = "none"
            }, 600)
        })
    })
}else {
    cardFront.addEventListener('click', () => { // opening the card
        cardFront.style.animation = "moveRight .5s ease-out forwards"
        setTimeout(() => {
            cardFront.style.display = "none"
            innerPages[0].parentNode.style.display = "flex"
            innerPages[0].style.animation = "moveLeft .5s ease-out forwards"
        }, 600)
    })

    innerPages.forEach(page => {
        page.addEventListener('click', () => { // closing the card
            innerPages[0].style.animation = "moveRight .5s ease-out forwards"
            setTimeout(() => {
                cardFront.style.display = "flex"
                cardFront.style.animation = "moveLeft .5s ease-out forwards"
                innerPages[0].parentNode.style.display = "none"
            }, 600)
        })
    })
}


