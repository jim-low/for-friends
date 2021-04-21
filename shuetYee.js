let input = document.querySelectorAll(".form input");
let spanText = document.querySelectorAll(".surprise-box .heading span");
let formBox = document.querySelector(".form");
let surpriseBox = document.querySelector(".surprise-box");
let colors = ["#00cec9","#f1c40f","#fdcb6e","#be2edd","#20bf6b","#48dbfb"];
let name = input[0];
let age = input[1];
const validUser = /shuet/gi;

const verification = () => {
    if(name.value.match(validUser)){
        if(age.value === "18"){
            alert("time for a surprise");
            surprise();
        }else if(age.value === "" || age.value === " "){
            alert("Please enter a valid age");
        }else {
            alert("Are you sure?");
            age.value = "";
        }
    }else if(name.value === "" || name.value === " "){
        alert("Please enter your name.");
    }else {
        alert("Invalid User");
        alert("Please refrain from spoiling the surprise.");
        name.value = "";
        age.value = "";
    }
}

const surprise = () => {
    formBox.style.display = "none";
    document.body.style.backgroundColor = "#ff7675";
    surpriseBox.style.display = "block";
    setInterval(() => {
        for(var i = 0; i < spanText.length; i++){
            spanText[i].style.color = colors[Math.floor(Math.random() * colors.length)];
        }
    }, 100);
}

document.addEventListener("keydown", e => {
    if(e.which == 13){
        verification();
    }
})
