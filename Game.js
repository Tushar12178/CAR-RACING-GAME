class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(100,200)
    car1.addImage("ca1",c1)
    car2=createSprite(300,200)
    car2.addImage("ca2",c2)
    car3=createSprite(500,200)
    car3.addImage("ca3",c3)
    car4=createSprite(700,200)
    car4.addImage("ca4",c4)
    cars=[car1,car2,car3,car4]
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getCarsAtEnd()
    if(allPlayers !== undefined){
      background("brown")
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
     
     //index of the array
     var index=0
     //x and y positions of a car
     var x=200
     var y;

      for(var plr in allPlayers){
       
          //add One to the index for every loop
          index=index+1
          //position the cars a little away from each other in the x direction
          x=x+200
          //use data from the databse to display the cars in the y diirection
          y=displayHeight-allPlayers[plr].distance;
          cars[index-1].x=x
          cars[index-1].y=y
          if(index===player.index){
            strokeWeight(2)
            fill("red");
            ellipse(x,y,68,60)
         cars[index-1].shapeColor="red"
         //setting the camera angles of the car
         camera.position.x=displayWidth/2
         camera.position.y=cars[index-1].y
          }
        }  
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  /* if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=50
       player.update();
    }*/
    
    if(player.distance>3860){
      gameState=2
     
      player.rank+=1
      Player.updateCarsAtEnd(player.rank)
    }

  drawSprites();
  
  }
  end(){
    console.log("Game Over")
    console.log("rank: "+player.rank)
  }
}

