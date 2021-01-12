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
    function runAlert() {
      return alert('Time\'s Up!');
    }
    function timer() {
      sec--;
      if (sec < 0) {
         sec = 59;
         min--;
       }
      if (min < 0) {
        min = 0;
        sec = 0;
        clearInterval(counterSec);
        setTimeout(updateButton, 50);
        }
      timeRemaining.innerText = `${(min < 10 ? "0" : "") + min}:${(sec < 10 ? "0" : "") + sec}`
    }
  }


  markComplete() {
    this.completed = true;
  }
  saveToStorage() {
    var getData = localStorage.getItem("storedActivityData");
    var parseData = JSON.parse(getData);
    parseData.unshift(this);
    var stringifyNewData = JSON.stringify(parseData);
    localStorage.setItem("storedActivityData", stringifyNewData);
  }
}
