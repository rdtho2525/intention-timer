// var studyBtn = document.querySelector("#study");
// var meditateBtn = document.querySelector("#meditate");
// var exerciseBtn = document.querySelector("#exercise");
var activitySelect = document.querySelector(".activity-selection");
var startButton = document.querySelector("#start-button");
var activityList = document.querySelector("#activity-selector");
var inputForm = document.querySelector("form");

activitySelect.addEventListener('click', function(event) {
  event.target.classList.toggle("default-color");
  event.target.firstChild.src = `./assets/${event.target.firstChild.id}-active.svg`;
});

// startButton.addEventListener('click', removeForm);
//
// function removeForm() {
//   activitySelect.classList.toggle("hidden");
//   inputForm.classList.toggle("hidden");
// };
