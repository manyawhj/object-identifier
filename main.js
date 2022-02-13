img="";
Status="";
objects=[];

function preload(){
img=loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNXhIiTYb6WBVsZINyQ0Zy9LA1Luu-Jtyuw&usqp=CAU");
}

function setup(){
    Canvas=createCanvas(500,420);
    Canvas.position(560,150);
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Identifying Objects...";
    document.getElementById("number").innerHTML="Number of object detected: Calculating...";
    document.getElementById("names").innerHTML="Names of object detected: Finding... ";
}

function modelLoaded(){
    console.log("Model is loaded");
    Status="true";
    objectDetector.detect(video,gotPoses);
}

function gotPoses(error,results){

    if (error){
        console.log("error");
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
 
    image(video,0,0,640,420);
    r=random(255);
    g=random(255);
    b=random(255);
 if (Status != ""){
     
    document.getElementById("status").innerHTML="Status : Identified Objects";
     document.getElementById("number").innerHTML="Number Of Object Detected:"+" "+objects.length;
     
     document.getElementById("status").style.backgroundColor="green";
     document.getElementById("number").style.backgroundColor="green";

     for (i= 0; i< objects.length; i++) {
        percentage=floor(objects[i].confidence*100);
        fill(r,g,b);
        text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y);
        stroke(r,g,b);
        noFill();
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        document.getElementById("names").innerHTML="Name/s Of Object Detected:"+" "+objects[i].label;
        document.getElementById("names").style.backgroundColor="green";
     }
 }
}