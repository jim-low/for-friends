//Utility functions
function correctAnswer(id){
    document.getElementById(id).innerHTML = "correct! &#10004;";
}

function sameAnswer(id){
    document.getElementById(id).innerHTML = "You've already typed this answer...";
}

function wrongAnswer(id){
    document.getElementById(id).innerHTML = "wrong!!! &#10060;";
}

function resetWrongAnswerPassage(id){
    document.getElementById(id).innerHTML = "";
}

function resetSameAnswerPassage(id){
    document.getElementById(id).innerHTML = "";
}

function checkAnswerProtocol(JSfirstAnswer, firstAnswer, JSsecondAnswer, secondAnswer, correctAnswerID, sameAnswerID, wrongAnswerID){
    if (JSfirstAnswer == firstAnswer){
        if (JSsecondAnswer == secondAnswer){
            correctAnswer(correctAnswerID);
        } else if (JSsecondAnswer == JSfirstAnswer){
            sameAnswer(sameAnswerID);
        } else {
            wrongAnswer(wrongAnswerID);
        }
    } else if (JSfirstAnswer == secondAnswer){
        if (JSsecondAnswer == firstAnswer){
            correctAnswer(correctAnswerID);
        } else if (JSsecondAnswer == JSfirstAnswer){
            sameAnswer(sameAnswerID);
        } else {
            wrongAnswer(wrongAnswerID);
        }
    } else {
        wrongAnswer(wrongAnswerID);
    }
}

//Easy questions
function checkAnswer1(){
    let answer1_1 = document.getElementById("easy-answer-1.1").value;
    let answer1_2 = document.getElementById("easy-answer-1.2").value;
    resetWrongAnswerPassage("incorrect-answer-1");
    resetSameAnswerPassage("same-answer-1");
    checkAnswerProtocol(answer1_1, "0", answer1_2, "3", "easy-check-1", "same-answer-1", "incorrect-answer-1");
}

function checkAnswer2(){
    let answer2 = document.getElementById("easy-answer-2").value;
    document.getElementById("incorrect-answer-2").innerHTML = "";
    if (answer2 == "1/25"){
        document.getElementById("easy-check-2").innerHTML = "correct! &#10004;";
    } else {
        document.getElementById("incorrect-answer-2").innerHTML = "wrong!!! &#10060;";
    }
}

function checkAnswer3(){
    let answer3 = document.getElementById("easy-answer-3").value;
    document.getElementById("incorrect-answer-3").innerHTML = "";
    if (answer3 == "99/100"){
        document.getElementById("easy-check-3").innerHTML = "correct! &#10004;";
    } else {
        document.getElementById("incorrect-answer-3").innerHTML = "wrong!!! &#10060;";
    }
}

function checkAnswer4(){
    let answer4 = document.getElementById("easy-answer-4").value;
    document.getElementById("incorrect-answer-4").innerHTML = "";
    if (answer4 == "3"){
        document.getElementById("easy-check-4").innerHTML = "correct! &#10004;";
    } else {
        document.getElementById("incorrect-answer-4").innerHTML = "wrong!!! &#10060;";
    }
}

function checkAnswer5(){
    let answer5 = document.getElementById("easy-answer-5").value;
    resetWrongAnswerPassage("incorrect-answer-5");
    if(answer5 == "8"){
        correctAnswer("easy-check-5");
    } else {
        wrongAnswer("incorrect-answer-5")
    }
}

function checkAnswer6(){
    let answer6 = document.getElementById("easy-answer-6").value;
    document.getElementById("incorrect-answer-6").innerHTML = "";
    if (answer6 == "-1/2") {
        document.getElementById("easy-check-6").innerHTML = "correct! &#10004;";
    } else {
        document.getElementById("incorrect-answer-6").innerHTML = "wrong!!! &#10060;";
    }
}

function checkAnswer7(){
    let answer7 = document.getElementById("easy-answer-7").value;
    document.getElementById("incorrect-answer-7").innerHTML = "";
    if (answer7 == "3"){
        document.getElementById("easy-check-7").innerHTML = "correct! &#10004;";
    } else {
        document.getElementById("incorrect-answer-7").innerHTML = "wrong!!! &#10060;";
    }
}

function checkAnswer8(){
    let answer8_1 = document.getElementById("easy-answer-8.1").value;
    let answer8_2 = document.getElementById("easy-answer-8.2").value;
    resetWrongAnswerPassage("incorrect-answer-8");
    resetSameAnswerPassage("same-answer-8");
    checkAnswerProtocol(answer8_1, "1/2", answer8_2, "8", "easy-check-8", "same-answer-8", "incorrect-answer-8")
}

function checkAnswer9(){
    let answer9_1 = document.getElementById("easy-answer-9.1").value;
    let answer9_2 = document.getElementById("easy-answer-9.2").value;
    resetWrongAnswerPassage("incorrect-answer-9");
    resetSameAnswerPassage("same-answer-9");
    checkAnswerProtocol(answer9_1, "3", answer9_2, "9", "easy-check-9", "same-answer-9", "incorrect-answer-9");
}

function checkAnswer10(){
    let answer10 = document.getElementById("easy-answer-10").value;
    document.getElementById("incorrect-answer-10").innerHTML = "";
    if (answer10 == "1/2"){
        document.getElementById("easy-check-10").innerHTML = "correct! &#10004;";
    } else {
        document.getElementById("incorrect-answer-10").innerHTML = "wrong!!! &#10060;";
    }
}

function checkAnswer11(){
    let answer11 = document.getElementById("easy-answer-11").value;
    document.getElementById("incorrect-answer-11").innerHTML = "";
    if (answer11 == "2.409") {
        document.getElementById("easy-check-11").innerHTML = "correct! &#10004;";
    } else {
        document.getElementById("incorrect-answer-11").innerHTML = "wrong!!! &#10060";
    }
}

function checkAnswer12(){
    let answer12_1 = document.getElementById("easy-answer-12.1").value;
    let answer12_2 = document.getElementById("easy-answer-12.2").value;
    resetWrongAnswerPassage("incorrect-answer-12");
    resetSameAnswerPassage("same-answer-12");
    checkAnswerProtocol(answer12_1, "2", answer12_2, "1/32", "easy-check-12", "same-answer-12", "incorrect-answer-12");
}
//HOTS questions
function checkAnswerA(){
    let answerA = document.getElementById("difficult-answer-a").value;
    resetWrongAnswerPassage("incorrect-answer-a");
    if (answerA == "100"){
        correctAnswer("difficult-check-1")
    } else {
        wrongAnswer("incorrect-answer-a");
    }
}

function checkAnswerB(){
    let answerB = document.getElementById("difficult-answer-b").value;
    resetWrongAnswerPassage("incorrect-answer-b");
    if (answerB == "0.927"){
        correctAnswer("difficult-check-2");
    } else {
        wrongAnswer("incorrect-answer-b");
    }
}

function checkAnswerC(){
    let answerC = document.getElementById("difficult-answer-c").value;
    resetWrongAnswerPassage("incorrect-answer-c");
    if (answerC == "2"){
        correctAnswer("difficult-check-3");
    } else {
        wrongAnswer("incorrect-answer-c");
    }
}

function checkAnswerD(){
    let answerD = document.getElementById("difficult-answer-d").value;
    resetWrongAnswerPassage("incorrect-answer-d");
    if (answerD == "1"){
        correctAnswer("difficult-check-4");
    } else {
        wrongAnswer("incorrect-answer-d");
    }
}

function checkAnswerE(){
    let answerE = document.getElementById("difficult-answer-e").value;
    resetWrongAnswerPassage("incorrect-answer-e")
    if (answerE == "9") {
        correctAnswer("difficult-check-5");
    } else {
        wrongAnswer("incorrect-answer-e");
    }
}
