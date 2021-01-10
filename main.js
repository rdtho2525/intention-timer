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
var logActivity = document.querySelector("#logActivity");


var currentChoice = document.getElementsByName("choice");
// GLOBAL VARIABLES------
var currentCategory = "";
var activityData = []; // I add created this global variable to hold all our activities so we have a stable data model.


// EVENT LISTENERS--------

activitySelect.addEventListener('click', selectActivity);
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

function selectActivity() {
  for (var i = 0; i < currentChoice.length; i++) {
    if (currentChoice[i].checked === true) {
      currentCategory = currentChoice[i].value;
      var colorClass = `${currentCategory}Color`;
      timerButton.classList.add(colorClass);
    }
  }
}

function startActivity() {
  if (checkInput() === true) {
    hide(activityForm);
    unhide(createActivity);
    // timerButton.classList.add(`${}`)
    activityTitle.innerText = 'Create Activity';
    chosenActivity.innerText = userGoal.value;
    timeRemaining.innerText = `${(minutes.value < 10 ? "0" : "") + minutes.value}:${(seconds.value < 10 ? "0" : "") + seconds.value}`
    var activity = new Activity(currentCategory, userGoal.value, minutes.value, seconds.value);
    activityData.unshift(activity); //Add this activity to the data model
  }
};

function startActivityTimer() {
  timerButton.disabled = true;
  activityData[0].startTimer(); //grabs the most recent activity added to the data model

}
