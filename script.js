/**
 * Created by Maciej on 1/26/2017.
 */
var triviaData;
var request = new XMLHttpRequest();
loadData();

function loadComplete(evt) {
    console.log("IM HERE!");
    triviaData = JSON.parse(request.responseText);
    console.log(triviaData);
    document.getElementById("JSON").innerHTML = triviaData;
}
function loadData(){
    request.open('GET','https://opentdb.com/api.php?amount=15');
    request.onload = loadComplete;
    request.send();
}

