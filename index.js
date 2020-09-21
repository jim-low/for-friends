let selection = document.querySelector(".selection")
let friendsList = ['bithiah tang kai yuin','cheng yin shing','chong shuet yee','claudia law qian wen','jensyn chong ern','ng jun way']
let friendsProjects = 
[
	[
		{
			projName: "birthday card",
			dateReleased: "18th September 2020",
			link: "bithiah.html"
		}
	],
	[
		{
			projName: "surprise",
			dateReleased: "29th April 2020",
			link: "yinShing.html"
		}
	],
	[
		{
			projName: "a little surprise",
			dateReleased: "27th July 2020",
			link: "shuetYee.html"
		}
	],
	[
		{
			projName: "undefined",
			dateReleased: "undefined",
			link: "error404.html"
		}
	],
	[
		{
			projName: "birthday card",
			dateReleased: "19th September 2020",
			link: "jensyn.html"
		}
	],
	[
		{
			projName: "stop bullshit",
			dateReleased: "6th August 2020",
			link: "junway.html"
		}
	]
]

for(let i = 0; i < friendsList.length; i++){
	let sectionStructure = 
	`
	<li class="opt opt1">
		<div class="name">
			<p>${friendsList[i]}</p>
		</div>
		<ul class="projects">
		</ul>
	</li>
	`

	selection.innerHTML += sectionStructure
}

let projects = document.querySelectorAll(".projects")

for(let i = 0; i < projects.length; i++){
	for(let j = 0; j < friendsProjects[i].length; j++){
		let currentPerson = friendsProjects[i][j]
		let projectStructure = 
		`<li class="project project${i + 1}">
			<div class="name">
				<a href="${currentPerson.link}">${currentPerson.projName}</a>
			</div>
			<div class="publish">
				Published on <span class="date">${currentPerson.dateReleased}</span>
			</div>
		</li>
		`
		projects[i].innerHTML += projectStructure
	}
}
