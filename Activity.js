class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }
  startTimer() {
    var counterSec = setInterval(timer, 1000);
    var min = this.minutes;
    var sec = this.seconds;
    function updateButton() {
      timerButton.innerText = `COMPLETE!`;
      logActivity.classList.toggle("hidden");
    }
    function timer() {
      if (sec > 0) {
        sec--;
      }
      if (sec < 0 && min >= 0) {
         min--
         sec = 59;
      } else {
          clearInterval(counterSec);
          setTimeout(updateButton, 1000);
          this.completed = true;
      }
      timeRemaining.innerText = `${(min < 10 ? "0" : "") + min}:${(sec < 10 ? "0" : "") + sec}`
    }
  }

  markComplete() {
    this.completed = true;
  }
  saveToStorage() {

  }
}
