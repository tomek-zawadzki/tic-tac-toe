const gameBox = document.querySelector(".game");
const resetBtn = document.querySelector(".reset-btn");
const winnerText = document.querySelector(".game-winner");
const playerOponent = document.querySelector(".player-btn");
const computerOponent = document.querySelector(".computer-btn");
let squareBtn = document.querySelectorAll(".square");

const player_O = "O";
const player_X = "X";
let currentPlayer = player_O;
let options = ["", "", "", "", "", "", "", "", ""];
let gameVsComputer = false;
let gameVsPlayer = false;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const generateSquares = () => {
  if (squareBtn[0] === undefined) {
    for (let square = 0; square < 9; square++) {
      const squareCell = document.createElement("button");
      squareCell.classList.add("square");
      squareCell.setAttribute("id", parseInt([square]));
      gameBox.appendChild(squareCell);
    }
  } else {
    resetGame();
  }
};

const playerMove = (e) => {
  const id = e.target.id;
  if (!options[id]) {
    options[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    checkScores();
    changePlayer();
  }
};

const computerMove = (e) => {
  const id = e.target.id;
  if (!options[id]) {
    e.target.innerHTML = "O";
    options[id] = "O";
    computerMoveLogic();
  }
  checkScores();
};

const computerMoveLogic = () => {
  if (options.filter((option) => option === "").length === 0) {
    return;
  } else {
    const availableSquare = Object.entries(options)
      .filter((option) => option[1] === "")
      .map((option) => option[0]);

    const random = Math.floor(Math.random() * availableSquare.length);

    squareBtn[availableSquare[random]].innerHTML = "X";
    options[availableSquare[random]] =
      squareBtn[availableSquare[random]].innerHTML;
  }
};

const generateGame = (whoPlay) => {
  generateSquares();

  squareBtn = document.querySelectorAll(".square");

  squareBtn.forEach((btn) => {
    btn.addEventListener("click", whoPlay);
  });
};

const startVsPlayer = () => {
  gameVsComputer = false;
  gameVsPlayer = true;
  generateGame(playerMove);
};

const startVsComputer = () => {
  gameVsComputer = true;
  gameVsPlayer = false;
  generateGame(computerMove);
};

const changePlayer = () => {
  currentPlayer = currentPlayer === player_O ? player_X : player_O;
};

const checkScores = () => {
  let roundWon = false;
  winConditions.forEach((arr) => {
    const win0 = arr.every((cell) => squareBtn[cell].textContent === "O");
    const winX = arr.every((cell) => squareBtn[cell].textContent === "X");

    if (win0) {
      roundWon = true;
      winnerText.innerHTML = `${currentPlayer} wins`;
    } else if (winX) {
      roundWon = true;
      currentPlayer = "X";
      winnerText.innerHTML = `${currentPlayer} wins`;
    } else if (options.every((option) => option !== "") && roundWon === false) {
      winnerText.innerHTML = "draw";
    }
  });
};

const resetGame = () => {
  options = ["", "", "", "", "", "", "", "", ""];
  if (gameVsComputer) {
    squareBtn.forEach((btn) => {
      btn.removeEventListener("click", playerMove);
    });
  }
  if (gameVsPlayer) {
    squareBtn.forEach((btn) => {
      btn.removeEventListener("click", computerMove);
    });
  }

  squareBtn.forEach((square) => {
    square.innerHTML = "";
  });
  winnerText.innerHTML = "";
  currentPlayer = player_O;
};

playerOponent.addEventListener("click", startVsPlayer);
computerOponent.addEventListener("click", startVsComputer);
resetBtn.addEventListener("click", resetGame);
