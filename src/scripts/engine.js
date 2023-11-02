const state = {
  // Variáveis para elementos visuais
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
    life: document.querySelector('#life'),
    retry: document.querySelector('#retry')
  },
  // Variáveis para elementos internos
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    lifes: 5,
    currentTime: 60
  },
  // Funções para elementos de ação
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000)
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`)
  audio.volume = 0.2
  audio.play()
}

function countDown() {
  state.values.currentTime--
  state.view.timeLeft.textContent = state.values.currentTime

  if (state.values.currentTime <= 0 || state.values.lifes <= 0) {
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.actions.timerId)
    playSound('gameover')
    alert('Game Over! O seu resultado foi: ' + state.values.result)
  }
}

function randomSquare() {
  state.view.squares.forEach(square => {
    square.classList.remove('enemy') //limpa a classe enemy de todos os quadrados (square)
  })

  let randomNumber = Math.floor(Math.random() * 9) //sorteia numero aleatório de 1 a 9

  let randomSquare = state.view.squares[randomNumber] //pega o quadrado que foi sorteado

  randomSquare.classList.add('enemy')
  state.values.hitPosition = randomSquare.id
}

function addListenerHitBox() {
  state.view.squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++
        state.view.score.textContent = state.values.result
        state.values.hitPosition = null
        playSound('punch')
      } else if (square.id !== state.values.hitPosition) {
        state.values.lifes--
        state.view.life.textContent = state.values.lifes
        playSound('glass')
      }
    })
  })
}

function retry() {
  state.view.retry.addEventListener('click', () => {
    location.reload()
  })
}

function initialize() {
  addListenerHitBox()
  retry()
}

initialize()
