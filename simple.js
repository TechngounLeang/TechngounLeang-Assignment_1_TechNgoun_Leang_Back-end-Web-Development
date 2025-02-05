let arr = [50, 97, 80, 21, 76]; // List of secret numbers the player needs to guess from

let guess = 80; // This is the player's guess. In a real game, this would be implemented with an user input option instead of declaring a variable

let found = false; // Counter to track if the guess is correct or not.

// Welcome message that is displayed when the game starts
console.log("Guess one of the numbers in my list!"); 

// Function to check if the player's guess is in the list of secret numbers
const check = () => {
    // Loop through each number in the list 
    for (let i = 0; i < arr.length; i++) {
        // If the current number in the array matches the guess, set 'found' to true
        // Returns a message indicating the guess was correct.
        if (arr[i] === guess) {
            found = true; // Guess is correct
            return "You guessed correctly!"; // Returns success message
        }
    }
    // If no match is found after checking all numbers in the list, returns this message.
    return "You guessed incorrectly! Keep guessing.";
};

// Calls the check function to evaluate the guess and logs the result
console.log(check());
