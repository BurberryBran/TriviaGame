// Variables
// ========================================================

// Variables for Score.
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var questionCount = 0;
var correct = false;

// Timer Variables
var timeLeft = 30;
var intervalID;

// Trivia questions array.
var triviaQuestions = [
    { q: "What is the name of Han Solo's ship?", 
        answers: [
            {a: "Star Cruiser", c: "incorrect"}, 
            {a: "Millennium Falcon", c: "correct"}, 
            {a: "Death Star", c: "incorrect"}, 
            {a: "Han's Space Ship", c: "incorrect"}]},

    { q: "What is the battle armor used by Jango Fett?", 
        answers: [
            {a: "Steel Battle Armor", c: "incorrect"}, 
            {a: "Jedi Knight Armor", c: "incorrect"}, 
            {a: "Mandalorian Armor", c: "correct"}, 
            {a: "General Grievious Left Hand", c: "incorrect"}]},

    { q: "Which Jedi Master Is a green alien?", 
        answers: [
            {a: "Kit Fisto", c: "correct"}, 
            {a: "Saesee Tiin", c: "incorrect"}, 
            {a: "Agen Kolar", c: "incorrect"}, 
            {a: "Obi Wan Kenobi", c: "incorrect"}]},

    { q: "Which young Jedi Knight becomes Darth Vader?", 
        answers: [
            {a: "Darth Maul", c: "incorrect"}, 
            {a: "Obi Wan Kenobi", c: "incorrect"}, 
            {a: "Anakin Skywalker", c: "correct"}, 
            {a: "Jar Jar Binks", c: "incorrect"}]},

    { q: "Which planet is home to Chewbacca and the Wookies?", 
        answers: [
            {a: "Kashyyyk", c: "correct"}, 
            {a: "Tatooine", c: "incorrect"}, 
            {a: "Mustafar", c: "incorrect"}, 
            {a: "Naboo", c: "incorrect"}]},

    { q: "Who is Luke and Leia's Mother?", 
        answers: [
            {a: "Daneris Stormborne", c: "incorrect"}, 
            {a: "Padme Amidala", c: "correct"}, 
            {a: "Sansa Stark", c: "incorrect"}, 
            {a: "Aayla Secura", c: "incorrect"}]},

    { q: "Jedi Council consists of how many members?", 
        answers: [
            {a: "10", c: "incorrect"}, 
            {a: "30", c: "incorrect"}, 
            {a: "6", c: "incorrect"}, 
            {a: "12", c: "correct"}]},
        
    { q: "What is the famous weapon used by Jedi Knights throughout the Star Wars series?", 
        answers: [
            {a: "Saber Swords", c: "incorrect"}, 
            {a: "Energy Swords", c: "incorrect"}, 
            {a: "Light Sabers", c: "correct"}, 
            {a: "Energy Sabers", c: "incorrect"}]},

    { q: "After episode III Revenge of the Sith, Clone Trooper armor changes and was given a new name. What was the new name for Clone Troopers used throughout episodes 4-6?", 
        answers: [
            {a: "Mandolorian", c: "incorrect"}, 
            {a: "Storm Trooper", c: "correct"}, 
            {a: "Super Trooper", c: "incorrect"}, 
            {a: "Death Trooper", c: "incorrect"}]},

    { q: "What were the last words spoken in The Empire Strikes Back?", 
        answers: [
            {a: "Untill Next Time", c: "incorrect"}, 
            {a: "Nothing", c: "incorrect"}, 
            {a: "May the Force be with you", c: "correct"}, 
            {a: "The end.", c: "incorrect"}]}
];

var imagesForAnswers = [
    "assets/images/Question01.jpg", 
    "assets/images/Question02.jpg", 
    "assets/images/Question03.jpg", 
    "assets/images/Question04.jpg", 
    "assets/images/Question05.jpg", 
    "assets/images/Question06.jpg", 
    "assets/images/Question07.jpg", 
    "assets/images/Question08.jpg", 
    "assets/images/Question09.jpg", 
    "assets/images/Question10.jpg"
];

// Variables for advancing question and answer selector.
var triviaIndex = 0;
var questionIndex = "";
var answerIndex = [];
var currentAnswer = "";


// Game State Variables
var gameRunning = false;
var questionPage = false;


// Functions
// ==========================================================

// Start game function.
$("#startButton").on("click", function() {
    gameReset();
})

// Game Reset Function for initial game start and for resetting the game with the restart button.
function gameReset() {
    $("#question-image, #answer-image").hide();
    $(".answerOptions, #question-text").empty();
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    unansweredQuestions = 0;
    questionCount = 0;
    triviaIndex = 0;
    questionIndex = "";
    answerIndex = [];
    gameRunning = true;
    questionPage = true;
    toQuestionPage();
};

// Question selector to run on loading of the question page.
function questionSelector() {
    
    // Clearing fields from previous page.
    $(".answerOptions, #question-text").empty();

    // Hiding the Welcome/Answer Image and showing the Question text.
    $("#question-image, #answer-image").hide();
    $("#question-text").show();

    // Selecting questions and writing them into question field
    questionIndex = triviaQuestions[triviaIndex].q;

    // console.log("Current Question: " + questionIndex);
    $("#question-text").html("<p>" + questionIndex + "</p>");

    // Selecting corresponding answers and writing them into answer fields.
    answerIndex = [triviaQuestions[triviaIndex].answers[0].a, triviaQuestions[triviaIndex].answers[1].a, triviaQuestions[triviaIndex].answers[2].a, triviaQuestions[triviaIndex].answers[3].a];
    answerCheck = [triviaQuestions[triviaIndex].answers[0].c, triviaQuestions[triviaIndex].answers[1].c, triviaQuestions[triviaIndex].answers[2].c, triviaQuestions[triviaIndex].answers[3].c];
    // console.log("Current Options: " + answerIndex);
    for (i = 0; i < 4; i++) {
        // $(".answerOptions-text").append(answerIndex[i] + "<br>");
        var answerButton = $("<button>");
        answerButton.addClass("answerButton");
        answerButton.attr("answer-value", answerCheck[i]);
        answerButton.text(answerIndex[i]);
        $(".answerOptions").append(answerButton);
    }
    currentAnswer = answerCheck.indexOf("correct");
    // console.log("Index of current answer: " + currentAnswer);
    currentAnswer = answerIndex[currentAnswer];
    // console.log("Text of correct answer: " + currentAnswer);

}

// Timer Function
function countdownTimer() {
    timeLeft--;

    if (questionPage === true) {
        $("#timer-text").html("Time Remaining: " + timeLeft);
    } else {
        $("#timer-text").html("Time Until Next Question: " + timeLeft);
    }
    // console.log(timeLeft)
    if (timeLeft === 0) {
        gameChangePage();
    }
}

// Change Page Function 
function gameChangePage() {
    
    if (questionCount === 10) {
        toEndPage();
    }
    
    else if (questionPage === false) {
        toQuestionPage();
        questionPage = true;
        // console.log(questionPage);
    }  
    
    else {
        unansweredQuestions++;
        console.log("Unanswered Questions: " + unansweredQuestions);
        toAnswerPage();
        questionPage = false;
        // console.log(questionPage);
    }
}

// Function to change to question page
function toQuestionPage() {
    questionSelector();
    timeLeft = 30;
    $("#timer-text").html("Time Remaining: " + timeLeft);
    correct = "";
    clearInterval(intervalID);
    intervalID = setInterval (countdownTimer, 1000);
}

// Function to change to answer page
function toAnswerPage() {
    triviaIndex++;
    timeLeft = 10;
    $("#timer-text").html("Time Until Next Question: " + timeLeft);
    $(".answerOptions, #question-text").empty();
    $("#question-text").hide();
    $("#answer-image").attr("src", imagesForAnswers[questionCount]);
    $("#answer-image").show();
    if (correct === true) {
        $(".answerOptions").append("Correct! " + currentAnswer + " was the correct answer.")
    } else if (correct === false) {
        $(".answerOptions").append("You are incorrect. " + currentAnswer + " was the correct answer.")
    } else {
        $(".answerOptions").append("You did not make a guess. " + currentAnswer + " was the correct answer.")
    }
    questionCount++;
    console.log("Previous question: #" + questionCount);
    clearInterval(intervalID);
    intervalID = setInterval (countdownTimer, 1000);
}

// Function to change to end page
function toEndPage () {
    clearInterval(intervalID);
    $(".answerOptions, #question-text, #timer-text").empty();
    $(".answerOptions").html("<h4>Your final results:</h4> <p>Correct Answers: " + correctAnswers + "</p><p>Incorrect Answers: " + incorrectAnswers + "</p><p>Unanswered Questions: " + unansweredQuestions)
    var restartButton = $("<button>")
    restartButton.addClass("restartButton")
    restartButton.text("Click here to restart the quiz!")
    $(".answerOptions").append(restartButton);
    $(document).on("click", ".restartButton", function() {
        gameReset();
    });

}


// Game Processes
// ==========================================================

// Document Ready Function to run on page load.
$(document).ready(function(){

    // Click function for answer questions
    $(document).on("click", ".answerButton", function() {
        // console.log($(this).attr("answer-value"));
        var answerGiven = ($(this).attr("answer-value"));
        console.log(answerGiven);

        if (answerGiven === "correct") {
            correctAnswers++;
            correct = true;
            console.log("Correct Answers " + correctAnswers);
            toAnswerPage();
            questionPage = false;
        } 
        
        else {
            incorrectAnswers++;
            correct = false;
            console.log("Incorrect Answers " + incorrectAnswers);
            toAnswerPage();
            questionPage = false;
        }



        
    })
});
