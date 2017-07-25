const store = {players: [], teams: []}

function createTeam(){
  let teamId = 0
  return class Team {
    constructor(name, city){
      this.name = name
      this.city = city
      this.id = ++teamId
      this.players = []
      store.teams.push(this)
    }

    top3(){
      let self = this
      let myPlayers = store.players.filter(function (player) {
        return self.players.includes(player.id)
      })
      return myPlayers.sort(function(obj1, obj2) {
	      return obj2.points - obj1.points;
      }).slice(0, 3)
    }

    static findTeam(arg){
      return store.teams.find(function(team){
        return team.name === arg
      })
    }

  }
}

function createPlayer(){
  let playerId = 0
  return class Player {
    constructor(name, hometown, points, dob){
      this.name = name
      this.hometown = hometown
      this.points = points
      this.dob = dob
      this.id = ++playerId
      store.players.push(this)
    }
  }
}

let team = createTeam()
let player = createPlayer()

let knicks = new team("knicks", "new york")
let warriors = new team("warriors", "san francisco")
let cavs = new team("cavs", "cleveland")

new player("melo", "brooklyn", 30, "april")
new player("drose", "chicago", 15, "may")
new player("porzingis", "latvia", 22, "june")
new player("ron baker", "iowa", 5, "july")
knicks.players = [1,2,3,4]

new player("KD", "baltimore", 40, "august")
new player("Steph Curry", "hollywood", 35, "september")
new player("Klay Thompson", "not hollywood", 20, "oct")
new player("Draymond", "philadelphia", 15, "nov")
warriors.players = [5,6,7,8]

new player("bronbron", "ohio", 35, "dec")
new player("kyrie", "brooklyn", 30, "jan")
new player("love", "LA", 18, "feb")
new player("jr smith", "the streetz", 13, "march")
cavs.players = [9,10,11,12]

function addTeams(){
  let node = document.getElementsByTagName('tbody')[0]
  let teamTemplate
  let nameTemplate
  let cityTemplate
  store.teams.forEach((team,index) =>{
	teamTemplate = document.createElement('tr')
	nameTemplate = document.createElement('td')
	cityTemplate = document.createElement('td')
    nameTemplate.className = "team"
    nameTemplate.innerHTML = team.name
    cityTemplate.innerHTML = team.city

	teamTemplate.append(nameTemplate)
	teamTemplate.append(cityTemplate)

    node.append(teamTemplate)
  })
}

addTeams()

// function htmlTemplate()

function playersHtml(players){
  return players.map(function(players){
    return `<tr><td>${players.name}</td><td>${players.hometown}</td><td>${players.points}</td><td>${players.dob}</td></tr>`
  }).join(' ')
}


function render(html, into){
  $(into).empty()
  $(into).append(html)
}


$(function() { // on document ready
  $('.team').on('click', function(){
    console.log(this.innerHTML)
    let foundTeam = team.findTeam(this.innerHTML)
    let topThreePlayersOnTeamArray = foundTeam.top3()
    let htmlDisplay = playersHtml(topThreePlayersOnTeamArray)
    render(htmlDisplay, 'tbody:eq(1)')
  })
})
