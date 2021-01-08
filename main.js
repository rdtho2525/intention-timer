// var studyBtn = document.querySelector("#study");
// var meditateBtn = document.querySelector("#meditate");
// var exerciseBtn = document.querySelector("#exercise");
var activitySelect = document.querySelector(".activity-selection");
var startButton = document.querySelector("#start-button");
var activityList = document.querySelector("#activity-selector");
var inputForm = document.querySelector("form");
var activityForm = document.querySelector("#activityForm");
var createActivity = document.querySelector("#createActivity");
var timerButton = document.querySelector("#timerButton");

activitySelect.addEventListener('click', function(event) {
  event.target.classList.toggle("default-color");
  event.target.firstChild.src = `./assets/${event.target.firstChild.id}-active.svg`;
});

startButton.addEventListener('click', startActivity);

function hide(element) {
  return element.classList.add('hidden')
}

function unhide(element) {
  return element.classList.remove('hidden')
}

function startActivity() {
  var activity = new Activity()
  hide(activityForm);
  unhide(createActivity);
  activity.startTimer()
};
