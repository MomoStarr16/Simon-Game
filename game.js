var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var chosenRandomColour;
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function() {

  if (!started) {

  $("h1").text("Level " + level);
  nextSequence();
  started = true;
  console.log(gamePattern);
}});

function nextSequence(){
  userClickedPattern = [];
  level++;
  var randomNumber = 1 + Math.floor(Math.random() * 3);
  var chosenRandomColour = buttonColours[randomNumber];
  $("h1").text("Level " + level);

  console.log(randomNumber);
  console.log(chosenRandomColour);
  gamePattern.push(chosenRandomColour);

  $("#" + chosenRandomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + chosenRandomColour + ".mp3");
    audio.play();
};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout( function () {
    $("#" + currentColour).removeClass("pressed");}, 100);
};

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");

      setTimeout( function () {
        $("body").removeClass("game-over");}, 100);

      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();
    }
}
