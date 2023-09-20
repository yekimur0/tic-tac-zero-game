class Board {
  step = 'Crosses';
  winnerCrosses = false;
  winnerNoughts = false;
  turnText = document.querySelector('.turn span');
  winnerText = document.querySelector('.winner span');
  winCrosses = [];
  winNoughts = [];

  comboWinners = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  constructor(board) {
    this.board = board;

    this.turnText.textContent = this.step;
    this.reset();
  }

  createSquare(index) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('data-square-index', `${index + 1}`);
    this.board.append(square);

    square.addEventListener('click', (e) => {
      e.target.classList.contains('Crosses') ||
      e.target.classList.contains('Noughts')
        ? this.changeTurn()
        : null;

      this.changeTurn();
      this.addPlayerToSquare(e.target);
      this.checkWinner(e.target);
    });
  }

  changeTurn() {
    this.step = this.step === 'Crosses' ? 'Noughts' : 'Crosses';
    this.turnText.textContent = this.step;
  }

  addPlayerToSquare(target) {
    if (
      target.classList.contains('Crosses') ||
      target.classList.contains('Noughts')
    ) {
      return;
    }

    if (this.step !== 'Crosses') {
      target.innerText = 'X';
      target.classList.add('Crosses');
    } else {
      target.innerText = '0';
      target.classList.add('Noughts');
    }
  }

  checkWinner(target) {
    if (this.step !== 'Crosses') {
      this.winCrosses.push(target.dataset.squareIndex);
    } else {
      this.winNoughts.push(target.dataset.squareIndex);
    }

    this.comboWinners.forEach((combo) => {
      const [a, b, c] = combo;
      if (
        this.winCrosses.includes(String(a)) &&
        this.winCrosses.includes(String(b)) &&
        this.winCrosses.includes(String(c))
      ) {
        this.winnerText.textContent = 'Crosses';
        this.winnerCrosses = !this.winnerCrosses;
        this.showWinner();
        this.endGame();
      } else if (
        this.winNoughts.includes(String(a)) &&
        this.winNoughts.includes(String(b)) &&
        this.winNoughts.includes(String(c))
      ) {
        this.winnerText.textContent = 'Noughts';
        this.winnerNoughts = !this.winnerCrosses;
        this.showWinner();
        this.endGame();
      }
    });
  }

  showWinner() {
    const winners = document.querySelectorAll('.square');
    const winCombos = [];

    this.comboWinners.forEach((combo) => {
      const [a, b, c] = combo;

      if (
        this.winCrosses.includes(String(a)) &&
        this.winCrosses.includes(String(b)) &&
        this.winCrosses.includes(String(c))
      ) {
        winCombos.push(combo);
      } else if (
        this.winNoughts.includes(String(a)) &&
        this.winNoughts.includes(String(b)) &&
        this.winNoughts.includes(String(c))
      ) {
        winCombos.push(combo);
      }
    });

    winners.forEach((winner) => {
      const dataIndex = winner.dataset.squareIndex;

      if (winCombos.some((combo) => combo.includes(Number(dataIndex)))) {
        winner.classList.add('show');
      } else {
        winner.classList.remove('show');
      }
    });
  }

  endGame() {
    if (this.winnerCrosses || this.winnerNoughts) {
      this.board.classList.add('end');
      this.turnText.style.display = 'none';
    }
  }

  reset() {
    const buttonReset = document.getElementById('playAgain');
    buttonReset.addEventListener('click', () => {
      const square = document.querySelectorAll('.square');
      square.forEach((square) => {
        square.innerText = '';
        square.classList.remove('Crosses', 'Noughts', 'show');
      });

      this.winCrosses = [];
      this.winNoughts = [];
      this.step = 'Crosses';
      this.winnerText.textContent = '';
      this.turnText.textContent = this.step;
      this.winnerCrosses = false;
      this.winnerNoughts = false;
      this.board.classList.remove('end');
      this.turnText.style.display = 'inline-block';
    });
  }
}

const gameBoard = new Board(document.querySelector('#app'));

const multiSquare = () => {
  for (let i = 0; i < 9; i++) {
    gameBoard.createSquare(i);
  }
};

multiSquare();
