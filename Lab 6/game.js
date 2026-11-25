// Global variables to track game state, scores, and round history
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = [];

// Validate player name and start the game
function startGame() {
    let playerName = document.getElementById("playerName").value.trim();
    
    if (playerName === "") {
        alert("Please enter your name.");
        return;
    }

    // Display welcome message and start timestamp
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + playerName + "!";
    gameStarted = true;
}

// Randomly select rock, paper, or scissors for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Return the matching image filename for a given choice
function getChoiceImage(choice) {
    if (choice === "rock") {
        return "imgRock.png";
    } else if (choice === "paper") {
        return "imgPaper.png";
    } else {
        return "imgScissors.png";
    }
}

// Execute a single round when the player clicks a choice button
function playRound(playerChoice) {
    // Prevent playing before starting the game
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();

    // Update player and computer images
    document.getElementById("playerImg").src = getChoiceImage(playerChoice);
    document.getElementById("computerImg").src = getChoiceImage(computerChoice);

    let roundResult = "";
    let resultElement = document.getElementById("result");

    // Determine the winner using if...else rules
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultElement.innerHTML = "It's a Draw!";
        resultElement.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultElement.innerHTML = "You Win!";
        resultElement.style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        resultElement.innerHTML = "You Lose!";
        resultElement.style.color = "red";
    }

    // Update scoreboard numbers
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store result in array and append new row to the history table
    results.push(roundResult);
    let roundNumber = results.length;
    let historyTable = document.getElementById("history");
    
    historyTable.innerHTML += 
        "<tr>" +
            "<td>" + roundNumber + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + roundResult + "</td>" +
        "</tr>";
}

// Calculate total rounds and win percentage using a for loop
function showSummary() {
    if (results.length === 0) {
        document.getElementById("summary").innerHTML = "No rounds played yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let winPercentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summary").innerHTML = 
        "You played " + results.length + " rounds and won " + winPercentage + "%.";
}

// Reset all scores, history table, images, and messages back to initial state
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("playerImg").src = "imgRock.png";
    document.getElementById("computerImg").src = "imgRock.png";

    // Reset history table back to header row only
    document.getElementById("history").innerHTML = 
        "<tr>" +
            "<th>Round</th>" +
            "<th>You</th>" +
            "<th>Computer</th>" +
            "<th>Result</th>" +
        "</tr>";
}