var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour, name, started = false, level = 0, index = 0;


var buttonColours = ["red", "blue", "green", "yellow"];


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*3) + 1;
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  //var audio = new Audio("sounds/" + randomChosenNumber + ".mp3");
  //audio.play();
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
  //$("#" + currentColour).delay(100).removeClass("pressed");
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      console.log("Success");
      if(gamePattern.length === userClickedPattern.length){
        setTimeout(nextSequence(), 100);
      }

    }
    else{
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      var wrongaudio = new Audio("sounds/wrong.mp3");
      wrongaudio.play();
      $("h1").text("Game Over! Press Any Key to Restart");
      startOver();
      console.log("Wrong");
    }


}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
