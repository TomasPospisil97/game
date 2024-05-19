
//playboard
let playboard;
let playboardWidth = 360;
let playboardHeight = 640;
let context;

//flappy
let flappyWidth = 34;
let flappyHeight = 24;
let flappyX = playboardWidth/8;
let flappyY = playboardHeight/2;
let flappyImg;

let flappy = {
    x : flappyX,
    y : flappyY,
    height : flappyHeight,
    width : flappyWidth
}

//trubky
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = playboardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//fyzika hry
let velocityX = -2; //trubky se posouvají doleva rychlostí

window.onload = function (){
    playboard = document.getElementById("playboard");
    playboard.height = playboardHeight;
    playboard.width = playboardWidth;
    context = playboard.getContext("2d"); //pro kreslení

    //context flappy urceni mista,zobrazeni pro nasledujici kod flappy img
    //context.fillStyle = "green";
    //context.fillRect(flappy.x, flappy.y, flappy.width, flappy.height);

    //flappy img
    flappyImg = new Image();
    flappyImg.src = "./resources/img/flappybird.png";
    flappyImg.onload = function(){
        context.drawImage(flappyImg, flappy.x, flappy.y, flappy.width, flappy.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./resources/img/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./resources/img/bottompipe.png";


    requestAnimationFrame(update);
    setInterval(placePipes, 1500); // 1.5sekundy

}

function update () {
    requestAnimationFrame(update);
    context.clearRect(0, 0, playboard.width, playboard.height);

    //flappy
    context.drawImage(flappyImg, flappy.x, flappy.y, flappy.width, flappy.height);

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}

function placePipes () {
    //pipeArray.push(new Pipe(pipeX, pipeY, pipeWidth, pipeHeight, topPipeImg, bottomPipeImg));

    // (0-1) * pipeHeigth/2
    // 0 -> -128 (=pipeHeight/4 = 512/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2 = 3/4) = range posunuti trubky muze byt od 1/4 do 3/4 smerem nahoru
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = playboard.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);


    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);

}

// 3007