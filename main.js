// VARIABLES
const CHOICES = ["✊", "🖐️", "✌️"];
const playerChoices = document.querySelectorAll(".choice_btn");

const playerScoreOutput = document.querySelector(".player_score");
const computerScoreOutput = document.querySelector(".computer_score");

const playerChoiceOutput = document.querySelector(".player_choice");
const computerChoiceOutput = document.querySelector(".computer_choice");

const modalBtn = document.querySelector(".modal_btn");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__text");

let playerScore = 0;
let computerScore = 0;

// GET PLAYER INPUT
playerChoices.forEach((choice) =>
	choice.addEventListener("click", (event) => {
		playerChoiceOutput.textContent = choice.textContent;
		let playerSelectedChoice = playerChoiceOutput.textContent;

		generateRandomComputerChoice(playerSelectedChoice);
	})
);

// GENERATE RANDOM COMPUTER OUTPUT
function generateRandomComputerChoice(playerSelectedChoice) {
	computerChoiceOutput.textContent = CHOICES[Math.floor(Math.random() * 3)];
	let computerGeneratedChoice = computerChoiceOutput.textContent;

	updateScore(playerSelectedChoice, computerGeneratedChoice);
}

// UPDATE SCORE AND UPDATE ROUND MESSAGE
function updateScore(playerSelectedChoice, computerGeneratedChoice) {
	let winner = "";

	if (
		(playerSelectedChoice === "✊" && computerGeneratedChoice === "🖐️") ||
		(playerSelectedChoice === "🖐️" && computerGeneratedChoice === "✌️") ||
		(playerSelectedChoice === "✌️" && computerGeneratedChoice === "✊")
	) {
		if (computerScore <= 5 || playerScore <= 5) {
			winner = "computer";
			computerScore++;
			computerScoreOutput.textContent = `COMPUTER: ${computerScore}`;
		} else {
			return;
		}
	} else if (
		(computerGeneratedChoice === "✊" && playerSelectedChoice === "🖐️") ||
		(computerGeneratedChoice === "🖐️" && playerSelectedChoice === "✌️") ||
		(computerGeneratedChoice === "✌️" && playerSelectedChoice === "✊")
	) {
		if (computerScore <= 5 || playerScore <= 5) {
			winner = "player";
			playerScore++;
			playerScoreOutput.textContent = `PLAYER: ${playerScore}`;
		} else {
			return;
		}
	} else {
		winner = "";
		computerScore = computerScore;
		playerScore = playerScore;
	}

	const mainTextTitle = document.querySelector(".main__h2");
	const mainTextSubtitle = document.querySelector(".main__p");

	if (winner === "") {
		mainTextTitle.textContent = "No one wins !";
		mainTextSubtitle.textContent = "Both selections are the same";
	} else {
		mainTextTitle.textContent = `${winner} wins !`;

		if (winner === "player") {
			mainTextSubtitle.textContent = `${playerSelectedChoice} beats ${computerGeneratedChoice}`;
		} else if (winner === "computer") {
			mainTextSubtitle.textContent = `${computerGeneratedChoice} beats ${playerSelectedChoice}`;
		} else {
			return;
		}
	}

	stopGame(playerScore, computerScore);
}

// STOP GAME AND OPEN MODAL
function stopGame(playerScore, computerScore) {
	if (playerScore === 5 || computerScore === 5) {
		playerChoices.forEach((choice) => {
			choice.classList.add("control_off");
		});

		modal.classList.add("active");
		modalBtn.addEventListener("click", (e) => {
			modal.classList.remove("active");
			restartGame();
		});
	} else {
		return;
	}
}

// RESTART GAME
function restartGame() {
	location.reload();
}
