class Activity {
  constructor(category, description) {
    this.category = category;
    this.description = description;
    this.minutes = 0;
    this.seconds = 0;
    this.completed = false;
    this.id = Date.now();
  }
  startTimer() {
    this.minutes = minutesInput.value;
    this.seconds = secondsInput.value;
    var counterSec = setInterval(timer, 1000);
    function timer() {
      this.seconds--;
      if (this.seconds < 0) {
         this.minutes--
         this.seconds = 59;
      } else {
        if (this.minutes === 0 && this.seconds === 0) {
          clearInterval(counterSec);
        }
      }
      timeRemaining.innerText = `${this.minutes} : ${this.seconds}`
    }
    alert('Time\'s Up!')
  }

  markComplete() {
    this.completed = true;
  }
  saveToStorage() {

  }
}

// module.exports = Activity;
