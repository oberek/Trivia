/**
 * Created by Maciej on 1/26/2017.
 */
var triviaData;
var request = new XMLHttpRequest();
loadData();
var questionNumber = 0;
var score = 0;
var answers = [];
var previousCorrectAnswer = "";

function loadComplete(num) {
    document.getElementById('Header').innerHTML = "Question " + (questionNumber+1);
    triviaData = JSON.parse(request.responseText);
    if(questionNumber-1 >= 0)
        previousCorrectAnswer = triviaData.results[questionNumber-1].correct_answer;
    previous_answers = [];

    if(questionNumber<triviaData.results.length){
        document.getElementById("Question").innerHTML = triviaData.results[questionNumber].question;
        if(answers.length>0){
            previous_answers = answers.slice()
        }
        answers = triviaData.results[questionNumber].incorrect_answers;
        answers.push(triviaData.results[questionNumber].correct_answer);
        answers = shuffle(answers);
        document.getElementById("answer1").innerHTML = answers[0];
        document.getElementById("answer2").innerHTML = answers[1];
        document.getElementById("answer3").innerHTML = answers[2];
        document.getElementById("answer4").innerHTML = answers[3];
        questionNumber++;
        if (answers.length == 1) {
            document.getElementById("answer1").innerHTML = answers[0];
            document.getElementById("answer2").style.visibility = 'hidden';
            document.getElementById("answer3").style.visibility = 'hidden';
            document.getElementById("answer4").style.visibility = 'hidden';
        } else if (answers.length == 2) {
            document.getElementById("answer2").style.visibility = 'visible';
            document.getElementById("answer1").innerHTML = answers[0];
            document.getElementById("answer2").innerHTML = answers[1];
            document.getElementById("answer3").style.visibility = 'hidden';
            document.getElementById("answer4").style.visibility = 'hidden';
        } else if (answers.length == 3) {
            document.getElementById("answer3").style.visibility = 'visible';

            document.getElementById("answer1").innerHTML = answers[0];
            document.getElementById("answer2").innerHTML = answers[1];
            document.getElementById("answer3").innerHTML = answers[2];

            document.getElementById("answer4").style.visibility = 'hidden';

        } else if (answers.length == 4) {
            document.getElementById("answer2").style.visibility = 'visible';
            document.getElementById("answer3").style.visibility = 'visible';
            document.getElementById("answer4").style.visibility = 'visible';
            document.getElementById("answer1").innerHTML = answers[0];
            document.getElementById("answer2").innerHTML = answers[1];
            document.getElementById("answer3").innerHTML = answers[2];
            document.getElementById("answer4").innerHTML = answers[3];
        }
        console.log("Their answer: " + previous_answers[num]);
        console.log("Correct answer: " +previousCorrectAnswer);
        if(previous_answers[num] == triviaData.results[questionNumber-2].correct_answer){
            score += 10;
        }
        document.getElementById("score").innerHTML = score;
        startTimer(10);
    }
    else{
        alert("NEW DATA NOW!");
        questionNumber =0;
        loadData();
    }
}
function loadData(num){
    if(num == null)
        request.open('GET','https://opentdb.com/api.php?amount=50');
    else{
        request.open('GET','https://opentdb.com/api.php?amount=50&category='+num);
    }
    request.onload = loadComplete;
    request.send();
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
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

function startTimer(duration) {
    clearInterval();
    var seconds_left = duration;
    var interval = setInterval(function() {

        //console.log(seconds_left);
        document.getElementById('TimerLabel').innerHTML = seconds_left;

        if (seconds_left <= 0)
        {
            document.getElementById('TimerLabel').innerHTML = 'You are ready';
            clearInterval(interval);
        }
        seconds_left--;
    }, 1000);
}
