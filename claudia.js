let name = document.querySelector(".name input")
let moodLevel = document.querySelector(".mood input")
let msgType = document.querySelector(".message-type select")
let submitBtn = document.querySelector(".submit-btn")
let resetBtn = document.querySelector(".reset-btn")
let cssEmptyInput = "background: rgba(241, 144, 144, 0.7); border-color: rgb(235, 75, 75);"
let cssNameInput = "background: none; border-bottom: 2px solid rgb(118, 118, 118);"

const emptyName = () => {
	return name.value === ""
}

let messages = 
{
	comfort: {
		good: "comforting good",
		bad: "comforting bad",
		neutral: "comforting neutral"
	},
	motivate: {
		good: "motivating good",
		bad: "motivating bad",
		neutral: "motivating neutral"
	},
	encourage: {
		good: "encouraging good",
		bad: "encouraging bad",
		neutral: "encouraging neutral"
	}
}

let surpriseMessage = "this is surprise"

submitBtn.addEventListener("mousedown", () => {
	if(emptyName()){
		name.placeholder = "Please fill in this field."
		name.style.cssText = cssEmptyInput
	}else {
		name.placeholder = "Your Name"
		name.style.cssText = cssNameInput
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