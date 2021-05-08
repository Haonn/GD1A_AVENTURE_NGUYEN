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
    this.load.image("carteNiv2", "assets/carteNiv1.png");
    this.load.image("porte", "assets/porte.png");
    this.load.image("eclair", "assets/thunder.png");
    this.load.spritesheet('perso', 'assets/perso.png', { frameWidth: 103, frameHeight: 170 });
    this.load.spritesheet('scarabe', 'assets/scarabe.png', { frameWidth: 272, frameHeight: 236 });

    this.load.image("thunderProjectile", "assets/thunderProjectile.png");
  }

  create() 
  {
    //INTERFACE
    this.add.image(640,360, "carteNiv2").setScale(0.3);
    winText = this.add.text(200, 200, '', { fontSize: '200px', fill: '#111' });

    //ANIMATIONS
    this.anims.create({
      key: 'leftEnnemi',
      frames: this.anims.generateFrameNumbers('scarabe', { start: 0, end: 20 }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'rightEnnemi',
      frames: this.anims.generateFrameNumbers('scarabe', { start: 21, end: 41 }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'front',
      frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 20 }),
      frameRate: 30,
      repeat: -1
    });
  
    this.anims.create({
      key: 'turn',
      frames: [ { key: 'perso', frame: 10 } ],
      frameRate: 20
    });
  
    this.anims.create({
      key: 'behind',
      frames: this.anims.generateFrameNumbers('perso', { start: 21, end: 41 }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('perso', { start: 42, end: 62 }),
      frameRate: 10,
      repeat: -1
    });
      startX = 10;
      startY = 10;

      //PLAYER
    player = this.physics.add.sprite(startX, startY, 'perso');
    player.setCollideWorldBounds(true);

    //CAMERA
    this.cameras.main.setSize(1280,720);
    this.cameras.main.setBounds(0,0,1280,720);
    this.cameras.main.startFollow(player,true,1,1);


    //Ennemi
    ennemi2 = this.physics.add.sprite(300, 300, 'scarabe');
    ennemi2.setCollideWorldBounds(true);
    this.physics.add.collider(player, ennemi2,ouch);

    //texte Victoire


  //CONTRÔLES
  cursors = this.input.keyboard.createCursorKeys();

  this.bullets = this.physics.add.group({
    defaultKey: 'thunderProjectile',
    maxSize: 1000
});
this.input.on('pointerdown', this.shoot, this);

  }
  // Coordonnées de AB = (xB-xA ; yB-yA) ici A = player(player.x ; player.y) et B = pointeur(pointeur.x;pointeur.y)
  shoot(pointer) {
    if (thunderAbility == true)
    {
      var bullet = this.bullets.get(player.x, player.y);
      if (bullet) {
          bullet.setActive(true);
          bullet.setVisible(true);

          //Calcul de coordonnées du vecteur entre les deux projectiles
          dY = ( pointer.y - player.y);
          dX = ( pointer.x - player.x);

          /*Coefficient entre dX et dY (a voir dans quel sens l'utiliser)
          coeffDistance = (Math.abs(dY)/Math.abs(dX)) */

          /*Distance entre les deux points 
          distance = (Math.abs(dY)+Math.abs(dX)); */

          //Distance à ajouter pour atteindre la constante vitesse.
          dSpeed = (800/(Math.abs(dY)+Math.abs(dX))); 

          bullet.body.velocity.y = dY*dSpeed;
          bullet.body.velocity.x = dX*dSpeed;

          

          /*if (facing == "left"){
            bullet.body.velocity.x = -200
            bullet.body.velocity.y = 0
          }
          if (facing == "right"){
            bullet.body.velocity.x = 200
            bullet.body.velocity.y = 0
          }
          if (facing == "up"){
            bullet.body.velocity.x = 0
            bullet.body.velocity.y = -200
          }
          if (facing == "down"){
            bullet.body.velocity.x = 0
            bullet.body.velocity.y = 200
          }*/
          
      }
    }
    this.physics.add.collider(this.bullets, ennemi2,bulletsennemi2);
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
      player.anims.play('behind', true );
      player.setVelocityY(-150);
      
    }  

    if (down == true) 
    {
      player.anims.play('front', true );
      facing ="down";
      player.setVelocityY(150);
    }

    if (right == true)
    {
      player.anims.play('right', true );
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

  ennemi2.setVelocityX(0);

  if(ennemi2Dead==true)
    {
      ennemi2.disableBody(true,true);
    }
    ennemi2.setVelocityX(0);
    if(timeMove <= 100)
    {
      ennemi2.setVelocityY(-200);
      ennemi2.anims.play('leftEnnemi', true ); 
    }
    else if(timeMove > 100 && timeMove <=200 )
    {
      ennemi2.setVelocityY(200);
      ennemi2.anims.play('rightEnnemi', true ); 
    }
    else
    {
        timeMove =  0;
    }
    timeMove++;
    if(win ==true)
    {
      winText.setText("Victoire !");
      this.physics.pause();
    }
  }
}

function bulletsennemi2()
{
  ennemi2Dead = true;

  win = true;
}