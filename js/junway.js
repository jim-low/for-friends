let i = 0;
let speed = 50;
let header = document.querySelector(".birthday .header");
let para1 = document.querySelector(".birthday .para1");
let para2 = document.querySelector(".birthday .para2");
let para3 = document.querySelector(".birthday .para3");
let span = document.querySelector(".birthday .creds");
let headerText = "happy birthday Jun Way";
let para1Text = "If you are still working then take care and stay safe bro.";
let para2Text = "All the best to you in handling your life decisions as well as your personal relationships.";
let para3Text = "Don't always bullshit already, but if you do then give it your best.";
let spanText = "hope you like this little project that i made for you - Jim";

document.querySelector(".rick-roll").addEventListener("click", () => {
    alert("you just got rick rolled");
    window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
})

document.querySelector(".container1 button").addEventListener("click", () => {
    document.querySelector(".rick-roll").style.display = "none";
    document.querySelector(".container1").style.display = "none";
    document.querySelector(".birthday").style.display = "block";
    document.querySelector(".birthday").style.position = "absolute";
    surprise();
})

const surprise = () => {
    typeHeader();
}

const typeHeader = () => {
    if(i < headerText.length){
        header.innerHTML += headerText.charAt(i);
        i++
        setTimeout(typeHeader, speed);
    }else {
        i = 0;
        typePara1();
    }
}

const typePara1 = () => {
    if(i < para1Text.length){
        para1.innerHTML += para1Text.charAt(i);
        i++
        setTimeout(typePara1, speed);
    }else {
        i = 0;
        typePara2();
    }
}

const typePara2 = () => {
    if(i < para2Text.length){
        para2.innerHTML += para2Text.charAt(i);
        i++
        setTimeout(typePara2, speed);
    }else {
        i = 0;
        typePara3();
    }
}

const typePara3 = () => {
    if(i < para3Text.length){
        para3.innerHTML += para3Text.charAt(i);
        i++
        setTimeout(typePara3, speed);
    }else {
        i = 0;
        typeSpan();
    }
}

const typeSpan = () => {
    if(i == 0){
        span.innerHTML += "\"";
    }

    if(i < spanText.length){
        span.innerHTML += spanText.charAt(i);
        i++
        setTimeout(typeSpan, speed);
    }

    if(i == spanText.length){
        span.innerHTML += "\'";
    }
}
