var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime = 0;
var ground;
var gameover, gameoverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameoverImage  = loadImage("Gameover.png");
 
}



function setup() {
  createCanvas(500, 400);
  
  monkey = createSprite(50,350,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(250,400,1000,20);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  gameover = createSprite(250,250,500,500);
  gameover.scale = 0.45;
  gameover.addImage("gameover", gameoverImage);

  obstaclesGroup = new Group();
  bananasGroup = new Group();
}


function draw() {
    background (rgb(0, 128, 0));
     
    gameover.visible = false;
  
  if(gameState === PLAY){
        
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 280) {
        monkey.velocityY = -15;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
    
    if(bananasGroup.isTouching(monkey)){
        score++;  
      bananasGroup.destroyEach();
    }
    
    survivalTime= Math.ceil(frameCount/frameRate());

  }
   else if (gameState === END) {
      ground.velocityX = 0;
      monkey.velocityY = 0
     
     background (rgb(0, 0, 0));
     gameover.visible = true;
     
     bananasGroup.destroyEach();
     obstaclesGroup.destroyEach();
     monkey.destroy();
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0); 
     
   }
  
   monkey.collide(ground);


  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 400,50);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: " + survivalTime, 100,50);
}

function spawnBananas(){
  if (frameCount % 150 === 0) {
    var ban = createSprite(500,120,20,20);
    ban.y = Math.round(random(120, 200));
    ban.addImage(bananaImage);
    ban.scale = 0.1;
    ban.velocityX = -5;
    ban.lifetime = 300;
  
    bananasGroup.add(ban);
  }
} 


function spawnObstacles(){
   if (frameCount % 300 === 0) {
    var obs = createSprite(500,120,20,20);
    obs.y = 375;
    obs.addImage(obstacleImage);
    obs.scale = 0.1;
    obs.velocityX = -5;
    obs.lifetime = 300;
  
    obstaclesGroup.add(obs);
  } 
}
