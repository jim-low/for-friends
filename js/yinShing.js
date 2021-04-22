function revealBox2(){
    document.getElementById("box2").innerHTML = "Wait, I think this is the right button." + "<br>" +
        "<button onclick=\"revealBox3()\">Click me!</button>";
}

function revealBox3(){
    document.getElementById("box3").innerHTML = "No wait, I think the right button is here." +
        "<br>" +
        "<button onclick=\"revealBox4()\">Click me!</button>";
}

function revealBox4(){
    document.getElementById("box4").innerHTML = "Maybe it's over here??" +
        "<br>" +
        "<button onclick=\"revealBox5()\">Click me!</button>";
}

function revealBox5(){
    document.getElementById("box5").innerHTML = "Or the right button could be here." +
        "<br>" +
        "<button onclick=\"revealBox6()\">Click me!</button>";
}

function revealBox6(){
    document.getElementById("box6").innerHTML = "Try this button, should be close." +
        "<br>" +
        "<button onclick=\"revealFinalBox()\">Click me!</button>";
}

function revealFinalBox(){
    document.getElementById("final-box").innerHTML = "This here should be the right button." +
        "<br>" +
        "<button onclick=\"surpriseTime()\">Click me!</button>";
}

function surpriseTime(){
    document.getElementById("container").innerHTML =
        "<p class=\"para1\">Happy Birthday Yin Shing!!!</p>" +
        "<br>" +
        "<span class=\"para2\">Wishing you the best in college as well as in your journey through life.</span>" +
        "<br>" +
        "<span class=\"para3\">Keep in mind that the greatest investment you can make is yourself.</span>" +
        "<br>" +
        "<span class=\"para4\">If you need any help at all, just give me a call. <p style=\"font-style: italic;\">- Jim</p></span>";

    document.body.style.backgroundColor = "pink";
    document.body.style.backgroundSize = "1370px 700px";
}
