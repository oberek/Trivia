/**
 * Created by Maciej on 1/26/2017.
 */
var triviaData;
var request = new XMLHttpRequest();
loadData();
var questionNumber = 0;

function loadComplete(evt) {
    //console.log("It does it");
    triviaData = JSON.parse(request.responseText);
    console.log(triviaData);
    if(questionNumber<triviaData.results.length){
        document.getElementById("Question").innerHTML = triviaData.results[questionNumber].question;
        var answers = triviaData.results[questionNumber].incorrect_answers;
        answers.push(triviaData.results[questionNumber].correct_answer);
        answers = shuffle(answers);
        document.getElementById("answer1").innerHTML = answers[0];
        document.getElementById("answer2").innerHTML = answers[1];
        document.getElementById("answer3").innerHTML = answers[2];
        document.getElementById("answer4").innerHTML = answers[3];
        //alert("Correct Answer: " + triviaData.results[questionNumber].correct_answer);
        questionNumber++;
    }
    else{
        //alert("NEW DATA NOW!");
        questionNumber = 0;
        loadData();
    }
}
function startTimer(duration) {
    var seconds_left = duration;
    var interval = setInterval(function() {

        console.log(seconds_left);

        if (seconds_left <= 0)
        {
            document.getElementById('TimerLabel').innerHTML = 'You are ready';
            clearInterval(interval);
        }
        seconds_left--;
    }, 1000);
}
function loadData(){
    request.open('GET','https://opentdb.com/api.php?amount=50');
    request.onload = loadComplete;
    request.send();
}

function saveUserData(){
    //document.cookie
}

function shuffle(array) {
    // Essential Copy Pasting from StackOverflow
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}