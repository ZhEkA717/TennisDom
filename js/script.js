"use strict";



window.addEventListener('load',()=>{

    const btnPlay = document.querySelector('.button #play'),
    btnPause = document.querySelector('.button #pause'),
    numLeft = document.querySelector('.num__left'),
    numRight = document.querySelector('.num__right'),
    field = document.querySelector(".field"),
    leftRacket = document.querySelector('.leftRacket'),
    rightRacket = document.querySelector('.rightRacket'),
    ball = document.querySelector('.ball'),
    close = document.querySelector("#close"),
    whoWin = document.querySelector("#who-win"),
    gameOver = document.querySelector(".game_over");

const fieldParam = {
    width: 650,
    height: 350
}
const leftRacketParam = {
    posX: 0,
    posY: 125,
    speedY: 0,
    width: 10,
    height: 100,
    update: function () {
        leftRacket.style.left = this.posX + 'px';
        leftRacket.style.top = this.posY + 'px';
    }
};
const rightRacketParam = {
    posX: 640,
    posY: 125,
    speedY: 0,
    width: 10,
    height: 100,
    update: function () {
        rightRacket.style.left = this.posX + 'px';
        rightRacket.style.top = this.posY + 'px';
    }
};

function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function randX() {
    const numbers = ['', 7, -7];//скорость мяча
    let n = randomDiap(1, 2);
    let countNumber = numbers[n];
    return countNumber;
}
function randY() {
    const numbers = ['', 2, -2, 6, -6, 4, -4, 3, -3];
    let n = randomDiap(1, 8);
    let countNumber = numbers[n];
    return countNumber;
}

const ballParam = {
    posX: fieldParam.width / 2 - ball.offsetWidth / 2,
    posY: fieldParam.height / 2 - ball.offsetHeight / 2,
    speedX: randX(),
    speedY: randY(),
    width: 40,
    height: 40,
    update: function () {
        ball.style.left = this.posX + "px";
        ball.style.top = this.posY + "px";
    }
};
let scope1 = 0,
    scope2 = 0;

let leftR, rightR;
document.addEventListener("keydown", (e) => {
    e = e || window.event;
    if (e.code === "ShiftLeft") {
        leftR = "ShiftLeft";
        leftRacketParam.speedY = 5;
    }
    if (e.code === "ControlLeft") {
        leftR = "ControlLeft";
        leftRacketParam.speedY = 5;
    }
    if (e.code === "ArrowUp") {
        rightR = "ArrowUp";
        rightRacketParam.speedY = 5;
    }
    if (e.code === "ArrowDown") {
        rightR = "ArrowDown";
        rightRacketParam.speedY = 5;
    }
});
document.addEventListener("keyup", (e) => {
    e = e || window.event;
    if (e.code === "ShiftLeft") {
        leftR = "ShiftLeft";
        leftRacketParam.speedY = 0;
    }
    if (e.code === "ControlLeft") {
        leftR = "ControlLeft";
        leftRacketParam.speedY = 0;
    }
    if (e.code === "ArrowUp") {
        rightR = "ArrowUp";
        rightRacketParam.speedY = 0;
    }
    if (e.code === "ArrowDown") {
        rightR = "ArrowDown";
        rightRacketParam.speedY = 0;
    }
});

function moveRacket() {
    if (leftR == "ShiftLeft") {
        if (leftRacketParam.posY == 0) {
            leftRacketParam.posY = 0;
        } else {
            leftRacketParam.posY -= leftRacketParam.speedY;
        }
    }
    if (leftR == "ControlLeft") {
        if (leftRacketParam.posY == 250) {
            leftRacketParam.posY = 250;
        } else {
            leftRacketParam.posY += leftRacketParam.speedY;
        }
    }
    if (rightR == "ArrowUp") {
        if (rightRacketParam.posY == 0) {
            rightRacketParam.posY == 0
        } else {
            rightRacketParam.posY -= rightRacketParam.speedY;
        }
    }
    if (rightR == "ArrowDown") {
        if (rightRacketParam.posY == 250) {
            rightRacketParam.posY = 250
        } else {
            rightRacketParam.posY += rightRacketParam.speedY;
        }
    }
}

let count = 0;
let pause = false;
const countDown = document.getElementById('countDown');


btnPlay.addEventListener('click', funPlay);
document.addEventListener('keydown', funPlayKey);
function funPlayKey(e){
    if(e.code === "Enter"){
        funPlay();
    }
}

function funPlay(){
    if (count == 0) {
        btnPlay.style.display = "none";
        let sec = 3;
        countDown.style.opacity = 1;
        function funCountDown() {
            let seconds = new Date().getSeconds();
            const timerId = setTimeout(funCountDown, 1000);
            if (sec <= 0) {
                countDown.innerHTML = "Go!";
                clearTimeout(timerId);
                setTimeout(()=>{
                    countDown.style.opacity = 0;
                },500);
            } else {
                let t = seconds + sec - seconds;
                countDown.innerHTML = t;
            }
            --sec;
        }
        funCountDown();
        setTimeout(() => {
            tick();
            ballParam.posX = fieldParam.width / 2 - ball.offsetWidth / 2;
            ballParam.posY = fieldParam.height / 2 - ball.offsetHeight / 2;
            ball.classList.add('rotate');
            field.style.borderRight = '';
            field.style.borderLeft = '';
        }, 3000);


    }
    count++;
    console.log(count);
}





function tick() {
    const timerId = requestAnimationFrame(tick);

    btnPause.addEventListener('click', funPause);
    document.addEventListener('keydown', funPauseKey);
    function funPauseKey(e){
        if(e.code === "Escape"){
            funPause();
        }
        
    }
    function funPause() {
        cancelAnimationFrame(timerId);
        count = 0;
        ball.classList.remove('rotate');
        btnPlay.style.display = "block"
    }
    ballParam.posX += ballParam.speedX;
    ballParam.posY += ballParam.speedY;
    // вылетел ли мяч правее стены?
    if ((ballParam.posY + ballParam.width >= rightRacketParam.posY) &&
        (ballParam.posY <= rightRacketParam.posY + rightRacketParam.height) &&
        (ballParam.posX + ballParam.width > fieldParam.width - rightRacketParam.width)) {
        ballParam.speedX = -ballParam.speedX;
        ballParam.posX = fieldParam.width - ballParam.width - rightRacketParam.width;

    } else if (ballParam.posX + ballParam.width > fieldParam.width) {
        ballParam.speedX = -ballParam.speedX;
        ballParam.posX = fieldParam.width - ballParam.width;
        numRight.innerHTML = ++scope2;
        cancelAnimationFrame(timerId);
        count = 0;
        ball.classList.remove('rotate');
        btnPlay.style.display = "block"
        field.style.borderRight= "5px solid red";

    }
    // вылетел ли мяч левее стены?
    if ((ballParam.posY + ballParam.width >= leftRacketParam.posY) &&
        (ballParam.posY <= leftRacketParam.posY + leftRacketParam.height) &&
        (ballParam.posX < leftRacketParam.width)) {
        ballParam.speedX = -ballParam.speedX;
        ballParam.posX = leftRacketParam.width;
    } else if (ballParam.posX < 0) {
        ballParam.speedX = -ballParam.speedX;
        ballParam.posX = 0;
        numLeft.innerHTML = ++scope1;
        cancelAnimationFrame(timerId);
        count = 0;
        ball.classList.remove('rotate');
        btnPlay.style.display = "block"
        field.style.borderLeft= "5px solid red";
    }
    // вылетел ли мяч выше потолка?
    if (ballParam.posY < 0) {
        ballParam.speedY = -ballParam.speedY;
        ballParam.posY = 0;
    }
    // вылетел ли мяч ниже пола?
    if (ballParam.posY + ballParam.height > fieldParam.height) {
        ballParam.speedY = -ballParam.speedY;
        ballParam.posY = fieldParam.height - ballParam.height;
    }

    if ((scope1 == 5) || (scope2 == 5)) {
        count = 1;
        if (scope1 < scope2) {
            gameOver.style.display = "block";
            whoWin.innerHTML = "Left Win!"
            close.addEventListener('click', function () {
                location.reload();
            });
        } else if (scope2 < scope1) {
            gameOver.style.display = "block";
            whoWin.innerHTML = "Right Win!"
            close.addEventListener('click', function () {
                location.reload();
            });
        }
    }

    moveRacket();
    ballParam.update();
    leftRacketParam.update();
    rightRacketParam.update();
}


ballParam.update();
leftRacketParam.update();
rightRacketParam.update();


setTimeout(() => {
    const preview = document.getElementById('preview'),
        loading = document.querySelector("#preview div:last-child img");
    preview.style.opacity = 0;
    loading.classList.remove('loading');
    setTimeout(() => {
        preview.style.display = "none";
    }, 1500)
}, 1000);

});










