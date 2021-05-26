let selection = document.querySelector(".selection")
let friendsList = [
    "bithiah tang kai yuin",
    "cheng yin shing",
    "chong shuet yee",
    "ng jun way",
    "claudia law",
    "chloe sim yu xi",
    "joey kok yen ni",
    "debbie ong",
    "zene chew yan zheng",
    "vese lee",
    "kai wen",
    "zi yu"
]
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
            },
            {
                projName: "balls surprise",
                dateReleased: "22nd April 2021",
                link: "yinShing2.html"
            }
        ],
        [
            {
                projName: "a little surprise",
                dateReleased: "29th July 2020",
                link: "shuetYee.html"
            }
        ],
        [
            {
                projName: "stop bullshit",
                dateReleased: "6th August 2020",
                link: "junway.html"
            }
        ],
        [
            {
                projName: "custom message",
                dateReleased: "28th September 2020",
                link: "claudia.html"
            }
        ],
        [
            {
                projName: "first try",
                dateReleased: "13th April 2020",
                link: "firstTry.html"
            },
            {
                projName: "fireworks",
                dateReleased: "5th May 2021",
                link: "chloe.html"
            }
        ],
        [
            {
                projName: "simple wishes",
                dateReleased: "10th October 2020",
                link: "yenni.html"
            },
            {
                projName: "quotes app",
                dateReleased: "17th October 2020",
                link: "quoteApp.html"
            }
        ],
        [
            {
                projName: "BTS Card",
                dateReleased: "7th January 2021",
                link: "debbie.html"
            }
        ],
        [
            {
                projName: "Bubbles",
                dateReleased: "4th May 2021",
                link: "zene.html"
            }
        ],
        [
            {
                projName: "circular",
                dateReleased: "12th May 2021",
                link: "vese.html"
            }
        ],
        [
            {
                projName: "celebration",
                dateReleased: "26th May 2021",
                link: "kaiwen.html"
            }
        ],
        [
            {
                projName: "triangle",
                dateReleased: "26th May 2021",
                link: "ziyu.html"
            }
        ],
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
            <a href="./html/${currentPerson.link}">${currentPerson.projName}</a>
            </div>
            <div class="publish">
            Published on <span class="date">${currentPerson.dateReleased}</span>
            </div>
            </li>
            `
        projects[i].innerHTML += projectStructure
    }
}
