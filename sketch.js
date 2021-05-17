var helicopterIMG, helicopterSprite;
var packageSprite,packageIMG,packageBody;
var ground;
var missile,missileImg,missileGroup;
var gameOver,gM;
var PLAY = 1;
var END  = 0;
var WON = 2;
var gameState = PLAY || WON || END;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");
	missileImg = loadImage("missile1.png");
	gameOver = loadImage("gameOver.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	packageSprite=createSprite(width/4, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/4, 150, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	missileGroup = createGroup();

	gM = createSprite(400,250);
	gM.addImage("Game Over Image",gameOver)

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/4 , 150 , 10 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100
 	boxY=610;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxRightSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxRightSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);

	Engine.run(engine);
  
}


function draw() {

	rectMode(CENTER);
	background(0);
   
	packageSprite.x= packageBody.position.x;
	packageSprite.y= packageBody.position.y;

	if(gameState === PLAY) {

		gM.visible = false;

		if (keyCode === LEFT_ARROW){
			helicopterSprite.x = helicopterSprite.x - 10;
			Matter.Body.translate(packageBody, {x:-10,y:0} );
		}
		if (keyCode === RIGHT_ARROW){
			helicopterSprite.x = helicopterSprite.x + 10;
			Matter.Body.translate(packageBody, {x:+10,y:0} );
		}
		
		if (keyCode === DOWN_ARROW) {
			Matter.Body.setStatic(packageBody,false);
		}

		if (packageSprite.x > 300 && packageSprite.x < 500 && packageSprite.y > 610) {
			gameState = WON;
		}

		missiles();

		if (missileGroup.isTouching(packageSprite)) {

			missileGroup.destroyEach();
			gameState = END;
		}

		if (packageSprite.x < 300 && packageSprite.y > 610 || packageSprite.x > 500 && packageSprite.y > 610) {
			gameState = END;
		}

	} else if (gameState === WON) {

		textSize(55);
		strokeWeight(3.0);
		stroke("red");
		fill(color(118,39,40));
		text("Mission Accomplished",135,350);
	} else {

		gM.visible = true;

		packageBody.position.y = -180;
		packageBody.position.x = helicopterSprite.x;

		Matter.Body.setStatic(packageBody,true);
	}
	 drawSprites();
}

function missiles() {

	if (frameCount % 20 == 0) {
		missile = createSprite(10,280);
		missile.addImage("Missile Image",missileImg);
		missile.scale = 0.5;
		missile.velocityX = 35;
		missile.lifetime = 100;
		missileGroup.add(missile);
		// missile.debug = true;
		missile.setCollider("rectangle",0,0,480,100);
	}
}