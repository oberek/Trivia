var triviaData;
var request = new XMLHttpRequest();
loadData();
var questionNumber = 0;
var realQuestionNumber = 0;
var score = 0;
var answers = [];
var previousCorrectAnswer = "";

function loadComplete(num) {
    realQuestionNumber++;
    document.getElementById('Header').innerHTML = "Question " + (realQuestionNumber);
    triviaData = JSON.parse(request.responseText);
    console.log(triviaData);
    if (questionNumber - 1 >= 0)
        previousCorrectAnswer = triviaData.results[questionNumber - 1].correct_answer;
    previous_answers = [];

    if (questionNumber < triviaData.results.length) {
        document.getElementById("Question").innerHTML = triviaData.results[questionNumber].question;
        if (answers.length > 0) {
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
        console.log("Correct answer: " + previousCorrectAnswer);
        if (previous_answers[num] == triviaData.results[questionNumber - 2].correct_answer) {
            score += 10;
        }
        document.getElementById("score").innerHTML = score;
    }
    else {
        questionNumber = 0;
        loadData();
    }
}
function loadData() {
    var url =  'https://opentdb.com/api.php?amount=50';
    if (sessionStorage.getItem('category') >8)
        url = url + '&category=' + sessionStorage.getItem('category');
    if (sessionStorage.getItem('difficulty') != null)
        url = url + '&difficulty=' + sessionStorage.getItem('difficulty');
    request.open('GET', url);

    request.onload = loadComplete;
    request.send();
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

function timer(duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //display.textContent = minutes + ":" + seconds;
        document.getElementById("TimerLabel").innerHTML = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
            sessionStorage.setItem('score', score);
            window.location = "splash.html";
        }
    }, 1000);
}

window.onload = function () {
    var aMinute = 6;
    timer(aMinute);
};
