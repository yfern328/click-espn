1. teams index
  a list of my teams

2. when I click on a team
  top 3 players with the most points

3. click on a specific player
  shows a dropdown of that players info
    hometown
    points
    year of birth

store = {players: [], teams: []}

store
  team
    has many players
  player
    belongs to team

  build out store


team
  name
  city

  new Team("sixers", "philly")
    store is updated

  automatically
    view displays that team
