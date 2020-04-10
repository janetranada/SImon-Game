const userClickedPattern = []
const gamePattern = []
const buttonColors = ['red', 'blue', 'green', 'yellow']
let started = false
let level = 0

const playSound = (name) => {
    const audio = new Audio('sounds/' + name + '.mp3')
    audio.play()
}

const nextSequence = (() => {
    userClickedPattern.length = 0
    level++
    $('h1#level-title').text('Level ' + level)

    const randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    const chosenSquareId = '#' + randomChosenColor
    $(chosenSquareId).fadeOut(100).fadeIn(100)

    playSound(randomChosenColor)
})

const startOver = () => {
    gamePattern.length = 0
    level = 0
    started = false
}

const checkAnswer = (currentLevel) => {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => nextSequence(), 1000)            
        }
    } else {
        playSound('wrong')
        $('body').addClass('game-over')
        setTimeout(() => $('body').removeClass('game-over'), 200)
        $('h1#level-title').html('Game Over! </br> Press Any Key to Restart')
        startOver()
    }
}

const animatePress = (currentColor) => {
    const currentColorId = '#' + currentColor
    $(currentColorId).addClass('pressed')
    setTimeout(() => $(currentColorId).removeClass('pressed'), 100)
}

$('.btn').click(() => {
    const userChosenColor = event.currentTarget.id
    userClickedPattern.push(userChosenColor)
    animatePress(userChosenColor)
    playSound(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})

$(document).keypress(() => {
    if(!started) {
        nextSequence()
        started = true
    }
})
