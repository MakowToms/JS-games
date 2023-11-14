const gameGround = document.getElementById("ground");
const userScoreDisplay = document.getElementById("score");
const countdownDisplay = document.getElementById("time");
let gamePlaces;
let displayTime = 1000;
let displayTimer;
let gameTimeTimer;



function handlePoliClick(event) {
    if (event.target.style.backgroundImage) {
        userScoreDisplay.innerText = Number(userScoreDisplay.innerText) + 1;
        displayTime -= 5;
    } else {
        userScoreDisplay.innerText = Number(userScoreDisplay.innerText) - 1;
	// gdy dobijemy do -5, przegrywamy
        if (Number(userScoreDisplay.innerText) <= -5) {
            endGame();
        }
    }
}
function endGame() {
    clearInterval(displayTimer);
    clearInterval(gameTimeTimer);
    alert("Koniec gry! Twój wynik oczekuje na rozpatrzenie przez Dziekana");
    const endGameMessage = document.getElementById("gameOverMessage");
    endGameMessage.style.display = "none";
}

function updateTime() {
    countdownDisplay.innerText = Number(countdownDisplay.innerText) - 1;
    (countdownDisplay.innerText === "0") && endGame();
}



function displayPoli() {
    const selectedPlace = gamePlaces[Math.floor(Math.random() * gamePlaces.length)];
    selectedPlace.style.backgroundImage = "url('https://www.ch.pw.edu.pl/var/ch/storage/images/media/images/logo-pw-duze/14891-1-pol-PL/Logo-PW-duze_imagelarge.jpg')";
    selectedPlace.style.backgroundSize = "122px 122px";
    selectedPlace.style.objectFit = "cover";
    setTimeout(() => {
        selectedPlace.style.backgroundImage = "";
    }, displayTime);
}

function createGameBoard() {
    for (let i = 0; i < 16; i++) {
        gameGround.innerHTML += `<div class="place"><div>`;
    }
    gamePlaces = document.getElementsByClassName("place");
    [...gamePlaces].forEach(place => place.addEventListener("click", handlePoliClick));
}

function beginGame() {
    createGameBoard();
    displayTimer = setInterval(displayPoli, displayTime);
    gameTimeTimer = setInterval(updateTime, 1000);
}

function restartGame() {
    gameGround.innerHTML = "";
    userScoreDisplay.innerText = Number(0);
    countdownDisplay.innerText = Number(30);
    clearInterval(displayTimer);
    clearInterval(gameTimeTimer);
    beginGame();
}

beginGame();

document.getElementById('restart').onclick = () => {
    restartGame();
}
