var tower,towerimg;
var ghost,ghostimg;
var windows,windowimg;
var climber,climberimg;
var windowgrp,climbergrp;
var PLAY=1;
var END=0;
var END1;
var state=PLAY;
var sound;
var edges1;
var edges2;
var edges3;
var edges4;
var egrp;
var score=0;





function preload(){
  towerimg=loadImage("tower.png");
  ghostimg=loadImage("ghost-standing.png");
  windowimg=loadImage("door.png");
  climberimg=loadImage("climber.png");
  sound=loadSound("ghost.wav");
   
}


function setup(){
  createCanvas(550,500);
  tower=createSprite(275,275,550,600);
  tower.addImage(towerimg);
  tower.velocityY=10;
  
  ghost=createSprite(275,440,20,20);
  ghost.addImage(ghostimg); 
  ghost.scale=0.4;
  ghost.setCollider("circle",-40,-60,30);
 // ghost.debug=true;
  
  climbergrp = new Group() ;
   egrp = new Group() ;
  
  
  
  var edges1=createSprite(5,250,10,500);
  edges1.visible=false;
  var edges2=createSprite(545,250,10,500);
  edges2.visible=false;
  var edges3=createSprite(275,5,550,10);
  edges3.visible=false;
  var edges4=createSprite(275,495,550,10);
  edges4.visible=false;
  egrp.add(edges1);
  egrp.add(edges2);
  egrp.add(edges3);
  egrp.add(edges4);
  
}


function draw(){
  score=score+1;
  background("white");
  
  
  if(tower.y>400){
    tower.y=300/2;
 }
  
  
  if(ghost.isTouching( climbergrp)){
  state=END;
  }
  
  if(state==PLAY){
    move();
    drawSprites() ;
    score=score+1;
    fill("white");
    stroke("azure");
    text("SURVIVAL TIME"+score,20,20);
   spawnWindows();
    sound.play();
   
  }
  else if(state==END){
    background("black");
    fill("white");
    stroke("azure");
        textSize(18);
    text("GAME OVER!!YOU HAVE TOUCHED THE RAILINGS!!!",50,250);
  } 
  else if(state==END1){
      background("black");
    fill("white");
    stroke("azure");
        textSize(18);
    text("GAME OVER!!YOU HAVE TOUCHED THE EDGES!!!",50,250);
}
  
  
  
if(ghost.isTouching(egrp)){
    state=END1;
  }
  
  
}



function spawnWindows(){
  if(frameCount%100==0){
   windows=createSprite(Math.round(random(50,500)),0,20,20);
   windows.addImage(windowimg); 
   windows.scale=1.2;
    windows.velocityY=10;
    windows.lifetime=55;
    climber=createSprite(Math.round(random(50,500)),0,20,20);
    climber.addImage(climberimg);
    climber.velocityY=10;
    climber.lifetime=55;
    
    
    climber.x=windows.x;
    climber.y=windows.y+60;
    
    
    ghost.depth=windows.depth+1;
    ghost.depth=climber.depth+1;
    
   climbergrp.add(climber);
  }
}


function move(){
  if(keyDown("up")){
    ghost.y=ghost.y-20;
  }
   if(keyDown("down")){
    ghost.y=ghost.y+20;
  }
    if(keyDown("left")){
    ghost.x=ghost.x-20;
  }
   if(keyDown("right")){
    ghost.x=ghost.x+20;
  }
}


