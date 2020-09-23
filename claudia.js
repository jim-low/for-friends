let name = document.querySelector(".name input")
let moodLevel = document.querySelector(".mood input")
let msgType = document.querySelector(".message-type select")
let submitBtn = document.querySelector(".submit-btn")
let resetBtn = document.querySelector(".reset-btn")
let inputs = [name, moodLevel, msgType]
let cssEmptyInput = "background: rgba(241, 144, 144, 0.7); border-color: rgb(235, 75, 75); color: white;"
let cssNameInput = "background: rgb(135, 228, 135); border-color: rgb(42, 168, 42); color: black;"

const emptyName = () => {
	return name.value === ""
}

let messages = 
{
	comfort: {
		good: "",
		bad: "",
		neutral: ""
	},
	motivate: {
		good: "",
		bad: "",
		neutral: ""
	},
	encourage: {
		good: "",
		bad: "",
		neutral: ""
	}
}

let surpriseMessage = ""

submitBtn.addEventListener("mousedown", () => {
	if(emptyName()){
		name.placeholder = "Please fill in this field."
		name.style.cssText = cssEmptyInput
	}else {
		name.style.cssText = cssNameInput
	}
})