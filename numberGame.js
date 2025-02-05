const readline = require('readline'); // Imports the built-in readline module to handle user input from the terminal

/**
 * Creates an interface for user input and output.
 * @param {Object} options - Configuration options for the interface.
 * @param {stream.Readable} options.input - The readable stream to listen to.
 * @param {stream.Writable} options.output - The writable stream to write output to.
 */
const rl = readline.createInterface({
    input: process.stdin,  // Reads input from the terminal
    output: process.stdout // Writes output to the terminal
});

let secretNumbers = [50, 97, 80, 21, 76]; // List of secret numbers to guess from
let guessCount = 0;  // Tracks the number of guesses made by the user

/**
 * Determines the player's skill level based on their number of attempts.
 * @param {number} count - The number of guesses made by the player.
 * @returns {string} - A string representing the player's skill level.
 */
const skillLvl = count => {
    switch (true) {
        case count === 1:
            return "Magnificent! You should consider a career in fortune telling!"; // If guessed correctly on the first try
        case count >= 2 && count <= 5:
            return "You are good."; // If guessed correctly within 2 to 5 attempts
        default:
            return "You need to play something else..."; // If guessed correctly after more than 5 attempts
    }
}

/**
 * Formats and returns a string of secret numbers for display.
 * @param {number[]} array - The array of secret numbers.
 * @returns {string} - A formatted string of secret numbers separated by commas.
 */
const printAnswer = array => {
    let result = ''; // Initializes an empty string to store the secret numbers for display
    array.forEach((num, index) => {
        result += num; // Appends the current secret number to the result string
        if (index < array.length - 1) 
            result += ', ';  // Adds commas between the secret numbers
    });
    return result; // Returns the string of secret numbers
}

/**
 * Prompts the user to enter a guess, validates it, and checks if it matches any secret number.
 * If the guess is correct, it displays success messages and asks if they want to play again.
 * If the guess is incorrect, it prompts the user to guess again.
 */
const askGuess = () => {
    rl.question("Enter your guess: ", (input) => {
        let guess = parseInt(input); // Converts the input string to a number

        try {
            console.log("\nValidating Input..."); // Notifies the user that input validation is in progress

            // Validates the input
            if (isNaN(guess)) {
                throw new Error("Invalid Input. Please enter a valid number."); // Throws an error if the input is not a number
            } 
            while(guess < 0 || guess > 100){
                throw new Error("Guess must be between 0 and 100."); // Throws an error if the input is not within the range of 0 or 100
            }

            guessCount++;  // Increments the guess count since the input is valid

            let isCorrect = false; // Tracks if the guess is correct

            // Checks if the guessed number is in the list
            for (let i = 0; i < secretNumbers.length; i++) {
                if (secretNumbers[i] === guess) {
                    isCorrect = true; // Sets to true if the guess matches a number in the list
                    break; // Stop checking if a match is found
                }
            }

            // If the guess is correct, prints success, tracks performance, and asks to play again
            if (isCorrect) {
                setTimeout(() => {
                    console.log(`✅ You guessed correctly in ${guessCount} attempts! 
🏆 Your skill level: ${skillLvl(guessCount)} 
📜 The numbers in the list were: ${printAnswer(secretNumbers)}`);
                    playAgain();
                }, 2000);
            } else {
                setTimeout(() => console.log(`\n❌ Wrong guess! Keep trying. Number of attempts tried: ${guessCount}`), 2000);
                setTimeout(askGuess, 3000); // Prompts the user again after 3 seconds
            }
        } catch (error) {
            console.log("\n🚨 Error: " + error.message);
            askGuess(); // Prompts again if the input was invalid
        }
    });
};

/**
 * Prompts the user to decide if they want to play again.
 * Resets the attempt counter if they choose to continue.
 */
const playAgain = () => {
    rl.question("\n🔄 Do you want to play again? (y/n): ", answer => {
        answer = answer.toLowerCase();
        if (answer === "y") {
            guessCount = 0; // Resets attempt counter
            console.log("\n🎮 New game! Try again.");
            askGuess(); // Restarts the game
        } else if (answer === "n") {
            console.log("\n👋 Thanks for playing! Have a nice day!");
            rl.close(); // Closes the interface
        } else {
            console.log("\n❌ Invalid input. Please enter 'y' or 'n'.");
            playAgain(); // Re-ask the question if input is invalid
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
