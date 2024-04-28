const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let currentPlayer = 'X'; // 'X' or 'O'
let count = 0; // To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  currentPlayer = 'X';
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const userMove = (box) => {
  if (currentPlayer === 'X' && box.innerText === "") {
    box.innerText = "X";
    box.classList.add("red-text");
    box.disabled = true;
    count++;
    if (!checkWinner()) {
      currentPlayer = 'O';
      setTimeout(computerMove, 2000); // Delayed call to computerMove after 2 seconds
    }
  }
};

const computerMove = () => {
  // Basic AI: Randomly choose an empty box
  const emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
  const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  randomBox.innerText = "O";
  randomBox.classList.add("black-text");
  randomBox.disabled = true;
  count++;
  if (!checkWinner()) {
    currentPlayer = 'X';
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("black-text", "red-text");
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  if (count === 9) {
    gameDraw();
    return true;
  }
  return false;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    userMove(box);
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
