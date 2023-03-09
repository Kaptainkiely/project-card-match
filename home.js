const playButton = document.getElementById("play-button");
playButton.addEventListener("click", playSound);



function playSound() {
    const audio = new Audio('sound/match.wav');
    audio.play();
  }
