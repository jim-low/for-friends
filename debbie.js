const cardFront = document.querySelector('.front')
const innerPages = document.querySelectorAll('.inner .page')

cardFront.addEventListener('click', () => {
    cardFront.style.animation = "moveRight .5s ease-out forwards"
    setTimeout(() => {
        cardFront.style.display = "none"
        innerPages[0].parentNode.style.display = "flex"
        innerPages[0].style.animation = "moveLeft .5s ease-out forwards"
    }, 510)
})

innerPages.forEach(page => {
    page.addEventListener('click', () => {
        innerPages[0].style.animation = "moveRight .5s ease-out forwards"
        setTimeout(() => {
            cardFront.style.display = "flex"
            cardFront.style.animation = "moveLeft .5s ease-out forwards"
            innerPages[0].parentNode.style.display = "none"
        }, 600)
    })
})

