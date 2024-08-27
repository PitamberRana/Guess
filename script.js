const secretNumber = Math.floor(Math.random() * 100) + 1;
let chancesLeft = 10;
const guessHistory = [];

function checkGuess() {
  const userGuessInput = document.getElementById("userGuess");
  const userGuess = userGuessInput.value;

  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

  chancesLeft--;

  if (userGuess == secretNumber) {
    displayMessage(
      `Congratulations! You guessed the number in ${
        10 - chancesLeft
      } attempts.`,
      true
    );
    userGuessInput.disabled = true; // Disable input after correct guess
  } else {
    const hint = userGuess < secretNumber ? "higher" : "lower";
    displayMessage(
      `Incorrect! Try a ${hint} number. Chances left: ${chancesLeft}`,
      false
    );
    if (chancesLeft === 0) {
      displayMessage(
        `Sorry, you failed to guess the number. The correct number was ${secretNumber}.`,
        false
      );
      userGuessInput.disabled = true; // Disable input after running out of chances
    }
  }

  displayHistory(userGuess, userGuess == secretNumber);
  displayChances();

  userGuessInput.value = ""; // Clear the input field
  userGuessInput.focus(); // Set focus back to the input field
}

function displayMessage(message, isCorrect) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;

  if (isCorrect) {
    messageElement.classList.add("correctGuess");
    messageElement.classList.remove("incorrectGuess");
  } else {
    messageElement.classList.add("incorrectGuess");
    messageElement.classList.remove("correctGuess");
  }
}

function resetGame() {
  location.reload();
}

function displayHistory(guess, isCorrect) {
  const guessHistoryElement = document.getElementById("guessHistory");
  const guessBox = document.createElement("div");
  guessBox.classList.add("guessBox");
  guessBox.textContent = guess;

  if (isCorrect) {
    guessBox.classList.add("correctGuess");
  } else {
    guessBox.classList.add("incorrectGuess");
  }

  guessHistoryElement.appendChild(guessBox);
}

function displayChances() {
  const chancesElement = document.getElementById("chances");
  chancesElement.textContent = chancesLeft;
}
