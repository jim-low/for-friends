let form = document.querySelector("#form")
let msg = document.querySelector("#message")
let name = document.querySelector(".name input")
let moodLevel = document.querySelector(".mood input")
let msgType = document.querySelector(".message-type select")
let submitBtn = document.querySelector(".submit-btn")
let resetBtn = document.querySelector(".reset-btn")
let cssEmptyInput = "background: rgba(241, 144, 144, 0.7); border-color: rgb(235, 75, 75);"

const emptyName = () => {
	return name.value === ""
}

let messages = 
{
	comforting: {
		good: "comforting good",
		bad: "comforting bad",
		neutral: "comforting neutral"
	},
	motivating: {
		good: "motivating good",
		bad: "motivating bad",
		neutral: "motivating neutral"
	},
	encouraging: {
		good: "encouraging good",
		bad: "encouraging bad",
		neutral: "encouraging neutral"
	}
}

let surpriseMessage = "this is surprise"

const renderMessage = () => {
	let level = Number(moodLevel.value)
	let typeMsg = messages[msgType.value]
	let msgContainer = document.querySelector(".msg")
	if(msgType.value !== "birthday"){
		if(level <= 2){
			msgContainer.innerHTML = typeMsg.bad
		}else if (level === 3){
			msgContainer.innerHTML = typeMsg.neutral
		}else {
			msgContainer.innerHTML = typeMsg.good
		}
	}else {
		msgContainer.innerHTML = surpriseMessage
	}
	$("#form").fadeOut(3000);
	$("#message").fadeIn(3000);
}

submitBtn.addEventListener("mousedown", () => {
	if(emptyName()){
		name.placeholder = "Please fill in this field."
		name.style.cssText = cssEmptyInput
	}else {
		if(confirm("Confirm options")){
			renderMessage()
			form.style.display = "none"
			msg.style.display = "flex"
		}
	}
})

resetBtn.addEventListener("mousedown", () => {
	if(confirm("Reset form?")){
		name.value = ""
		name.placeholder = "Your Name"
		name.style.cssText = cssNameInput
		moodLevel.value = "3"
		msgType.value = "comforting"
	}
})