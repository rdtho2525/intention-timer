// DOM OBJECTS-------
var activitySelect = document.querySelector("#activity-list");
var startButton = document.querySelector("#start-button");
var activityCard = document.querySelector("#activity-card");
var userGoal = document.querySelector("#goals");
var minutes = document.querySelector("#minutes");
var seconds = document.querySelector("#seconds");
var goalError = document.querySelector("#goal-error-message");
var numError = document.querySelector("#number-error-message");
var studyBtn = document.querySelector("#study");
var meditateBtn = document.querySelector("#meditate");
var exerciseBtn = document.querySelector("#exercise");
var activityTitle = document.querySelector("#activityTitle");
var activityForm = document.querySelector("#activityForm");
var createActivity = document.querySelector("#createActivity");
var timerButton = document.querySelector("#timerButton");
var timeRemaining = document.querySelector("#timeRemaining");
var chosenActivity = document.querySelector("#chosenActivity")


// GLOBAL VARIABLES------

// EVENT LISTENERS--------

//
activitySelect.addEventListener('click', function(event) {
  // console.log(event.target.value);
  // console.log(event.target.firstChild);
  // console.log(event.target.className);
  if (event.target.className != 'icon btn') {
    event.target.classList.toggle("default-color");
    event.target.firstChild.src = `./assets/${event.target.firstChild.id}-active.svg`;
  // check the event.target.classList if it inlcudes default color
  // use string methods to remove ""-active" from src
  }
  else {
    event.target.parentNode.classList.toggle("default-color");
    event.target.src = `./assets/${event.target.id}-active.svg`;
  }
// FIX COLOR CHANGE FUNCTIONALITY
// DETERMINE HOW BUTTONS FEED startActivity()
});

startButton.addEventListener('click', startActivity);
timerButton.addEventListener('click', startActivityTimer);

// FUNCTIONS----
function hide(element) {
  return element.classList.add('hidden')
}

function unhide(element) {
  return element.classList.remove('hidden')
}

function checkInput() {
  var inputIsGood = true;
  var minInput = parseInt(minutes.value);
  var secInput = parseInt(seconds.value);

  if (!userGoal.value) {
    goalError.classList.toggle("invisible");
    inputIsGood = false;
  }
  if (!(minInput || minInput.typeof === "number" || minInput === "e") || !(secInput || secInput.typeof === "number" || secInput === "e")) {
    numError.classList.toggle("invisible");
    inputIsGood = false;
  }
  return inputIsGood;
}
// MATT ZONE-UP
// REGGIE ZONE-DOWN
function startActivity() {
  if (checkInput() === true) {
    hide(activityForm);
    unhide(createActivity);
    // timerButton.classList.add(`${}`)
    activityTitle.innerText = 'Create Activity';
    chosenActivity.innerText = userGoal.value;
    timeRemaining.innerText = `${(minutes.value < 10 ? "0" : "") + minutes.value}:${(seconds.value < 10 ? "0" : "") + seconds.value}`
  }
};

function startActivityTimer() {
  var activity = new Activity(exerciseBtn.value, userGoal.value, minutes.value, seconds.value);
  activity.startTimer();
}
