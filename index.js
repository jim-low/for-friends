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
    "zi yu diong"
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
    const optionSection = document.createElement('li')
    optionSection.classList.add('option', 'capitalize')

    const nameSection = document.createElement('div')
    nameSection.classList.add('name')

    const name = document.createElement('p')
    name.innerHTML = friendsList[i]

    const projectsList = document.createElement('ul')
    projectsList.classList.add('projects')

    nameSection.append(name)
    optionSection.append(nameSection)
    optionSection.append(projectsList)

    selection.append(optionSection)
}

let projects = document.querySelectorAll(".projects")

for(let i = 0; i < projects.length; i++){
    for(let j = 0; j < friendsProjects[i].length; j++){
        const currentPerson = friendsProjects[i][j]

        const project = document.createElement('li')
        project.classList.add('project')

        const projectNameSection = document.createElement('div')
        projectNameSection.classList.add('project-name')

        const projectNameLink = document.createElement('a')
        projectNameLink.classList.add('project-link')
        projectNameLink.href = `./html/${currentPerson.link}`
        projectNameLink.innerHTML = currentPerson.projName

        const publishSection = document.createElement('div')
        publishSection.classList.add('publish')

        const publishInformation = document.createElement('p')
        publishInformation.innerHTML = 'Published on '

        const publishDate = document.createElement('span')
        publishDate.classList.add('date')
        publishDate.innerHTML = currentPerson.dateReleased

        projectNameSection.append(projectNameLink)
        publishInformation.append(publishDate)
        publishSection.append(publishInformation)
        project.append(projectNameSection)
        project.append(publishSection)

        projects[i].append(project)
    }
}
