const readline = require('readline'); // Imports the built-in readline module to handle user input from the terminal

const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); // Creates an interface for user input and output

let secretNumbers = [50, 97, 80, 21, 76]; // List of secret numbers to guess from
let guessCount = 0; // Tracks the number of guesses made by the user

/**
 * Determines the player's skill level based on their number of attempts.
 * @param {number} count - The number of guesses made by the player.
 * @returns {string} - A string representing the player's skill level.
 */
const skillLvl = count => count === 1 ? "Magnificent! You should consider a career in fortune telling!" : count <= 5 ? "You are good." : "You need to play something else...";

/**
 * Formats and returns a string of secret numbers for display.
 * @param {number[]} array - The array of secret numbers.
 * @returns {string} - A formatted string of secret numbers separated by commas.
 */
const printAnswer = array => array.join(', ');

/**
 * Prompts the user to enter a guess, validates it, and checks if it matches any secret number.
 * If the guess is correct, it displays success messages and asks if they want to play again.
 * If the guess is incorrect, it prompts the user to guess again.
 */
const askGuess = () => {
    rl.question("Enter your guess: ", input => { // Prompts user for input
        let guess = parseInt(input); // Converts input string to a number
        console.log("\nValidating Input..."); // Notifies the user that input validation is in progress

        if (isNaN(guess) || guess < 0 || guess > 100) { // Validates the input
            console.log("❌ Invalid input. Please enter a number between 0 and 100."); // Displays error message for invalid input
            return askGuess(); // Prompts again if the input was invalid
        }

        guessCount++; // Increments the guess count since the input is valid
        let isCorrect = secretNumbers.includes(guess); // Checks if the guessed number is in the list

        setTimeout(() => {
            if (isCorrect) { // If the guess is correct, prints success, tracks performance, and asks to play again
                console.log(`✅ You guessed correctly in ${guessCount} attempts! \n🏆 Your skill level: ${skillLvl(guessCount)} \n📜 The numbers in the list were: ${printAnswer(secretNumbers)}`);
                playAgain(); // Calls function to ask if the player wants to play again
            } else { // If the guess is incorrect, prompts again after a delay
                console.log(`\n❌ Wrong guess! Keep trying. Number of attempts tried: ${guessCount}`);
                setTimeout(askGuess, 3000); // Prompts the user again after 3 seconds
            }
        }, 2000);
    });
};

/**
 * Prompts the user to decide if they want to play again.
 * Resets the attempt counter if they choose to continue.
 */
const playAgain = () => {
    rl.question("\n🔄 Do you want to play again? (y/n): ", answer => { // Asks the player if they want to play again
        answer = answer.toLowerCase(); // Converts input to lowercase
        if (answer === "y") { // If the player chooses to play again
            guessCount = 0; // Resets attempt counter
            console.log("\n🎮 New game! Try again."); // Notifies the user that a new game is starting
            askGuess(); // Restarts the game
        } else if (answer === "n") { // If the player chooses to exit
            console.log("\n👋 Thanks for playing! Have a nice day!"); // Prints a farewell message
            rl.close(); // Closes the interface
        } else { // If the input is invalid, asks again
            console.log("\n❌ Invalid input. Please enter 'y' or 'n'."); // Displays error message
            playAgain(); // Re-asks the question if input is invalid
        }
    });
};

console.log(`
============================================
🔥 WELCOME TO THE NUMBER GUESSING GAME! 🔥
============================================
🎯 Try to guess one of the secret numbers!
🔢 The number is between 0 and 100.
💡 Can you guess it in the fewest number of attempts?
============================================
`); // Prints the welcome message

askGuess(); // Starts the game by calling the askGuess function
