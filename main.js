// vars
var seconds = 0;
var timerTime = 5;
var breakTime = 2;
var interval;
var isBreak = false;
var pomodoros = 0;
var pomodoroNumber = 4;
var checksHtml = "";
var longBreakTime = 5;
var isLongBreak = false;
// timer
function timer() {
  isBreak = false;
  if ($("#timer").text() === "start") {
    $('h2').text("GO!");
    seconds = timerTime;
    start();
  } else if ($("#timer").text() === "resume") {
    $('h2').text("GO!");
    start();
  } else {
    pause();
  }
}
function breakTimer() {
  checksHtml = "";
  pomodoros++;
  for(var i = 0; i < pomodoros; i++){
    checksHtml += '<i class="fa fa-check" aria-hidden="true"></i>';
  }
  $("#checks").html(checksHtml);
  if(pomodoros === pomodoroNumber){
    isLongBreak = true;
    seconds = longBreakTime;
    start();
  } else {
    isBreak = true;
    seconds = breakTime;
    start();
  }
}
// countdown
function countDown() {
  seconds--;
  $("h1").text(seconds);
  if (seconds === 0) {
    clearInterval(interval);
    if (isBreak) {
      seconds = timerTime;
      isBreak = false;
      start();
    } else if (isLongBreak) {
      seconds = timerTime;
      isLongBreak = false;
      pomodoros = 0;
      checksHtml = "";
      $("#checks").html(checksHtml);
      start();
    } else {
      breakTimer();
    }
  }
}
// start
function start() {
  if(isBreak){
    $('h2').text("Break time!");
  } else if (isLongBreak) {
    $('h2').text("Take a long break!")
  } else{
    $('h2').text("Go!");
  }
  $("#timer").text("pause");
  interval = setInterval("countDown()", 1000);
}
function pause() {
  $('h2').text("Paused...");
  $("#timer").text("resume");
  clearInterval(interval);
}
function reset() {
  $('h2').text("");
  $("#timer").text("start");
  clearInterval(interval);
  seconds = timerTime;
  $("h1").text(seconds);
  pomodoros = 0;
  isBreak = false;
  isLongBreak = false;
  checksHtml = "";
  $("#checks").html(checksHtml);
}
function increaseTimer() {
  timerTime++;
  $("#time").text(timerTime);
  $("h1").text(timerTime);
}
function decreaseTimer() {
  timerTime--;
  $("#time").text(timerTime);
  $("h1").text(timerTime);
}
function increaseBreak() {
  breakTime++;
  $("#breakTime").text(breakTime);
}
function decreaseBreak() {
  breakTime--;
  $("#breakTime").text(breakTime);
}
function increaseLongBreak() {
  longBreakTime++;
  $("#longBreakTime").text(longBreakTime);
}
function decreaseLongBreak() {
  longBreakTime--;
  $("#longBreakTime").text(longBreakTime);
}
function increasePomodoros() {
  pomodoroNumber++;
  $("#pomodoros").text(pomodoroNumber);
}
function decreasePomodoros() {
  pomodoroNumber--;
  $("#pomodoros").text(pomodoroNumber);
}