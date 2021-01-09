var studyBtn = document.querySelector("#study");
var meditateBtn = document.querySelector("#meditate");
var exerciseBtn = document.querySelector("#exercise");
var goals = document.querySelector("#goals");
var activityTitle = document.querySelector("#activityTitle");
var activitySelect = document.querySelector(".activity-selection");
var startButton = document.querySelector("#start-button");
var activityList = document.querySelector("#activity-selector");
var inputForm = document.querySelector("form");
var activityForm = document.querySelector("#activityForm");
var createActivity = document.querySelector("#createActivity");
var timerButton = document.querySelector("#timerButton");
var timeRemaining = document.querySelector("#timeRemaining");

var activity = new Activity(exerciseBtn.value, goals.value);

activitySelect.addEventListener('click', function(event) {
  event.target.classList.toggle("default-color");
  event.target.firstChild.src = `./assets/${event.target.firstChild.id}-active.svg`;
});

startButton.addEventListener('click', startActivity);
// timerButton.addEventListener('click', startTimer);

function hide(element) {
  return element.classList.add('hidden')
}

function unhide(element) {
  return element.classList.remove('hidden')
}

function startActivity() {
  hide(activityForm);
  unhide(createActivity);
  // timerButton.classList.add()
  activityTitle.innerText = 'Create Activity'
};
