var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 1;
let currentLevel = 0;

// Detect Press works only when pattern is 0

$(document).keypress(function (e) {
  $("h1").text("Level " + level);
  if (gamePattern.length == 0) {
    t = true;
    rn();
  }
});

//Random pattern is generated
function rn() {
  var a = Math.floor(Math.random() * 4);
  var randomChosenColour = a;
  var randomColor = buttonColours[randomChosenColour];
  gamePattern.push(randomColor);
  console.log("Pushed " + randomColor + " into gamePattern");
  console.log("game Pattern is " + gamePattern);
  $("#" + randomColor).fadeOut(100);
  var audio = new Audio("sounds/" + randomColor + ".mp3");
  audio.play();
  $("#" + randomColor).fadeIn(100);
}

// User Clicks
$(".btn").click(function (event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  var audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();
  console.log(
    "User has chosen " +
      userChosenColor +
      " the user array is " +
      userClickedPattern
  );
  $("." + userChosenColor).addClass("pressed");
  setTimeout(function () {
    $("." + userChosenColor).removeClass("pressed");
  }, 100);
  checkAnswer();
});

// check
function checkAnswer() {
  var t = true;
  console.log("currentlvl is " + currentLevel);

  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    currentLevel++;
    console.log(
      "Same, new clevel is " +
        currentLevel +
        "game pattern length is " +
        gamePattern.length
    );
  } else {
    console.log("curr level is " + currentLevel);
    console.log("gamepattern[curr] is " + gamePattern[currentLevel]);
    console.log("userpatter[curr] is " + userClickedPattern[currentLevel]);
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    currentLevel++;
    gamePattern = [];
    startOver();
    t = false;
  }
  if (currentLevel == gamePattern.length && t) {
    console.log("done");
    level += 1;
    $("h1").text("Level " + level);
    currentLevel = 0;
    userClickedPattern = [];
    console.log(
      "curr level reset: " +
        currentLevel +
        " userArray reset " +
        userClickedPattern
    );
    rn();
  }
}
function startOver() {
  userClickedPattern = [];
  level = 1;
  currentLevel = 0;
}
