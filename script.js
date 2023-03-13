const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard;
let moves = 0;
let matchSound = new Audio('sound/match.wav');
let pageLoadSound = new Audio('sound/play.wav');

function playSound() {
    pageLoadSound.play();
  } 
  window.onload = playSound;

// this function plays a sound as the game page load ups

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

// this function checks if the cards flipped match and stops the function if they do.

    function checkForMatch() {
      if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        return;
      }
   
      unflipCards();
      moves++;
    document.querySelector('.moves').textContent = moves;

}

//this function checks on the two cliked on cards if they are matched they are disabled. if not they turn back around 

   
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('match');
    secondCard.classList.add('match');
    playMatchSound();
    let matchedCards = document.querySelectorAll('.match');
    console.log('matchedCards', matchedCards.length);
    console.log('cards', cards.length);
    
    if (matchedCards.length === cards.length) {
      console.log('All cards matched!');
      window.location.href = "win.html";
    }
  
    resetBoard();
  }

// this function removes event listners to the cards that are matched.ot also plays a sound when cards are matched
// once all cards are macthed it will take you to the win.html page
  
   
    function unflipCards() {
        lockBoard = true;

      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
      }, 700);
    }

// this function flips the cards back when there is no match restting the board
// First, it sets the lockBoard variable to true to prevent any other cards from being flipped during the timeout period.
// Then, it uses setTimeout() to delay the removal of the flip class from the two cards, giving the user a moment to see which cards were flipped.


    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];

       
      }

//This function is called after both disableCards() and unflipCards() functions to ensure that the game board is reset and ready for the next move.

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

//this function shuffles the cards on the board. it also has a countdown timer which will take you to gameover.html if you dont complete it in time

      function playMatchSound() {
      matchSound.currentTime = 0;
      matchSound.play();
      }
      
  
  
  cards.forEach(card => card.addEventListener('click', flipCard));

// this function adds an event listener to each card in the cards array. When a card is clicked, the flipCard function is called to flip the card and check if it matches with another flipped card.