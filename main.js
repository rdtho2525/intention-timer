var activitySelect = document.querySelector('#activityList');
var startButton = document.querySelector('#startButton');
var userGoal = document.querySelector('#goals');
var minutes = document.querySelector('#minutes');
var seconds = document.querySelector('#seconds');
var goalError = document.querySelector('#goalErrorMessage');
var numError = document.querySelector('#numberErrorMessage');
var activityTitle = document.querySelector('#activityTitle');
var activityForm = document.querySelector('#activityForm');
var currentActivity = document.querySelector('#currentActivity');
var timerButton = document.querySelector('#timerButton');
var timeRemaining = document.querySelector('#timeRemaining');
var chosenActivity = document.querySelector('#chosenActivity')
var logActivityButton = document.querySelector('#logActivity');
var pastActivityDefault = document.querySelector('#pastActivityDefaultMessage');
var pastCardList = document.querySelector('#pastActivities');
var currentChoice = document.getElementsByName('choice');
var createNewActivityButton = document.querySelector('#createNewActivityButton');

var currentCategory = '';
var activity;
var activityData;

window.addEventListener('load', setLocalStorage);
activitySelect.addEventListener('click', selectActivity);
startButton.addEventListener('click', startActivity);
timerButton.addEventListener('click', startActivityTimer);
logActivityButton.addEventListener('click', logActivity);
createNewActivityButton.addEventListener('click', createNewActivity);

function setLocalStorage() {
  if (localStorage.getItem('storedActivityData') === null) {
    activityData = [];
    var stringify = JSON.stringify(activityData);
    localStorage.setItem('storedActivityData', stringify)
  } else {
    hide(pastActivityDefault);
    unhide(pastCardList);
    displayLocalStorage();
  }
}

function displayLocalStorage() {
  var getLocalData = localStorage.getItem('storedActivityData');
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
  return element.classList.add('hidden');
}

function unhide(element) {
  return element.classList.remove('hidden');
}

function hideError(element) {
  return element.classList.add('invisible');
}

function unhideError(element) {
  return element.classList.remove('invisible');
}

function checkInput() {
  var validInput;

  if (userGoal.value === '') {
    unhideError(goalError);
    validInput = false;
  }

  if (minutes.value === '' || seconds.value === '' || isNaN(minutes.value) || isNaN(seconds.value)) {
    unhideError(numError);
    validInput = false;
  } else {
    hideError(goalError);
    hideError(numError);
    validInput = true;
  }
  return validInput;
}

function selectActivity() {
  var output;
  for (var i = 0; i < currentChoice.length; i++) {
    output = document.querySelector(`#${currentChoice[i].value}`);
    currentChoice[i].checked ? unhide(output) : hide(output);

    if (currentChoice[i].checked === true) {
      currentCategory = currentChoice[i].value;
      var colorClass = `${currentCategory}Color`;
      timerButton.classList.add(colorClass);
    }

  }
}

function updateButton() {
  timerButton.innerText = `COMPLETE!`;
  logActivityButton.classList.toggle('hidden');
}

function startActivity() {
  if (checkInput()) {
    activity = new Activity(currentCategory, userGoal.value, minutes.value, seconds.value);
    hide(activityForm);
    unhide(currentActivity);
    activityTitle.innerText = 'Current Activity';
    chosenActivity.innerText = activity.description;
    timeRemaining.innerText = `${(activity.minutes < 10 ? '0' : '') + activity.minutes}:${(activity.seconds < 10 ? '0' : '') + activity.seconds}`;
  }
};

function startActivityTimer() {
  timerButton.disabled = true;
  activity.startTimer(timeRemaining);
}

function logActivity() {
  hide(pastActivityDefault);
  hide(currentActivity);
  unhide(pastCardList);
  unhide(createNewActivityButton);
  activity.markComplete();
  activity.saveToStorage();
  activityTitle.innerText = 'Completed Activity';
  var listItem = document.createElement('li');
  listItem.classList.add('past-activity-card')
  listItem.innerHTML +=
    `<aside>
        <p id="pastActivityTitle" class="past-activity-title">${activity.category}</p>
        <p id="pastActivityTime" class="past-activity-time">${activity.minutes} MIN</p>
        <p id="pastActivityGoal" class="past-activity-goal">${activity.description}</p>
     </aside>
     <div class="past-activity-highlight ${activity.category}-highlight"></div>`;
  pastCardList.prepend(listItem);
};

function createNewActivity() {
  location.reload();
};
