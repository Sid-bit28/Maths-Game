// Logic
let playing = false;
let score = 0;
let time, action, correctAnswer;
// if we click on the start/reset button
document.getElementById("startreset").onclick = function () {
    //if we are playing
    if (playing == true) {
        // reload the page
        location.reload(); // for reloading the page
    } else {
        // change the playing mode to true.
        hide("gameover");
        playing = true;
        // set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        // show countdown box
        show("timeremaining");
        time = 60;
        document.getElementById("timeremainingvalue").innerHTML = time;
        // change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        // reduce time by 1 sec in loops
        startCountDown();
        // generate Q&A 
        generateQansA();
    }
}

for (let i = 1; i <= 4; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing == true) {
            if (document.getElementById("box" + i).innerHTML == correctAnswer) {
                score += 1;
                document.getElementById("score").innerHTML = "Score:" + score;
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);
                generateQansA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }
}

// Functions


function startCountDown() {
    action = setInterval(function () {
        time -= 1;
        document.getElementById("timeremainingvalue").innerHTML = time;
        if (time == 0) {
            // Game Over!!
            stopCountDown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your Score is : " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function generateQansA() {
    let x = 1 + Math.floor(Math.random() * 9);
    let y = 1 + Math.floor(Math.random() * 9);
    correctAnswer = x * y;
    document.getElementById("ques").innerHTML = x + "X" + y;
    let correctPosition = 1 + Math.round(Math.random() * 3);
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
    for (let i = 1; i <= 4; i++) {
        let otherOption;
        while (true) {
            otherOption = 1 + Math.round(Math.random() * 99);
            if (otherOption != correctAnswer) break;
        }
        if (i != correctPosition) {
            document.getElementById("box" + i).innerHTML = otherOption;
        }
    }
}

function stopCountDown() {
    clearInterval(action);
}

function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

function show(Id) {
    document.getElementById(Id).style.display = "block";
}
