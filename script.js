const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard;
let moves = 0;
let matchSound = new Audio('sound/match.wav');



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
      playMatchSound();

      let matchedCards = document.querySelectorAll('.match');
      console.log('matchedCards', matchedCards.length);
      console.log('cards', cards.length);
  if (matchedCards.length === cards.length) {
    console.log('matchedCards', matchedCards.length);
    console.log('cards', cards.length);
    window.location.href = "win.html";
  }

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

      var timeLeft = 60;
      var countdownTimer = setInterval(function(){
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(countdownTimer);
          window.location.href = "gameover.html";
        }
      },1000);

      function playMatchSound() {
      matchSound.currentTime = 0;
      matchSound.play();
      }
      
  
  
  cards.forEach(card => card.addEventListener('click', flipCard));