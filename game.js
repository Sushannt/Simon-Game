//this array holds the colors of the 4 buttons
var buttonColors = ["red","blue","green","yellow"];

// array declared game pattern
var gamePattern = [];

//array declared userClickedPattern
var userClickedPattern = [];


var started = false;

var level = 0;
// nextSequence funtion will generate a random number and assign it to variable randomNumber
// step 7 on keyboard press game starts
$(document).keypress(function() {
  startGame();
});

//one add-on to the simon game code
function startGame(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
}

//step 4 -
$(".btn").click(function(){
  // var userChosenColour = (event.target.id);
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);


  //step 8
  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("success");

    if(userClickedPattern.length === gamePattern.length){

      // after a delay of 1000 miliseconds the nextSequence() is called in order to run the game further
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
}

  else{
    // console.log("wrong");
    // step9 - game over
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);

    $("h1").text("Game Over, Press Any Key To Restart");

    //step 10
    startOver();
}
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];

    //players don't have to refresh - they can just press a key and the game will restart
    $(document).keypress(function() {
      startGame();
    });
}

function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("level "+level);

    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

//Step 3  - on click of randomly picked button , the sound gets played and the button blink

  // const audio = new Audio("sounds/"+randomChosenColour+".mp3");
  // audio.play();
  // playSound function defined in step 5 below
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
};



// Step 5 - this will play the sounds asigned to the button
  function playSound(name){
  const audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


//Step 6
  function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");

    setTimeout(function(){
      $("." + currentColour).removeClass("pressed")}, 100);
  }
