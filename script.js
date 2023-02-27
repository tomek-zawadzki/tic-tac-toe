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
// const winConditions = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

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
    console.log(currentPlayer);

    if (whoWon(currentPlayer)) {
      winnerText.innerHTML = `${currentPlayer} wins`;
    }
    changePlayer();
  }
};

const computerMove = (e) => {
  const id = e.target.id;
  if (!options[id]) {
    e.target.innerHTML = "O";
    options[id] = "O";
    computerMoveLogic();
    console.log(options);
    console.log(currentPlayer);
  }
};

const computerMoveLogic = () => {
  if (options.filter((option) => option === "").length === 0) {
    winnerText.textContent = "Draw";
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

const startVsPlayer = () => {
  generateSquares();

  squareBtn = document.querySelectorAll(".square");

  squareBtn.forEach((btn) => {
    btn.addEventListener("click", playerMove);
  });
};

const startVsComputer = () => {
  generateSquares();

  squareBtn = document.querySelectorAll(".square");

  squareBtn.forEach((btn) => {
    btn.addEventListener("click", computerMove);
  });
};

const changePlayer = () => {
  currentPlayer = currentPlayer === player_O ? player_X : player_O;
};

const whoWon = (player) => {
  if (options[0] === player) {
    if (options[1] === player && options[2] === player) {
      return true;
    }
    if (options[3] === player && options[6] === player) {
      return true;
    }
    if (options[4] === player && options[8] === player) {
      return true;
    }
  }

  if (options[8] === player) {
    if (options[2] === player && options[5] === player) {
      return true;
    }
    if (options[7] === player && options[6] === player) {
      return true;
    }
  }

  if (options[4] === player) {
    if (options[3] === player && options[5] === player) {
      return true;
    }
    if (options[1] === player && options[7] === player) {
      return true;
    }
  }

  if (options.filter((option) => option === "").length === 0) {
    winnerText.textContent = "Draw";
  }
};

const resetGame = () => {
  options = ["", "", "", "", "", "", "", "", ""];

  squareBtn.forEach((btn) => {
    btn.removeEventListener("click", playerMove);
  });
  squareBtn.forEach((btn) => {
    btn.removeEventListener("click", computerMove);
  });

  squareBtn.forEach((square) => {
    square.innerHTML = "";
  });
  winnerText.innerHTML = "";
  currentPlayer = player_O;
};

playerOponent.addEventListener("click", startVsPlayer);
computerOponent.addEventListener("click", startVsComputer);
resetBtn.addEventListener("click", resetGame);
