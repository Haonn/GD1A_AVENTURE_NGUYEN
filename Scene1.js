class Scene1 extends Phaser.Scene {
  constructor() {
    super("Scene1");
  }

  init(data)
  {
     
  }

  preload()
  {
    this.load.image("carteNiv1", "assets/carteNiv1.png");
    this.load.image("porte", "assets/porte.png");
    this.load.image("eclair", "assets/thunder.png");
    this.load.spritesheet('perso', 'assets/perso.png', { frameWidth: 103, frameHeight: 170 });
    this.load.spritesheet('scarabe', 'assets/scarabe.png', { frameWidth: 272, frameHeight: 236 });

    this.load.image("thunderProjectile", "assets/thunderProjectile.png");
    this.load.image("money", "assets/money.png");
    this.load.image("key", "assets/key.png");
  }

  create() 
  {  //ANIMATIONS
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
    //INTERFACE
    carte = this.physics.add.image(640,360,"carteNiv1");
    carte.setScale(0.3).refreshBody();

    //this.add.image(640,360, "carteNiv1");
    //

    //SORTIE
    porte = this.physics.add.staticGroup();
    porte.create(1000,600,"porte").setScale(0.3).refreshBody();
    
    

    //PLAYER
    player = this.physics.add.sprite(startX, startY, 'perso');
    player.setCollideWorldBounds(true);

    //CAMERA
    this.cameras.main.setSize(1280,720);
    this.cameras.main.setBounds(0,0,4000,4000);
    this.cameras.main.startFollow(player,true,1,1);

    //Ennemi
    ennemi1 = this.physics.add.sprite(300, 300, 'scarabe');
    ennemi1.setCollideWorldBounds(true);

  //CONTRÔLES
  cursors = this.input.keyboard.createCursorKeys();


  //ITEMS
  eclair = this.physics.add.image(50,100,"eclair");
  eclair.setScale(0.1).refreshBody();


//piece
piece = this.physics.add.image(500,500, "money");
piece2 = this.physics.add.image(400,400, "money");
piece3 = this.physics.add.image(100,100, "money");
piece.setScale(0.1).refreshBody();
piece2.setScale(0.1).refreshBody();
piece3.setScale(0.1).refreshBody();
  
moneyTexte = this.add.text(160, 20, "", { fontSize: '52px', fill: '#111' }).setScrollFactor(0,0);
moneyUI = this.physics.add.image(100,40,"money").setScrollFactor(0,0).setScale(0.1).refreshBody();
  //COLLIDERS
  this.physics.add.collider(player, piece,playerPiece);
  this.physics.add.collider(player, piece2,playerPiece2);
  this.physics.add.collider(player, piece3,playerPiece3);
  this.physics.add.collider(player, porte,passageNiveau2);
  this.physics.add.collider(player,eclair,collecteEclair,null,this);
  this.physics.add.collider(player, ennemi1,ouch);
  



  //bullet
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
    this.physics.add.collider(this.bullets, ennemi1,bulletsennemi1);
   
}


  update() 
  {
    if (gameOver == true){
      player.x = startX;
      player.y = startY;
      vies = 3;
      gameOver = false;
    }

    up=cursors.up.isDown ? true : false;
    down=cursors.down.isDown ? true : false;
    right=cursors.right.isDown ? true : false;
    left=cursors.left.isDown ? true : false;


    if(cursors.space.isDown == true ){
      this.shoot,this;
    }
    
    if (up == true) 
    {
      facing ="up";
      player.anims.play('behind', true );
      if (thunderAbility == true){
        player.setVelocityY(-180);
      }
      else{
        player.setVelocityY(-150);
      }
      
      
    }  

    if (down == true) 
    {
      player.anims.play('front', true );
      facing ="down";
      if (thunderAbility == true){
        player.setVelocityY(180);
      }
      else{
        player.setVelocityY(150);
      }
      
    }

    if (right == true)
    {
      facing ="right";
      player.anims.play('right', true );
      if (thunderAbility == true){
        player.setVelocityX(180);
      }
      else{
        player.setVelocityX(150);
      }

      //player.anims.play('right', true);
    }
        
    if (left == true)
    {
      facing ="left";
      if (thunderAbility == true){
        player.setVelocityX(-180);
      }
      else{
        player.setVelocityX(-150);
      }
      //player.anims.play('left', true);
    }

    if(right == true && up == true)
    {
      facing = "right";
      if (thunderAbility == true){
        player.setVelocityX(130);
        player.setVelocityY(-130);
      }
      else{
        player.setVelocityX(110);
        player.setVelocityY(-110);
      }

    }

    if(right == true && down == true)
    {
      facing = "right";
      if (thunderAbility == true){
        player.setVelocityX(130);
        player.setVelocityY(130);
      }
      else{
        player.setVelocityX(110);
        player.setVelocityY(110);
      }

    }

    if(left == true && up == true)
    {
      facing ="left";
      if (thunderAbility == true){
        player.setVelocityX(-130);
        player.setVelocityY(-130);
      }
      else {
        player.setVelocityX(-110);
        player.setVelocityY(-110); 
      }
    }

    if(left == true && down == true)
    {
      facing ="left";
      if (thunderAbility == true){
        player.setVelocityX(-130);
        player.setVelocityY(130);
      }
      else{
        player.setVelocityX(-110);
        player.setVelocityY(110);
      }

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
    
   ///////////////////////////////////////////////

    if(keydrop == true && clef == false && keyNumber ==0)
    {
      //key
      key = this.physics.add.image(ennemi1.body.x,ennemi1.body.y,"key");
      key.setScale(0.1).refreshBody();

      this.physics.add.collider(player, key,playerKey);
      keyNumber = 1;
    }

  ///////////////////////////////////////////////
    if (clef == true && PorteCollide==true )
    {
      this.scene.start("Scene2");
    }

    PorteCollide = false;

  //////////////////////

    if(ennemi1Dead==true)
    {
      ennemi1.disableBody(true,true);
      keydrop = true;
    }

    ////patern ennemi
    ennemi1.setVelocityY(0);
    if(timeMove <= 100)
    {
      ennemi1.setVelocityX(-200);
      ennemi1.anims.play('leftEnnemi', true ); 
    }
    else if(timeMove > 100 && timeMove <=200 )
    {
      ennemi1.setVelocityX(200);
      ennemi1.anims.play('rightEnnemi', true ); 
    }
    else
    {
        timeMove =  0;
    }
    timeMove++;

///////////////////
  this.bullets.children.each(function(b) {
    if (b.active) {
        if (b.y < 0) {
            b.setActive(false);
        }
    }
}.bind(this));
/////////////////////////

invulnerable++;
moneyTexte.setText(money);
  }
}

function playerPiece3()
{
  piece3.disableBody(true,true);
  money++;
}


function playerPiece()
{
  piece.disableBody(true,true);
  money++;
}


function playerPiece2()
{
  piece2.disableBody(true,true);
  money++;
}



function passageNiveau2()
{
  PorteCollide =true;
}

function collecteEclair(){
  thunderAbility = true;
  eclair.disableBody(true,true);
}

function ouch(){
  if(invulnerable>=120)
  {
    if(vies>1)
    {
      vies=vies-1;
    }
    else
    {
      gameOver = true;
    }
    invulnerable = 0;
  }
}

function playerKey()
{
  clef = true;
  key.disableBody(true,true);
}


function bulletsennemi1()
{
  ennemi1Dead = true;
}

