var song1="";
var song2="";
song_status1="";
song_status2="";
var scoreRightWrist=0;
var scoreLeftWrist=0;

function preload(){
    song1=loadSound("BEETHOVEN.mp3");
    song2=loadSound("Marshmello - Alone.mp3");
}
function setup(){
    canvas=createCanvas(600, 400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
function draw(){
    image(video, 0, 0, 600, 400);
    song_status1=song1.isPlaying();
    song_status2=song2.isPlaying();
    fill("red");
    stroke("yellow");
    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 50);
        song2.stop();
        if(song_status1==false){
            song1.play();
        }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 50);
        song1.stop();
        if(song_status2==false){
            song2.play();
        }
    }
}
function Start_Music(){
    song1.play();
}
function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}