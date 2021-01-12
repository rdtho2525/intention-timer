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
var currentActivity = document.querySelector("#currentActivity");
var timerButton = document.querySelector("#timerButton");
var timeRemaining = document.querySelector("#timeRemaining");
var chosenActivity = document.querySelector("#chosenActivity")
var logActivityButton = document.querySelector("#logActivity");
var pastActivityDefault = document.querySelector("#past-activity-default-message");
var pastCardList = document.querySelector("#pastActivities");
var currentChoice = document.getElementsByName("choice");
var pastActivityCard = document.querySelector("#pastActivity");
var createNewActivityButton = document.querySelector("#createNewActivityButton");

// GLOBAL VARIABLES------
var activity;
var currentCategory = "";
var activityData; // I add created this global variable to hold all our activities so we have a stable data model.


// EVENT LISTENERS--------
window.addEventListener('load', setLocalStorage);
activitySelect.addEventListener('click', selectActivity); //needs reviewing
activitySelect.addEventListener('click', selectOption); //needs reviewing
startButton.addEventListener('click', startActivity);
timerButton.addEventListener('click', startActivityTimer);
logActivityButton.addEventListener('click', logActivity);
createNewActivityButton.addEventListener('click', createNewActivity);
// FUNCTIONS----
function setLocalStorage() {
  if (localStorage.getItem("storedActivityData") === null) {
    activityData = [];
    var stringify = JSON.stringify(activityData);
    localStorage.setItem("storedActivityData", stringify)
  } else {
    hide(pastActivityDefault);
    unhide(pastCardList);
    getLocalStorage();
  }
}

function getLocalStorage() {
  var getLocalData = localStorage.getItem("storedActivityData");
  var parsedLocalData = JSON.parse(getLocalData);
  if (!parsedLocalData.length) {
    return
  }
  for (i = 0; i < parsedLocalData.length; i++) {
    pastCardList.innerHTML +=
    `<li class="past-activity-card">
      <aside>
        <p id="pastActivityTitle" class="past-activity-title">${parsedLocalData[i].category}</p>
        <p id="pastActivityTime" class="past-activity-time">${parsedLocalData[i].minutes} MIN</p>
        <p id="pastActivityGoal" class="past-activity-goal">${parsedLocalData[i].description}</p>
     </aside>
     <div class="past-activity-highlight ${parsedLocalData[i].category}-highlight"></div>
    </li>`;
  }
}

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

function updateButton() {
  timerButton.innerText = `COMPLETE!`;
  logActivityButton.classList.toggle("hidden");
}

function startActivity() {
  if (checkInput()) {
    activity = new Activity(currentCategory, userGoal.value, minutes.value, seconds.value);
    hide(activityForm);
    unhide(currentActivity);
    activityTitle.innerText = 'Current Activity';
    chosenActivity.innerText = activity.description;
    timeRemaining.innerText = `${(activity.minutes < 10 ? "0" : "") + activity.minutes}:${(activity.seconds < 10 ? "0" : "") + activity.seconds}`
  }
};

function startActivityTimer() {
  timerButton.disabled = true;
  activity.startTimer();
};

function logActivity() {
  hide(pastActivityDefault);
  unhide(pastCardList);
  hide(currentActivity);
  unhide(createNewActivityButton);
  activity.markComplete();
  activityTitle.innerText = 'Completed Activity';
  activity.saveToStorage();
  pastCardList.innerHTML +=
  `<li class="past-activity-card">
    <aside>
        <p id="pastActivityTitle" class="past-activity-title">${activity.category}</p>
        <p id="pastActivityTime" class="past-activity-time">${activity.minutes} MIN</p>
        <p id="pastActivityGoal" class="past-activity-goal">${activity.description}</p>
     </aside>
     <div class="past-activity-highlight ${activity.category}-highlight"></div>
  </li>`;
};

function createNewActivity() {
  location.reload();
};
