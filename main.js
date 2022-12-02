const CHOICES = ["rock", "paper", "scissors"];
let playerChoices = document.querySelectorAll(".choice_btn");

const playerScoreOutput = document.querySelector(".player_score");
const computerScoreOutput = document.querySelector(".computer_score");

const playerChoiceOutput = document.querySelector(".player_choice");
const computerChoiceOutput = document.querySelector(".computer_choice");

let playerScore = 0;
let computerScore = 0;

// GET PLAYER INPUT
playerChoices.forEach((choice) => {
	choice.addEventListener("click", (event) => {
		playerChoiceOutput.textContent = choice.textContent;
		let playerSelectedChoice = playerChoiceOutput.textContent;

		generateRandomComputerChoice(playerSelectedChoice);
	});
});

// GENERATE RANDOM COMPUTER OUTPUT
function generateRandomComputerChoice(playerSelectedChoice) {
	computerChoiceOutput.textContent =
		CHOICES[Math.floor(Math.random() * CHOICES.length)];
	let computerGeneratedChoice = computerChoiceOutput.textContent;

	getWinner(playerSelectedChoice, computerGeneratedChoice);
}

// GET WINNER
function getWinner(playerSelectedChoice, computerGeneratedChoice) {
	let winner;

	if (
		(playerSelectedChoice === "rock" && computerGeneratedChoice === "paper") ||
		(playerSelectedChoice === "paper" &&
			computerGeneratedChoice === "scissors") ||
		(playerSelectedChoice === "scissors" && computerGeneratedChoice === "rock")
	) {
		winner = "computer";
	} else if (
		(computerGeneratedChoice === "rock" && playerSelectedChoice === "paper") ||
		(computerGeneratedChoice === "paper" &&
			playerSelectedChoice === "scissors") ||
		(computerGeneratedChoice === "scissors" && playerSelectedChoice === "rock")
	) {
		winner = "player";
	} else {
		winner = "";
	}

	displayRoundResult(winner, playerSelectedChoice, computerGeneratedChoice);
}
// DISPLAY ROUND RESULTS
function displayRoundResult(
	winner,
	playerSelectedChoice,
	computerGeneratedChoice
) {
	const resultTextTitle = document.querySelector(".main__h2");
	const resultTextSubtitile = document.querySelector(".main__p");

	if (winner === "player") {
		resultTextTitle.textContent = "player wins";
		resultTextSubtitile.textContent = `${playerSelectedChoice} beats ${computerGeneratedChoice}`;
	} else if (winner === "computer") {
		resultTextTitle.textContent = "computer wins";
		resultTextSubtitile.textContent = `${playerSelectedChoice} looses to ${computerGeneratedChoice}`;
	} else {
		resultTextTitle.textContent = "draw";
		resultTextSubtitile.textContent = `${playerSelectedChoice} is same as ${computerGeneratedChoice}`;
	}
	updateScores(winner);
}

// UPDATE SCORES
function updateScores(winner) {
	playerScoreOutput.textContent = `PLAYER: ${playerScore}`;
	computerScoreOutput.textContent = `COMPUTER: ${computerScore}`;

	if (playerScore === 5 || computerScore === 5) {
		return openModal();
	} else {
		if (winner === "player") {
			playerScore++;
		} else if (winner === "computer") {
			computerScore++;
		} else {
			playerScore;
			computerScore;
		}
	}
}

function openModal() {
	document.body.style.backgroundColor = "black";
	restartGame();
}
// RESTART GAME
function restartGame() {
	document.body.style.backgroundColor = "white";

	playerScore = 0;
	computerScore = 0;
}
