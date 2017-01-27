/**
 * Created by Maciej on 1/26/2017.
 */
var triviaData;
var request = new XMLHttpRequest();

function loadComplete(evt) {
    triviaData = JSON.parse(request.responseText);
    console.log(triviaData);
    document.getElementById("JSON").innerHTML = triviaData;
}
function loadData(){
    request.open('GET','https://www.opentdb.com/api.php?amount=50');
    request.onload = loadComplete();
    request.send();
}

loadData();