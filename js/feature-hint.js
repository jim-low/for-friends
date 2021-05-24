const featureHintElement = document.getElementById('feature-hint')

featureHintElement.addEventListener('click', () => {
    featureHintElement.remove()
})

function writeHint(message = 'click or press around the screen for a surprise') {
    featureHintElement.innerHTML = ('P.S.: ' + message)
    featureHintElement.append(document.createElement('br'))
    featureHintElement.innerHTML += 'click this message to remove it'
}

writeHint()

