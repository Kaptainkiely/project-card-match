const playButton = document.getElementById("play-button");
playButton.addEventListener("click", playSound);



function playSound() {
    const audio = new Audio('/Users/aaronkiely/Desktop/project card match/ptoject-card-match/sound/match.wav');
    audio.play();
  }