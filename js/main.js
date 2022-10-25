var canvas;
var bg1,bg2,planeImg,bird1,bird2,sky,plane2,BG2,BIRD1;
var gameState = 1; 
var distance=0;
var life = 3;
var Score = 0
var cloudsGroup, birdsGroup, coinGroup;

function preload() {
    bg1=loadImage("./img/bg.jpg");
    bg2=loadImage("./img/bg2.jpg");
    planeImg=loadImage("./img/Airplane.png");
    bird1=loadImage("./img/bird1.png");
    bird2=loadImage("./img/bird2.png");
    Cloud=loadImage("./img/Cloud.png");
    sky=loadImage("./img/sky.jpg");
    coin=loadImage("./img/coin.png")
}

function setup(){
    canvas=createCanvas(displayWidth,displayHeight);
    plane=createSprite(300,820,10,50)
    plane2=createSprite(300,820,10,50)
    //plane2.debug=true
    plane2.visible = false
    
    plane.addImage(planeImg)
    plane2.addImage(planeImg)
    plane.scale=.7

    cloudsGroup = new Group();
    birdsGroup = new Group();
    coinGroup = new Group();
}


function draw(){
    if(gameState==1){
        background(bg1)
        
        if(keyDown("w")){
            plane.velocityX = 15; 
        }
        if(keyDown("UP_ARROW")){
            plane.velocityY = -4.5;
        }

        if(plane.x >= displayWidth)
        {
            gameState = 2;  
        }
    }
    if(gameState == 2)
    {   
        //var select_oppPlayer = Math.round(random(1,3));
        background(sky);
        plane2.visible = true
        
        plane2.scale=.79
        if(keyDown("w")){
            plane2.velocityY = -5;
        }
        if(keyDown("s")){
            plane2.velocityY = 5;
        }
        if(keyDown("d")){
            plane2.velocityX = 5; 
        }
        if(keyDown("a")){
            plane2.velocityX = -5; 
        }
        if (World.frameCount % 150 == 0) {
            BG2 = createSprite(displayWidth,Math.round(random(50, 250)));
            BG2.scale = .1
            distance = distance + Math.round(getFrameRate()/50);
            BG2.velocityX = -(6 + 2*distance/150);
            BG2.addImage(Cloud);
            cloudsGroup.add(BG2);

        }
        if (World.frameCount % 200 == 0) {
            BIRD1=createSprite(displayWidth,Math.round(random(300, 600)),10,50)
            BIRD1.scale=.3
            BIRD1.velocityX = -(6 + 2*distance/100);
            BIRD1.addImage(bird1)
            birdsGroup.add(BIRD1)
        }
        
        if(World.frameCount %250==0){
            COIN2=createSprite(displayWidth,Math.round(random(250,500)),10,50)
            COIN2.scale=.08
            COIN2.velocityX = -(6 + 2*distance/100);
            COIN2.addImage(coin)
            coinGroup.add(COIN2)
        }

        if(plane2.isTouching(birdsGroup)){
        //     BIRD1.destroy()
            life=life-1;
            birdsGroup.destroyEach();
            console.log(life)
        }
        
        textSize(30);
        fill(0,0,0);
        text("Life: "+life,10,50);
        text("Score: "+Score,1700,50);
        if(plane2.isTouching(coinGroup)){
            Score=Score+1;
            coinGroup.destroyEach();
        }
        if(life==0){
            gameState = 3;
        }
        if(Score==30){
            gameState =4
        }   
    }
    if(gameState==3){
        plane.visible=false
        plane2.visible=false
        background("black")
        fill("Red")
        textSize(300)
        text("You Lose",300,500)
        birdsGroup.destroyEach();
        cloudsGroup.destroyEach();
        coinGroup.destroyEach();
    }
    if(gameState==4){
        plane.visible=false
        plane2.visible=false
        background("black")
        fill("Green")
        textSize(300)
        text("You Win",300,500)
        birdsGroup.destroyEach();
        cloudsGroup.destroyEach();
        coinGroup.destroyEach();
    }

    drawSprites() 
}