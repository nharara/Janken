console.log("rps connected")

//Game logic:

function getComputerSelection() {
  let computerSelection;

  const randomNum = Math.floor(Math.random() * 3);
  if (randomNum == 0) {
    computerSelection = "ROCK";
  } else if (randomNum == 1) {
    computerSelection = "PAPER";
  } else if (randomNum == 2) {
    computerSelection = "SCISSORS";
  }
  return computerSelection
}

let playerScore = 0
let computerScore = 0
let roundWinner = ''

function playRound(playerSelection, computerSelection) {

  if (playerSelection === computerSelection) {
    roundWinner = "tie";
  } else if (
    (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
    (playerSelection === "PAPER" && computerSelection === "ROCK")
  ) {
    playerScore++
    roundWinner = 'player';
  } else if (
    (playerSelection === "ROCK" && computerSelection === "PAPER") ||
    (playerSelection === "SCISSORS" && computerSelection === "ROCK") ||
    (playerSelection === "PAPER" && computerSelection === "SCISSORS")
  ) {
    computerScore++
    roundWinner = 'computer';
  } else {
    console.log("you didn't type well")
    raise
  }
  updateScoreMsg(roundWinner, playerSelection, computerSelection)

}

function gameOver() {
  return playerScore === 5 || computerScore === 5
}

// UI logic:
const gameInfo = document.getElementById('gameInfo')
const scoreMsg = document.getElementById('scoreMsg')
const playerScoreDisplay = document.getElementById('playerScore')
const computerScoreDisplay = document.getElementById('computerScore')
const playerSymbol = document.getElementById('playerSymbol')
const computerSymbol = document.getElementById('computerSymbol')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const gameOverModal = document.getElementById('gameOverModal')
const gameOverMsg = document.getElementById('gameOverMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => playerClick('ROCK'))
paperBtn.addEventListener('click', () => playerClick('PAPER'))
scissorsBtn.addEventListener('click', () => playerClick('SCISSORS'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeGameOverModal)

function playerClick(playerSelection) {
  console.log("Player clicked:", playerSelection);
  if (gameOver()) {
    openGameOverModal()
    return
  }

  let computerSelection = getComputerSelection()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  updateScore()

  if (gameOver()) {
    openGameOverModal()
    setGameOverMsg()
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case 'ROCK':
      playerSymbol.textContent = '✊'
      break
    case 'PAPER':
      playerSymbol.textContent = '✋'
      break
    case 'SCISSORS':
      playerSymbol.textContent = '✌'
      break
  }

  switch (computerSelection) {
    case 'ROCK':
      computerSymbol.textContent = '✊'
      break
    case 'PAPER':
      computerSymbol.textContent = '✋'
      break
    case 'SCISSORS':
      computerSymbol.textContent = '✌'
      break
  }
}

function updateScore() {
  if (roundWinner === 'tie') {
    gameInfo.textContent = "It's a tie!"
  } else if (roundWinner === 'player') {
    gameInfo.textContent = 'You won!'
  } else if (roundWinner === 'computer') {
    gameInfo.textContent = 'You lost!'
  }

  playerScoreDisplay.textContent = `Player: ${playerScore}`
  computerScoreDisplay.textContent = `Computer: ${computerScore}`
}

function updateScoreMsg(winner, playerSelection, computerSelection) {
  if (winner === 'player') {
    scoreMsg.textContent = `${playerSelection
      } beats ${computerSelection}`
    return
  }
  if (winner === 'computer') {
    scoreMsg.textContent = `${playerSelection
      } is beaten by ${computerSelection}`
    return
  }

  scoreMsg.textContent = `${playerSelection
    } ties with ${computerSelection}`
}

function openGameOverModal() {
  gameOverModal.classList.add('active')
  overlay.classList.add('active')
}

function closeGameOverModal() {
  gameOverModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setGameOverMsg() {
  return playerScore > computerScore
    ? (gameOverMsg.textContent = 'You won!')
    : (gameOverMsg.textContent = 'You lost...')
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  gameInfo.textContent = 'What will you choose?'
  scoreMsg.textContent = 'First one to 5 wins the game!'
  playerScoreDisplay.textContent = 'Player: 0'
  computerScoreDisplay.textContent = 'Computer: 0'
  playerSymbol.textContent = '❔'
  computerSymbol.textContent = '❔'
  gameOverModal.classList.remove('active')
  overlay.classList.remove('active')
}
