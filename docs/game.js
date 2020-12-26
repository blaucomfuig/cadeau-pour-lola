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
        question: "comment s'appelle le premier copain de la tête de mila ?",
        choice1: 'Monstre Bleu',
        choice2: 'Pilou',
        choice3: 'Alim',
        choice4: 'Aloé',
        answer: 1,
    },
    {
        question: "c'est quoi le film préferé de sophie?",
        choice1: 'la belle verte',
        choice2: 'juste la fin du monde',
        choice3: 'le nom de gens',
        choice4: "l'écume des jours",
        answer: 3,
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
        question: "boris appelle liv comment ?",
        choice1: 'Lise',
        choice2: 'Ivy',
        choice3: 'Lisie',
        choice4: 'Yves',
        answer: 4,
    },
    {
        question: "c'est quoi ce qu'ils disent au restaurant l'alibi quand il n'y a plus de papier WC ?",
        choice1: "thomas, vas-y en recharger !",
        choice2: "il n'y a plus de papier WC",
        choice3: 'il faut se débrouiller !',
        choice4: "il n'y a plus de papel",
        answer: 4,
    },
    {
        question: "c'était qui le personnage préferé de bd de félix auquel il s'identifiait ?",
        choice1: 'rahan',
        choice2: 'simba',
        choice3: 'rohani',
        choice4: 'mafalda',
        answer: 1,
    },
    {
        question: "'aputi', ça veut dire quoi pour les inuits ?",
        choice1: 'la neige qui tombe',
        choice2: "la neige qui sert à faire de l'eau",
        choice3: 'la neige sur le sol',
        choice4: 'la neige douce',
        answer: 3,
    },
    {
        question: "de quoi miloud a le plus peur ?",
        choice1: 'des souris',
        choice2: 'du sable',
        choice3: 'de la mort',
        choice4: 'des toilettes publiques ',
        answer: 1,
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
        question: "c'est quoi le film préferé de félix ?",
        choice1: 'urga',
        choice2: 'humans (vol. 1)',
        choice3: 'danse avec les loups',
        choice4: 'into the wild',
        answer: 3,
    },
    {
        question: "je suis de quel couleur en ce moment ?",
        choice1: 'bleu',
        choice2: 'taronge barcelonais',
        choice3: 'rouge rouge rouge !',
        choice4: 'vert',
        answer: 3,
    },
    {
        question: "c'était quoi le rôle de félix quand il dansait quand il était petit ?",
        choice1: 'le tigre',
        choice2: 'le pêcheur',
        choice3: 'le poisson',
        choice4: 'le berger',
        answer: 2,
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
    } else if(availableQuestions.length === 1 || questionCounter > MAX_QUESTIONS && score !== 11){
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
        }, 1200)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()