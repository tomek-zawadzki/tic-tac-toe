const gameBox = document.querySelector(".game");

let squares = [];
let squaresNum = 0;
let idNumber = 0;
let playerOne;
let playerTwo;
let computer;
let activePlayer = 0;
let squarebox;
let isCycle = false;
let isCross = false;

const config = {
  easy: {
    squaresNum: 9,
  },
  medium: {
    squaresNum: 25,
  },
  hard: {
    squaresNum: 100,
  },
};

const generateSquares = () => {
  for (let square = 0; square < config.easy.squaresNum; square++) {
    squarebox = document.createElement("button");
    squarebox.classList.add("square");
    squarebox.setAttribute("id", parseInt([square]) + 1);
    squares.push(squarebox);
    gameBox.appendChild(squarebox);
  }
};

generateSquares();

// const toggleCycle = () => {
//   isCycle = !isCycle;

// };

// // console.log(squares.length);
// const squareBtn = document.querySelectorAll(".square");
// squareBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     btn.textContent = "O";
//     squarebox.classList.add("square-is-cycle");
//     console.log(squarebox);
//     console.log(btn);
//     console.log(btn.id);

//     const random = Math.floor(Math.random() * squares.contains.length);
//     squares[random].innerHTML = "X";
//   });
// });
