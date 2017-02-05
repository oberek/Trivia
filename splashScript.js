var category = 0, difficulty = '', highscore = 0;
var previousSessionScore = sessionStorage.getItem('score');

if (getCookie('highscore') > 0) {
    highscore = getCookie('highscore');
}
if (previousSessionScore > highscore) {
    highscore = previousSessionScore;
    setCookie(3);
}
console.log(document.getElementById("HighScore"));

document.getElementById("HighScore").innerHTML = highscore;

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

function setCookie(exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "highscore=" + 0 + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function saveCat(num) {
    category = num;
    sessionStorage.setItem('category', category);
}

function saveDiff(diff) {
    difficulty = diff;
    sessionStorage.setItem('difficulty', difficulty);

}
