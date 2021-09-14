leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
songvariable= null;
leftWristScore= 0;
rightWristScore= 0;
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
     video.hide();
     PoseNet= ml5.poseNet(video, modelloaded);
     PoseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    song2status= song2.isPlaying();
    song1status= song.isPlaying();
    if (leftWristScore>0.2){
        fill("red");
        stroke("red");
          circle(leftWristX, leftWristY, 25);
          if(song2status==false){
            song.stop();
           song2.play();
          }
    }
    if (rightWristScore>0.2){
        fill("red");
        stroke("red");
          circle(rightWristX, rightWristY, 25);
          if(song1status==false){
            song2.stop();
           song.play();
          }
    }
}

function modelloaded(){
console.log("You finally got here!")
}

function preload(){
    song= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}

function play(){
    song.play();
    song.setVolume();
    song.rate(1);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        leftWristScore= results[0].pose.keypoints[9].score;
        rightWristScore= results[0].pose.keypoints[10].score;
        console.log(leftWristX +" "+ leftWristY +" "+ rightWristX +" "+ rightWristY);
    }
    else{
        
    }
}