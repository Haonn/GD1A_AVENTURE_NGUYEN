class Scene2 extends Phaser.Scene {
  constructor() 
  {
    super("Scene2");
  }

  init(data)
  {
     
  }
  
  preload()
  {
    this.load.image("carteNiv2", "assets/carteNiv2.png")
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 42 });
  }

  create() 
  {
    //INTERFACE
    this.add.image(300,300, "carteNiv2");
    this.add.text(20, 20, "Niveau 2 - TEST");

    //ANIMATIONS

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });
  
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
      startX = 10;
      startY = 10;

      //PLAYER
    player = this.physics.add.sprite(startX, startY, 'dude');
    player.setCollideWorldBounds(true);

    //CAMERA
    this.cameras.main.setSize(1280,720);
    this.cameras.main.setBounds(0,0,1280,720);
    this.cameras.main.startFollow(player,true,1,1);

  //CONTRÔLES
  cursors = this.input.keyboard.createCursorKeys();

  }

  update() 
  {
    if (gameOver == true){
      player.x = startX;
      player.y = startY;
      vies = 3;
      GameOver = false;
    }

    up=cursors.up.isDown ? true : false;
    down=cursors.down.isDown ? true : false;
    right=cursors.right.isDown ? true : false;
    left=cursors.left.isDown ? true : false;
    
    if (up == true) 
    {
      facing ="up";
      player.setVelocityY(-150);
      
    }  

    if (down == true) 
    {
      facing ="down";
      player.setVelocityY(150);
    }

    if (right == true)
    {
      facing ="right";
      player.setVelocityX(150);
      //player.anims.play('right', true);
    }
        
    if (left == true)
    {
      facing ="left";
      player.setVelocityX(-150);
      //player.anims.play('left', true);
    }

    if(right == true && up == true)
    {
      facing = "right";
      player.setVelocityX(110);
      player.setVelocityY(-110);
    }

    if(right == true && down == true)
    {
      facing = "right";
      player.setVelocityX(110);
      player.setVelocityY(110);
    }

    if(left == true && up == true)
    {
      facing ="left";
      player.setVelocityX(-110);
      player.setVelocityY(-110);
    }

    if(left == true && down == true)
    {
      facing ="left";
      player.setVelocityX(-110);
      player.setVelocityY(110);
    }
////////////////////////////////////////////////
    
  if(up == false && down == false)
  {
    player.setVelocityY(0);
  }

  if(right == false && left == false)
  {
    player.setVelocityX(0);
  }

  if(left == false && right == false && up == false && down == false)
  {
    player.anims.play('turn', true);
    player.setVelocityX(0);
    player.setVelocityY(0);
  }

  }
}
