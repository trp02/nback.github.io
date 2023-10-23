const charDisplay = document.getElementById('char-display');
const resultDisplay = document.getElementById('result-display');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const timeBar = document.getElementById('time-bar');
const timerElement = document.getElementById('timer');
const gameOverElement = document.createElement('div');
gameOverElement.setAttribute('id', 'game-over');

let timer;
let history = ['', '', '','',''];
const characters = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐔", "🐧", "🦆", "🦉", "🦇", "🦅", "🦋"];
let speed = 0
let i = 0;
let flag = 0;
const window_size = 4;
const timePerLevel = 240;
let previousIndex;
let record = {
    "correct": 0,
    "incorrect": 0
}

let seconds = 0;
let gameActive = true; // Initially, the game is active

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
    gameOverElement.textContent = 'Second Phase done!!';
    gameOverElement.style.color = 'red';
    gameOverElement.style.fontSize = '36px';
    document.getElementById('game-container').appendChild(gameOverElement);
    if (seconds >= 180) {
          // Calculate the position for the pop-up window to be centered
          const width = 400; // Adjust as needed
          const height = 200; // Adjust as needed
          const left = (window.innerWidth - width) / 2;
          const top = (window.innerHeight - height) / 2;
  
          // Open a pop-up window in the center
          const popup = window.open('', 'PopupWindow', `width=${width},height=${height},left=${left},top=${top}`);
          
          // Display a message in the pop-up
          popup.document.write(`
          <html>
          <head>
            <style>
              body {
                background-color: white; /* Change the background color */
                color: #00BFFF; /* Change the text color */
                font-family: Arial, sans-serif; /* Specify the font-family */
              }
            </style>
          </head>
          <body>
            <h1>Congratulations!! You have passed 2nd Level. Wait for 5 seconds and you'll be directed to next level</h1>
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
              window.location.href = 'phaseIII.html'; // Redirect to 'phaseIII.html' to start the game again
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
    if (flag == 4) {
        i += 1;
    }
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
        const isMatch = history[0] === history[4];
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
        history[2]=history[3];
        history[3]=history[4];
        history[4] = newChar;
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
    if (gameActive) {
        const currentWidth = parseFloat(timeBar.style.width);
        if (currentWidth > 0) {
            timeBar.style.width = (currentWidth - 0.2) + '%';// Decrease by 0.1% per interval. Makes it smoother
        } else {
            //checkMatch will clear current timer and start new one
        checkMatch(); //add to incorrect when timer runs out and move on 
        }
    }
}
//Exit button
function redirectToIndex() {
    window.location.href = 'index.html'; // Replace 'index.html' with the desired destination URL
}
  //starts timer 
function startTimer() {
        // Reset the time bar
    timeBar.style.width = '100%';
    timer = setInterval(decreaseTime, speed); //will adjust interval every [speed] seconds
}
         //starts timer 
         gameActive = true;
         startTimer();
         nextCharacter();
