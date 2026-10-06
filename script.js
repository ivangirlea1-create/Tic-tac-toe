const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");
const scoreDrawText = document.getElementById("scoreDraw");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
resetScoreBtn.addEventListener("click", resetScore);

function handleCellClick(e) {
  const cell = e.target;
  const index = Number(cell.dataset.index);

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;

  if (currentPlayer === "X") {
    cell.textContent = "✕";
    cell.classList.add("x");
  } else {
    cell.textContent = "◯";
    cell.classList.add("o");
  }

  checkGameResult();
}

function checkGameResult() {
  let roundWon = false;
  let winnerCombo = null;

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    if (board[a] === "" || board[b] === "" || board[c] === "") continue;

    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      winnerCombo = winningCombinations[i];
      break;
    }
  }

  if (roundWon) {
    gameActive = false;

    winnerCombo.forEach(index => {
      cells[index].classList.add("win");
    });

    if (currentPlayer === "X") {
      statusText.textContent = "🎉 Spieler X hat gewonnen!";
      scoreX++;
      scoreXText.textContent = scoreX;
    } else {
      statusText.textContent = "🎉 Spieler O hat gewonnen!";
      scoreO++;
      scoreOText.textContent = scoreO;
    }

    return;
  }

  if (!board.includes("")) {
    gameActive = false;
    statusText.textContent = "🤝 Unentschieden!";
    scoreDraw++;
    scoreDrawText.textContent = scoreDraw;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = currentPlayer === "X" ? "❌ ist dran" : "⭕ ist dran";
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  statusText.textContent = "❌ ist dran";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "win");
  });
}

function resetScore() {
  scoreX = 0;
  scoreO = 0;
  scoreDraw = 0;

  scoreXText.textContent = "0";
  scoreOText.textContent = "0";
  scoreDrawText.textContent = "0";

  restartGame();
}
