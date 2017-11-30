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
    $("#tomato").replaceWith($("#tomato").clone(true));
   $("#tomato").css({"animation-name": "animate", "animation-fill-mode": "backwards","animation-duration": timerTime + "s", "animation-play-state": "running"});
    start();
  } else if ($("#timer").text() === "resume") {
    $('h2').text("GO!");
    $("#tomato").css("animation-play-state", "running");
    start();
  } else {
    $("#tomato").css("animation-play-state", "paused");
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
    $("#tomato").replaceWith($("#tomato").clone(true));
    $("#tomato").css({"animation-name": "animate", "animation-fill-mode": "backwards", "animation-duration": longBreakTime + "s", "animation-play-state": "running"});
    start();
  } else {
    isBreak = true;
    seconds = breakTime;
    $("#tomato").replaceWith($("#tomato").clone(true));
    $("#tomato").css({"animation-name": "animate", "animation-fill-mode": "backwards", "animation-duration": breakTime + "s", "animation-play-state": "running"});
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
      $("#tomato").replaceWith($("#tomato").clone(true));
      $("#tomato").css({"animation-duration": timerTime + "s", "animation-play-state": "running"});
      start();
    } else if (isLongBreak) {
      seconds = timerTime;
      isLongBreak = false;
      pomodoros = 0;
      checksHtml = "";
      $("#checks").html(checksHtml);
      $("#tomato").replaceWith($("#tomato").clone(true));
      $("#tomato").css({"animation-duration": timerTime + "s", "animation-play-state": "running"});
      start();
    } else {
      breakTimer();
    }
  }
}
// start
function start() {
  if(isBreak){
    $('h2').text("Break time");
  } else if (isLongBreak) {
    $('h2').text("Take a long break")
  } else{
    $('h2').text("Time to work");
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