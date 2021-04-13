let monstersData = "http://localhost:3000/monsters"
let queryLimit = 50
let queryPage = 1

let monsterCollection = document.querySelector("#monster-container")

function loadMonsterPage(pageNumber) {
    fetch(`${monstersData}/?_limit=${queryLimit}&_page=${queryPage}`)
        .then(response => response.json())
        .then(data => buildMonsters(data))
}

function buildMonsters(data) {
    data.forEach(buildOneMonster)
}

function buildOneMonster(monster) {
    const monsterDiv = document.createElement("div")
    monsterDiv.innerHTML = `
      <h3>${monster.name}</h3>
      <p>${monster.age}</p>
      <p>${monster.description}</p>
  `
    monsterCollection.append(monsterDiv)
}

// MOVE BETWEEN PAGES
const fwdButton = document.querySelector("#forward")
const backButton = document.querySelector("#back")

fwdButton.addEventListener("click", fwdFunc)

function fwdFunc() {
    queryPage++
    loadMonsterPage(queryPage)
}

backButton.addEventListener("click", backFunc)

function backFunc() {
    if (queryPage > 0) { queryPage-- }
    loadMonsterPage(queryPage)
}


// ADD MONSTER
const newMonsterForm = document.querySelector(".add-monster")

function getNewMonster() {
    const monster = {
        name: newMonsterForm.name.value,
        age: parseInt(newMonsterForm.age.value),
        description: newMonsterForm.description.value,
        likes: 0
    }
    return monster
}

// make POST request
function submitData(monster) {
    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(monster)
    }

    return fetch(monstersData, configObject)
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            alert("Monster added!")
        }).catch(function(error) {
            alert(error.message)
        })
}

// actually get the form data and make the post request
newMonsterForm.addEventListener("submit", submitNewMonster);

function submitNewMonster(event) {
    event.preventDefault();
    const newMonster = getNewMonster();
    submitData(newMonster)
    newMonsterForm.reset()
}



//initialize
function initialize() {
    loadMonsterPage(queryPage)
}

initialize()