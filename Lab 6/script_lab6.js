// 1. Questions Array
const questions = [
    {
        question: "What condiment was formerly sold as a medicine?",
        options: ["Mayonnaise", "Hummus", "Ketchup", "Relish"],
        answer: "Ketchup"
    },
    {
        question: "What part of the plant is the carrot?",
        options: ["Shoot", "Root", "Stalk", "Leaf"],
        answer: "Root"
    },
    {
        question: "What food will never spoil?",
        options: ["Milk", "Pickle", "Apple", "Honey"],
        answer: "Honey"
    },
    {
        question: "What is the most beneficial mineral in spinach?",
        options: ["Iron", "Copper", "Vitamin", "Calcium"],
        answer: "Iron"
    },
    {
        question: "Which plant was the first to be cultivated in space?",
        options: ["Tomato", "Potato", "Watermelon", "Carrot"],
        answer: "Potato"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let answered = false;

// 2. shuffleQuestions(): Randomly shuffles the questions array
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// 3. startTimer(): Sets a 15-second countdown timer for each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!answered) {
                answered = true;
                const correctAns = questions[currentQuestionIndex].answer;
                const feedback = document.getElementById("feedback-text");
                feedback.textContent = `Time's up! Incorrect. The correct answer is ${correctAns}.`;
                feedback.style.color = "red";
                document.getElementById("submit-btn").disabled = true;
                document.getElementById("next-btn").style.display = "inline-block";
            }
        }
    }, 1000);
}

// 4. displayQuestion(): Displays current question and answer options
function displayQuestion() {
    answered = false;
    const currentQ = questions[currentQuestionIndex];

    document.getElementById("question-number").textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById("question-text").textContent = currentQ.question;
    document.getElementById("feedback-text").textContent = "";

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQ.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "option-label";
        label.innerHTML = `
            <input type="radio" name="quizOption" value="${option}" id="opt${index}">
            ${option}
        `;
        optionsContainer.appendChild(label);
    });

    document.getElementById("submit-btn").disabled = false;
    document.getElementById("next-btn").style.display = "none";
}

// 5. checkAnswer(): Checks selected answer, shows feedback, and updates score
function checkAnswer() {
    const selected = document.querySelector('input[name="quizOption"]:checked');
    const feedback = document.getElementById("feedback-text");

    if (!selected) {
        alert("Please select an answer first!");
        return;
    }

    if (answered) return;
    answered = true;
    clearInterval(timerInterval);

    const correctAns = questions[currentQuestionIndex].answer;

    if (selected.value === correctAns) {
        score++;
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Incorrect! The correct answer is ${correctAns}.`;
        feedback.style.color = "red";
    }

    document.getElementById("score-display").textContent = `Score: ${score} / ${questions.length}`;
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("next-btn").style.display = "inline-block";
}

// 6. nextQuestion(): Moves to next question, resets timer, or finishes quiz
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        clearInterval(timerInterval);
        document.getElementById("quiz").innerHTML = `
            <h2>Quiz Completed!</h2>
            <p>Thank you for playing the Easy Food Quiz.</p>
            <button onclick="location.reload()">Restart Quiz</button>
        `;
        document.getElementById("feedback-text").textContent = "All questions answered!";
        document.getElementById("feedback-text").style.color = "#2e7d32";
        document.getElementById("score-display").textContent =
            `Final Score: ${score} / ${questions.length}`;
    }
}

// 7. startQuiz(): Shuffles questions, displays first question, starts timer
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Start the quiz automatically when the page loads
startQuiz();