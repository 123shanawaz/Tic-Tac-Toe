const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gamegrid;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gamegrid = ["", "", "", "", "", "", "", "", ""];
  newGamebtn.classList.remove("active");
  gameinfo.innerText = `current player is -${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  if (gamegrid[index] === "") {
    boxes[index].innerHTML = currentPlayer;
    gamegrid[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameinfo.innerText = `current player is - ${currentPlayer}`;
    checkWinner();
  }
}

function checkWinner() {
  let winner = "";
  winningCombos.forEach((combo) => {
    if (
      gamegrid[combo[0]] === gamegrid[combo[1]] &&
      gamegrid[combo[1]] === gamegrid[combo[2]] &&
      (gamegrid[combo[0]] !== "" ||
        gamegrid[combo[1]] !== "" ||
        gamegrid[combo[2]] !== "")
    ) {
      if (gamegrid[combo[0]] === "X") {
        winner = "X";
      } else {
        winner = "O";
      }

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
        });

       boxes[combo[0]].classList.add("win");
         boxes[combo[1]].classList.add("win");
            boxes[combo[2]].classList.add("win");
    }
  });

    if (winner !== "") {
        gameinfo.innerText = `Winner is ${winner}`;
        newGamebtn.classList.add("active");
        return;
    }
}

newGamebtn.addEventListener("click", () => {
  initGame();
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("win");
  });
});
