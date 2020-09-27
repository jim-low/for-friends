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
		good: "I see no reason to comfort when one is in a joyous mood, it shows signs of accomplishment and satisfaction which is exactly how you should feel most of the times. So keep it up, whatever it is that triggered your happiness shows that you gave effort and is satisfied by it. You can achieve more next time if you are consistent in improving.",

		bad: "It is alright to feel down sometimes, it does not show signs of weakness but instead effort and perseverence. Take this opportunity to learn to pick yourself up and continue standing your ground during the most difficult times. Remember, it's not about who wins the race today but instead it is about who stays on the track the longest.",

		neutral: "Take it easy, life is not a race but a test of perseverence and persistency. Take good care of your body and your mind because these are the absolute best investments you can make for yourself in your life."
	},
	motivating: {
		good: "It is good news to know that you are feeling great today! Keep up the good work and strive for 10% more than what you have achieved recently. Never be satisfied until you have truly discovered your full potential and be patient when you do not see improvement for it can only come to those who are consistent.",

		bad: "It is no good news that you are not in an uplifting mood today but do remember that failure is inequivalent to the end, instead of frowning over your mistakes you should be grateful as it is an opportunity for you to learn and improve further.",

		neutral: "The hardest thing to do is to start and this concept is applicable to most things in life. Whether that is to study, to revise, to exercise, to learn something entirely new, it all begins by starting and it is never easy. So whatever it is you decide to do, start first before complaining about how difficult it is. You'll never know if it ends up being beneficial."
	},
	encouraging: {
		good: "It is great news to hear that you are in a good mood today! Keep it up and keep doing your best, there is no need to be the best but it is always important to be your best. Keep up the momentum and keep failing, remember that without failure, there is no success.",

		bad: "It is alright to fail, to make a mistake and feel bad about it. This shows that you do indeed care about your actions and the consequences that it brings. Pick yourself up and aim to do better next time, it doesn't matter if you fail as long as you aim to correct the mistake and do better, you are already one step towards succeeding.",

		neutral: "You may be in this state due to lack of both satisfaction and excitement. Keep in mind that these things can only be found by those whom worked hard to find it, you can only be satisfied if you truly accept things a few things and work to change it, excitement comes from the thirst of knowledge or exploration. So always be curious to know more and keep improving, keep advancing and be consistent."
	},
	birthday: {
		good: "Happy Birthday! Good to know that you are doing great today! This shows that you are quite satisfied with the events of today, hopefully this keeps up. Remember, happiness and satisfaction can only be found when you do not expect it, so live each day to the fullest. Hope you like this project I made for you! It took me a lot of time to customize each message.",

		bad: "Happy Birthday! It's not good news that you are feeling terrible today, but fear not for there is still much time to improve further so keep learning, keep working, keep growing. Do your best, all the best and be your best. Hope you like this project I made for you! It took me a lot of time to customize each message.",

		neutral: "Happy Birthday! If you do not feel any sort of excitement today even after you've finished viewing this project then I am sure that you will soon enough. Take care and stay safe, I wish you the best of luck in your journey! Hope you like this project I made for you! It took me a lot of time to customize each message."
	}
}

const renderMessage = () => {
	let level = Number(moodLevel.value)
	let typeMsg = messages[msgType.value]
	let birthdayGirl = /claudia|qian|law/gi
	let msgStructure
	
	if(!name.value.match(birthdayGirl) && msgType.value === "birthday"){
		alert("This section is not available to you.")
		return false
	}else {
		if(level <= 2){
			msgStructure = `<h2>dear ${name.value},</h2>
							<p class="msg">
								${typeMsg.bad}
							</p>`
		}else if(level === 3){
			msgStructure = `<h2>dear ${name.value},</h2>
							<p class="msg">
								${typeMsg.neutral}
							</p>`
		}else {
			msgStructure = `<h2>dear ${name.value},</h2>
							<p class="msg">
								${typeMsg.good}
							</p>`
		}
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

document.addEventListener("keypress", (e) => {
	if(e.key === "Enter") {
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