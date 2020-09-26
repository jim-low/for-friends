let form = document.querySelector("#form")
let msg = document.querySelector("#message")
let name = document.querySelector(".name input")
let moodLevel = document.querySelector(".mood input")
let msgType = document.querySelector(".message-type select")
let submitBtn = document.querySelector(".submit-btn")
let resetBtn = document.querySelector(".reset-btn")
let cssEmptyInput = "background: rgba(241, 144, 144, 0.7); border-color: rgb(235, 75, 75);"
let fadeOut = "animation: fadeOut 2s linear"
let fadeIn = "animation: fadeIn 4s linear"

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
	let birthdayGirl = /claudia|qian|law/gi
	let msgStructure

	if(msgType.value !== "birthday"){
		if(level <= 2){
			msgStructure = `<h2>dear ${name.value}</h2>
							<p class="msg">
								${typeMsg.bad}
							</p>`
		}else if(level === 3){
			msgStructure = `<h2>dear ${name.value}</h2>
							<p class="msg">
								${typeMsg.neutral}
							</p>`
		}else {
			msgStructure = `<h2>dear ${name.value}</h2>
							<p class="msg">
								${typeMsg.good}
							</p>`
		}
	}else if(msgType.value === "birthday" && name.value.match(birthdayGirl)){
		msgStructure = `<h2>dear ${name.value}</h2>
							<p class="msg">
								${surpriseMessage}
							</p>`
	}else {
		alert("Birthday surprise not for you.")
		return false
	}
	msg.innerHTML = msgStructure
	return true
}

submitBtn.addEventListener("mousedown", () => {
	if(emptyName()){
		name.placeholder = "Please fill in this field."
		name.style.cssText = cssEmptyInput
	}else {
		if(confirm("Confirm options?")){
			if(renderMessage()){
				form.style.cssText += fadeOut
				form.style.animationFillMode = "forwards"
				msg.style.cssText += fadeIn
				msg.style.display = "flex"
			}
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