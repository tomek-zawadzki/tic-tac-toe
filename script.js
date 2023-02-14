const gameBox = document.querySelector(".game");
const resetBtn = document.querySelector(".reset-btn");
const winnerText = document.querySelector(".game-winner");
const player_O = "O";
const player_X = "X";
let currentPlayer = player_O;
let options = ["", "", "", "", "", "", "", "", ""];

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
  for (let square = 0; square < 9; square++) {
    const squareCell = document.createElement("button");
    squareCell.classList.add("square");
    squareCell.setAttribute("id", parseInt([square] - 1) + 1);
    gameBox.appendChild(squareCell);
  }
};

generateSquares();

const squareBtn = document.querySelectorAll(".square");

squareBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = e.target.id;
    if (!options[id]) {
      options[id] = currentPlayer;
      e.target.innerText = currentPlayer;
      changePlayer();
      if (whoWon(currentPlayer)) {
        winnerText.innerHTML = `${currentPlayer} wins`;
      }
    }
  });
});

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
};

const resetGame = () => {
  options = ["", "", "", "", "", "", "", "", ""];

  squareBtn.forEach((square) => {
    square.innerHTML = "";
  });
  currentPlayer = player_O;
};

resetBtn.addEventListener("click", resetGame);
