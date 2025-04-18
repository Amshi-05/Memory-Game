const grid = document.getElementById('grid');
const movesText = document.getElementById('moves');
const timerText = document.getElementById('timer');
const congratsText = document.getElementById('congrats');

const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥝'];

let cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let matches = 0;
let timer = null;
let seconds = 0;

function startGame() {
  // Reset values
  grid.innerHTML = '';
  congratsText.classList.add('hidden');
  cards = [];
  firstCard = null;
  secondCard = null;
  moves = 0;
  matches = 0;
  seconds = 0;
  movesText.textContent = '0';
  timerText.textContent = '0';

  clearInterval(timer);
  timer = setInterval(() => {
    seconds++;
    timerText.textContent = seconds;
  }, 1000);

  // Create and shuffle cards
  const shuffled = shuffle([...symbols, ...symbols]);
  shuffled.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.textContent = '';
    card.addEventListener('click', () => handleCardClick(card));
    grid.appendChild(card);
    cards.push(card);
  });
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function handleCardClick(card) {
  if (card.classList.contains('revealed') || card.classList.contains('matched') || secondCard) {
    return;
  }

  card.textContent = card.dataset.symbol;
  card.classList.add('revealed');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    moves++;
    movesText.textContent = moves;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      firstCard = null;
      secondCard = null;
      matches++;

      if (matches === symbols.length) {
        clearInterval(timer);
        congratsText.classList.remove('hidden');
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('revealed');
        secondCard.classList.remove('revealed');
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }
}

// Start the game on load
startGame();
