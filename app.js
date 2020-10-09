// Fire Beats Grass & Ice
// Grass Beats Ice & Water
// Ice Beats  Water & Rock
// Water Beats Rock & Fire
// Rock Beats Fire & Grass

let pokemonTypes = ['fire', 'grass', 'ice', 'water', 'rock']
let pokemonFight = {
  fire: ['grass', 'ice'],
  grass: ['ice', 'water'],
  ice: ['water', 'rock'],
  water: ['rock', 'fire'],
  rock: ['fire', 'grass']
  // dragon: ['dragon']
  // fariry: ['dragon]
}
let pokemon = {
  fire: {
    beats: ['grass', 'ice'],
    image: 'https://img.pokemondb.net/sprites/silver/normal/charmeleon.png'
  },
  grass: {
    beats: ['ice', 'water'],
    image: 'https://img.pokemondb.net/sprites/ruby-sapphire/shiny/bulbasaur.png'
  },
  ice: {
    beats: ['water', 'rock'],
    image: 'https://img.pokemondb.net/sprites/ruby-sapphire/normal/articuno.png'
  },
  water: {
    beats: ['rock', 'fire'],
    image: 'https://img.pokemondb.net/sprites/silver/normal/blastoise.png'
  },
  rock: {
    beats: ['fire', 'grass'],
    image: 'https://img.pokemondb.net/sprites/ruby-sapphire/normal/golem.png'
  }
  // dragon: ['dragon']
  // fariry: ['dragon]
}

let playerScore = 0
let computerScore = 0

function playerChoice(playerChoice) {
  let compChoice = getComputerChoice()
  // console.log('player', playerChoice)
  drawBattle(playerChoice, compChoice)
  // Don't Alias play or play better at the starty
  let outCome = playBetter(playerChoice, compChoice)
  // displayWinner.innerHTML = playBetter(playerChoice, compChoice)
  if (outCome == "You Win") {
    spinWinner("player")
  } else if (outCome == "You Lose") {
    spinWinner("comp")
  }
  drawResults(outCome)
}

function play(player, comp) {
  // "of the 3 conditions (win lose tie) which case is the easiest to handle?"
  if (player == comp) {
    // "why does this work?"
    return "You Tie"
  } else if (player == 'fire' && (comp == 'grass' || comp == 'ice')) {
    playerScore += 1
    return "You Win"
  } else if (player == 'grass' && (comp == 'ice' || comp == 'water')) {
    playerScore += 1
    return "You Win"
  } else if (player == 'ice' && (comp == 'water' || comp == 'rock')) {
    playerScore += 1
    return "You Win"
  } else if (player == 'water' && (comp == 'rock' || comp == 'fire')) {
    playerScore += 1
    return "You Win"
  } else if (player == 'rock' && (comp == 'fire' || comp == 'grass')) {
    playerScore += 1
    return "You Win"
  } else if (comp == 'fire' && (player == 'grass' || player == 'ice')) {
    computerScore += 1
    return "You Lose"
  } else if (comp == 'grass' && (player == 'ice' || player == 'water')) {
    computerScore += 1
    return "You Lose"
  } else if (comp == 'ice' && (player == 'water' || player == 'rock')) {
    computerScore += 1
    return "You Lose"
  } else if (comp == 'water' && (player == 'rock' || player == 'fire')) {
    computerScore += 1
    return "You Lose"
  } else if (comp == 'rock' && (player == 'fire' || player == 'grass')) {
    computerScore += 1
    return "You Lose"
  }
}

function playBetter(playerPoke, compPoke) {
  debugger
  let battle = pokemonFight[playerPoke]
  console.log(battle)
  if (playerPoke == compPoke) {
    return "You Tied"
  } else if (battle.includes(compPoke)) {
    playerScore++
    return 'You Win'
  }
  computerScore++
  return "You Lose"
}

function getComputerChoice() {
  // make shorter by just returning instead of aliasing
  let choice = pokemonTypes[Math.floor(Math.random() * pokemonTypes.length)]
  console.log('computer', choice)
  return choice
}

function drawResults(outCome) {
  let scoreArea = document.getElementById('score-board')
  let displayWinner = document.getElementById('result')
  displayWinner.innerHTML = outCome
  scoreArea.innerHTML = `You: ${playerScore}  ` + `  Computer:${computerScore}`
}

function drawButtons() {
  let buttonArea = document.getElementById('buttons')
  let template = ''
  for (let poke in pokemon) {
    template += `<div class="col-4 btn btn-outline-secondary " onclick="playerChoice('${poke}')"><img src="${pokemon[poke].image}" alt="" srcset=""></div>`
  }
  buttonArea.innerHTML = template
}

function drawBattle(playerPoke, compPoke) {
  let battleArea = document.getElementById('battle-area')
  battleArea.innerHTML = `
    <div class="col-4 d-flex justify-content-center"><img id="player" src="${pokemon[playerPoke].image}" alt="" ></div>
    <h3 id="result" class="col-4 text-center">who will win?</h3>
    <div class="col-4 d-flex justify-content-center"><img id="comp" src="${pokemon[compPoke].image}" alt="" ></div>`
}

function spinWinner(winner) {
  let spinner = document.getElementById(winner)
  spinner.classList.add("fa-spin")
  setTimeout(() => spinner.classList.remove('fa-spin'), 5000)
}

// drawButtons()