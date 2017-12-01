// vars
var seconds = 0;
var timerTime = 25;
var breakTime = 5;
var interval;
var isBreak = false;
var pomodoros = 0;
var pomodoroNumber = 4;
var checksHtml = "";
var longBreakTime = 30;
var isLongBreak = false;
var sounds = {
  wind: {
    sound: new Howl({
      src: ['sounds/wind.mp3']
    })
  },
  tick: {
    sound: new Howl({
      src: ['sounds/tick.mp3'],
      loop: true
    })
  },
  ding: {
    sound: new Howl({
      src: ['sounds/ding.mp3']
    })
  }
};
// enable popover for 'what is?'
$(function () {
  $('[data-toggle="popover"]').popover()
})
// timers
function timer() {
  isBreak = false;
  if ($("#timer").text() === "start") {
    seconds = timerTime * 60;
    $("#tomato").replaceWith($("#tomato").clone(true));
    $("#tomato").css({ "animation-timing-function": "linear", "animation-name": "animate", "animation-fill-mode": "backwards", "animation-duration": timerTime * 60 + "s", "animation-play-state": "running" });
    start();
  } else if ($("#timer").text() === "resume") {
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
  for (var i = 0; i < pomodoros; i++) {
    checksHtml += '<i class="fa fa-check" aria-hidden="true"></i>';
  }
  $("#checks").html(checksHtml);
  if (pomodoros === pomodoroNumber) {
    isLongBreak = true;
    seconds = longBreakTime * 60;
    $("#tomato").replaceWith($("#tomato").clone(true));
    $("#tomato").css({ "animation-timing-function": "linear", "animation-name": "animate", "animation-fill-mode": "backwards", "animation-duration": longBreakTime * 60 + "s", "animation-play-state": "running" });
    start();
  } else {
    isBreak = true;
    seconds = breakTime * 60;
    $("#tomato").replaceWith($("#tomato").clone(true));
    $("#tomato").css({ "animation-timing-function": "linear", "animation-name": "animate", "animation-fill-mode": "backwards", "animation-duration": breakTime * 60 + "s", "animation-play-state": "running" });
    start();
  }
}
// countdown
function countDown() {
  seconds--;
  if (seconds === 0) {
    sounds['tick'].sound.pause();
    sounds['ding'].sound.play();
    clearInterval(interval);
    if (isBreak) {
      seconds = timerTime * 60;
      isBreak = false;
      $("#tomato").replaceWith($("#tomato").clone(true));
      $("#tomato").css({ "animation-timing-function": "linear", "animation-duration": timerTime * 60 + "s", "animation-play-state": "running" });
      start();
    } else if (isLongBreak) {
      seconds = timerTime * 60;
      isLongBreak = false;
      pomodoros = 0;
      checksHtml = "";
      $("#checks").html(checksHtml);
      $("#tomato").replaceWith($("#tomato").clone(true));
      $("#tomato").css({ "animation-timing-function": "linear", "animation-duration": timerTime * 60 + "s", "animation-play-state": "running" });
      start();
    } else {
      breakTimer();
    }
  }
}
// start the timer
function start() {
  sounds['tick'].sound.play();
  if (isBreak) {
    $('#message').text("Break time");
  } else if (isLongBreak) {
    $('#message').text("Take a long break")
  } else {
    $('#message').text("Time to work");
  }
  $("#timer").text("pause");
  interval = setInterval("countDown()", 1000);
}
// pause the timer
function pause() {
  sounds['tick'].sound.pause();
  $('#message').text("Paused...");
  $("#timer").text("resume");
  clearInterval(interval);
}
// reset the timer (wind it up!)
function reset() {
  sounds['tick'].sound.pause();
  sounds['wind'].sound.play();
  $("#tomato").replaceWith($("#tomato").clone(true));
  $("#tomato").css({ "animation-timing-function": "cubic-bezier(0.39, 0.23, 0.43, 0.96)", "animation-name": "wind", "animation-duration": 1.4 + "s", "animation-play-state": "running" });
  $('#message').text("Pomodoro Clock");
  $("#timer").text("start");
  setTimeout(function () {
    $("#tomato").css("animation-play-state", "paused");
  }, 1400);
  clearInterval(interval);
  seconds = timerTime * 60;
  pomodoros = 0;
  isBreak = false;
  isLongBreak = false;
  checksHtml = "";
  $("#checks").html(checksHtml);
}
// settings
function increaseTimer() {
  if (timerTime < 1440) {
    timerTime++;
    $("#time").text(timerTime);
  } else {
    $('#message').text("Maxium time reached");
  }
}
function decreaseTimer() {
  if (timerTime > 1) {
    timerTime--;
    $("#time").text(timerTime);
  } else {
    $('#message').text("Minimum time reached");
  }
}
function increaseBreak() {
  if (breakTime < 1440) {
    breakTime++;
    $("#breakTime").text(breakTime);
  } else {
    $('#message').text("Maxium time reached");
  }
}
function decreaseBreak() {
  if (breakTime > 1) {
    breakTime--;
    $("#breakTime").text(breakTime);
  } else {
    $('#message').text("Minimum time reached");
  }
}
function increaseLongBreak() {
  if (longBreakTime < 1440) {
    longBreakTime++;
    $("#longBreakTime").text(longBreakTime);
  } else {
    $('#message').text("Maxium time reached");
  }
}
function decreaseLongBreak() {
  if (longBreakTime > 1) {
    longBreakTime--;
    $("#longBreakTime").text(longBreakTime);
  } else {
    $('#message').text("Minimum time reached");
  }
}
function increasePomodoros() {
  if (pomodoroNumber < 10) {
    pomodoroNumber++;
    $("#pomodoros").text(pomodoroNumber);
  } else {
    $('#message').text("Maxium pomodoros");
  }
}
function decreasePomodoros() {
  if (pomodoroNumber > 1) {
    pomodoroNumber--;
    $("#pomodoros").text(pomodoroNumber);
  } else {
    $('#message').text("Minimum pomodoros");
  }
}