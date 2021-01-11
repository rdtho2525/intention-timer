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
var logActivityButton = document.querySelector("#logActivity");
var pastActivityDefault = document.querySelector("#past-activity-default-message");
var pastCardList = document.querySelector("#past-activities");
var currentChoice = document.getElementsByName("choice");
var tempActivityData = document.getElementsByName("activity-data");
var createNewActivityButton = document.querySelector("#createNewActivityButton");

// GLOBAL VARIABLES------
var currentCategory = "";
var activityData = []; // I add created this global variable to hold all our activities so we have a stable data model.


// EVENT LISTENERS--------
activitySelect.addEventListener('click', selectActivity); //needs reviewing
activitySelect.addEventListener('click', selectOption); //needs reviewing
startButton.addEventListener('click', startActivity);
timerButton.addEventListener('click', startActivityTimer);
logActivityButton.addEventListener('click', logActivity);
createNewActivityButton.addEventListener('click', createNewActivity);

// FUNCTIONS----
function hide(element) {
  return element.classList.add('hidden')
}

function unhide(element) {
  return element.classList.remove('hidden')
}

function hideError(element) {
  return element.classList.add('invisible')
}

function unhideError(element) {
  return element.classList.remove('invisible')
}

function selectOption() {
  for (i = 0; i < currentChoice.length; i++) {
    output = document.querySelector(`#${currentChoice[i].value}`);
    currentChoice[i].checked ? unhide(output) : hide(output);
  }
}

function checkInput() {
  var validInput;
  if (userGoal.value === "") {
    unhideError(goalError)
    validInput = false
  }
  if (minutes.value === "" || seconds.value === "" || isNaN(minutes.value) || isNaN(seconds.value)) {
    unhideError(numError)
    inputIsGood = false
  } else {
    hideError(goalError);
    hideError(numError)
    validInput = true
  }
  return validInput
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
  if (checkInput()) {
    hide(activityForm);
    unhide(createActivity);
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
};

function logActivity() {
  hide(pastActivityDefault);
  unhide(pastCardList);
  hide(createActivity);
  unhide(createNewActivityButton);
  activityTitle.innerText = 'Completed Activity';
  var newCard = document.createElement('li');
  newCard.classList.add('past-activity-card');
  newCard.innerHTML=
  `  <aside>
        <p id="pastActivityTitle" class="past-activity-title">${activityData[0].category}</p>
        <p id="pastActivityTime" class="past-activity-time">${activityData[0].minutes} MIN</p>
        <p id="pastActivityGoal" class="past-activity-goal">${activityData[0].description}</p>
     </aside>
     <div class="past-activity-highlight ${activityData[0].category}-highlight"></div>
  `;
  pastCardList.appendChild(newCard);
};

function createNewActivity() {
  location.reload();
};
