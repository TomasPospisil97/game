
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

let flappy = {
    x : flappyX,
    y : flappyY,
    height : flappyHeight,
    width : flappyWidth
}

window.onload = function (){
    playboard = document.getElementById("playboard");
    playboard.height = playboardHeight;
    playboard.width = playboardWidth;
    context = playboard.getContext("2d"); //pro kreslení
}