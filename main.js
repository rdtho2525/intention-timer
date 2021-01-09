var activitySelect = document.querySelector("#activity-list");
var startButton = document.querySelector("#start-button");
var activityCard = document.querySelector("#activity-card");
var userGoal = document.querySelector("#goals");
var minutes = document.querySelector("#minutes");
var seconds = document.querySelector("#seconds");
var goalError = document.querySelector("#goal-error-message");
var numError = document.querySelector("#number-error-message");

activitySelect.addEventListener('click', function(event) {
  console.log(event.target.id);
  if (event.target.className != 'icon') {
    event.target.classList.toggle("default-color");
    event.target.firstChild.src = `./assets/${event.target.firstChild.id}-active.svg`;
  }
  else {
    event.target.parentNode.classList.toggle("default-color");
    event.target.src = `./assets/${event.target.id}-active.svg`;
  }
});

startButton.addEventListener('click', function(){
  if (checkInput() === true) {
    removeForm();
  }
});

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

function removeForm() {
  activityCard.classList.toggle("hidden");
};
