const birthdayWords = document.querySelectorAll('.birthday-word');

function setAnimations(enlargeDuration) {
    let subDur = 0;

    for (let i = 0; i < birthdayWords.length; ++i) {
        setTimeout(() => {
            birthdayWords[i].style.animation = `enlarge ${enlargeDuration}s cubic-bezier(0.5, 0.6, 0.7, 0.65) forwards, glow 1s ease-in infinite`;
        }, (subDur - i) * 1000);

        subDur += enlargeDuration;
    }
}

// will play animation after half a second
setTimeout(() => {
    setAnimations(2);
}, 500);

