const question = document.querySelector('#question');

const choices = Array.from(document.querySelectorAll('.choice-text'));

const progressText = document.querySelector('#progressText');

const scoreText = document.querySelector('#score');

const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "comme s'appele le premier copain de la tête de mila ?",
        choice1: 'Pilou',
        choice2: 'Monstre Bleu',
        choice3: 'Alim',
        choice4: 'Aloé',
        answer: 4,
    },
    {
        question: "Ton film preferé ?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '15',
        answer: 2,
    },
    {
        question: "de quoi mila a le plus peur ?",
        choice1: 'du vide',
        choice2: 'du noir',
        choice3: 'de mourir',
        choice4: 'des animaux sauvages très grand ou ceux qui sont dans la mer aussi très grand',
        answer: 2,
    },
    {
        question: "Ton film preferé ?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '15',
        answer: 2,
    },
    {
        question: "Ton film preferé ?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '15',
        answer: 2,
    },
    {
        question: "Ton film preferé ?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '15',
        answer: 2,
    },
    {
        question: "Ton film preferé ?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '15',
        answer: 2,
    },
    {
        question: "Ton film preferé ?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '15',
        answer: 2,
    },
    {
        question: "Ton film preferé ?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '15',
        answer: 2,
    },
    {
        question: "Ton film preferé ?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '15',
        answer: 2,
    },
    {
        question: "je suis de quel couleur en ce moment ?",
        choice1: 'bleu',
        choice2: 'taronge',
        choice3: 'rouge rouge rouge !',
        choice4: 'vert',
        answer: 3,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 11

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(score == 11) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end-win.html')
    } else if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS && score !== 11){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end-lose.html')
    }

    questionCounter++
    progressText.innerText = `question ${questionCounter} sur ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

    ScrollReveal().reveal('#game', {
        delay: 1200,
        duration: 1200,
        easing: 'ease'
    })

    ScrollReveal().reveal('.choice-container', {
        delay: 200,
        duration: 1200,
        easing: 'ease',
        cleanup: true
    })
    ScrollReveal().reveal('#question', {
        delay: 200,
        duration: 1200,
        easing: 'ease',
        cleanup: true
    })
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target 
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply == 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 700)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()