const charDisplay = document.getElementById('char-display');
const resultDisplay = document.getElementById('result-display');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const timeBar = document.getElementById('time-bar');
const timerElement = document.getElementById('timer');
const gameOverElement = document.createElement('div');
gameOverElement.setAttribute('id', 'game-over');

let timer;
let history = ['', '', ''];
const characters = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐔", "🐧", "🦆", "🦉", "🦇", "🦅", "🦋"];
let speedParams = {duration: 0, widthReduction: 0}
let duration = 0;
let i = 0;
let flag = 0;
const window_size = 2;
const timePerLevel = 180;
let previousIndex;
let record = {
    "correct": 0,
    "incorrect": 0
}

let seconds = 0;
let gameActive = false; // Initially, the game is not active

function updateTimer() {
    if (gameActive) {
        timerElement.textContent = seconds + 's';
        seconds++;
        
        if (seconds >= timePerLevel) {
            gameActive = false; // Game over
            clearInterval(timer);
            displayGameOver();
        }
    }
}

function displayGameOver() {
    gameOverElement.textContent = 'First Phase done!!';
    gameOverElement.style.color = 'red';
    gameOverElement.style.fontSize = '36px';
    document.getElementById('game-container').appendChild(gameOverElement);
    if (seconds >= 120) {
          // Calculate the position for the pop-up window to be centered
          const width = 400; // Adjust as needed
          const height = 200; // Adjust as needed
          const left = (window.innerWidth - width) / 2;
          const top = (window.innerHeight - height) / 2;
  
          // Open a pop-up window in the center
          const popup = window.open('', 'PopupWindow', `width=${width},height=${height},left=${left},top=${top},popup=yes`);
          
          // Display a message in the pop-up
          popup.document.write(`
          <html>
          <head>
            <style>
              body {
                background-color: rgb(181, 241, 197); /* Change the background color */
                color: blue; /* Change the text color */
                font-family: Arial, sans-serif; /* Specify the font-family */
                font-size: 10px;
              }
            </style>
          </head>
          <body>
            <h1>Congratulations!! You have passed first Phase </h1>
            <h1>Congratulations!! You have passed first Level. Wait for 5 seconds and you'll be directed to the next level</h1>
          </body>
          </html>
        `);
          //popup.document.write('<p>Your game is over.</p>');
  
          // Close the pop-up after 5 seconds (adjust as needed)
          setTimeout(function() {
              if (popup) {
                  popup.close();
              }
          }, 5000);
  
          // Redirect to another page after the pop-up is closed
          setTimeout(function() {
              window.location.href = 'phaseII.html'; // Redirect to 'phaseII.html' to start the game again
                      }, 5000);
      }
}

setInterval(updateTimer, 1000);

function getRandomChar() {
    //let randomIndex = Math.floor(Math.random() * characters.length);
    //randomIndex = characters.length%randomIndex;
    //return characters[randomIndex];
    let window;
    start = i % characters.length;
    end = (i + window_size) % characters.length;
    window = characters.slice(start, end);
    if (flag == 2) {
        i += 1;
    }
    //let randomIndex = Math.floor(Math.random() * window.length);
    let randomIndex = Math.floor(Math.random() * (end - start + 1)) + start;
    if (!previousIndex){
        previousIndex = randomIndex;
    }
    else{
        previousIndex = Math.random()< 0.5 ? previousIndex : randomIndex;
    }
    return characters[previousIndex];
}

function checkMatch(userSaidYes) {
    if (gameActive) {
        const isMatch = history[0] === history[2];
        if (userSaidYes === isMatch) {
            record.correct += 1;
            resultDisplay.textContent = 'Correct!';
            resultDisplay.style.color = 'green';
            flag = 0;
        } else {
            record.incorrect += 1;
            resultDisplay.textContent = 'Wrong!';
            resultDisplay.style.color = "#FF5733";
            flag += 1;
        }
    
        correctCount.textContent = "Correct: " + record.correct;
        incorrectCount.textContent = "Incorrect: " + record.incorrect;
        if (gameActive) {
            clearInterval(timer);
            startTimer();
            nextCharacter();
        }
    }
}

function nextCharacter() {
    if (gameActive) {
        const newChar = getRandomChar();
        charDisplay.textContent = newChar;
        history[0] = history[1];
        history[1] = history[2];
        history[2] = newChar;
    }
}

nextCharacter();// Start the game with the first character

//close instruction pop up
function closeInstructions() {
    var modal = document.getElementById("instructions");
    modal.style.display = "none";
}

//decreases timer
function decreaseTime() {

    let selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
    if (gameActive) {
        const currentWidth = parseFloat(timeBar.style.width);
        if (currentWidth > 0) {
            timeBar.style.width = (currentWidth - speedParams.widthReduction) + '%';// Decrease by 0.2% per interval. Makes it smoother
        } else {
            //checkMatch will clear current timer and start new one
        checkMatch(); //add to incorrect when timer runs out and move on 
        }
    }
}
  //starts timer 
function startTimer() {
        // Reset the time bar
    timeBar.style.width = '100%';
    timer = setInterval(()=> decreaseTime(), speedParams); //will adjust interval every [duration] seconds
}
//Exit button
function redirectToIndex() {
    window.location.href = 'index.html'; // Replace 'index.html' with the desired destination URL
}

// handles difficulty form submission
document.getElementById("difficulty").addEventListener('submit', function (event) {
    event.preventDefault();
    var selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
    if (selectedDifficulty) {
        // Close window and record difficulty lvl
        closeInstructions();
        if (selectedDifficulty.value === "Easy") {
            speedParams.duration = 5; //timer will be 5 seconds
            speedParams.widthReduction = 0.1; //width reduction 0.1 per interval
        } else if (selectedDifficulty.value === "Medium") {
            speedParams.duration = 3; //every 3 seconds
            speedParams.widthReduction = 0.2; //width reduction 0.2 per interval
        } else if (selectedDifficulty.value === "Hard") {
            speedParams.duration = 0.5;//twice every second
            speedParams.widthReduction = 0.4;//width reduction 0.4 per interval
        }
         //starts timer 
         gameActive = true;
         startTimer();
         nextCharacter();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const modeToggle = document.getElementById('mode-toggle');
    const stylesheet = document.getElementById('stylesheet');
    modeToggle.addEventListener('change', function () {
        if (modeToggle.checked) {
               // Dark mode
            stylesheet.href = 'styleDark.css';
        } else {
               // Light mode
            stylesheet.href = 'style.css';
        }
    });
});


