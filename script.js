const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard;
let moves = 0;



function flipCard() {
    this.classList.toggle('flip');
    this.classList.add('flip');
    if (this === firstCard) return;

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      }

      secondCard = this;
   
      checkForMatch();
    }
   
    function checkForMatch() {
      if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        return;
      }
   
      unflipCards();
      moves++;
    document.querySelector('.moves').textContent = moves;

}

   
    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);

      resetBoard();
    }
   
    function unflipCards() {
        lockBoard = true;

      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
      }, 700);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];

       
      }

      (function shuffle() {
        cards.forEach(card => {
          let ramdomPos = Math.floor(Math.random() * 16);
          card.style.order = ramdomPos;
        });
      })();
  
  
  cards.forEach(card => card.addEventListener('click', flipCard));