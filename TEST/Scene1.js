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
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 42 });

    this.load.image("thunderProjectile", "assets/thunderProjectile.png");
  }

  create() 
  {
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
    //INTERFACE
    this.add.image(300,300, "carteNiv1");
    this.add.text(20, 20, "Niveau 1 - TEST");
    //

    //SORTIE
    porte = this.physics.add.staticGroup();
    porte.create(1000,600,"porte")
    

    //PLAYER
    player = this.physics.add.sprite(startX, startY, 'dude');
    player.setCollideWorldBounds(true);

    //CAMERA
    this.cameras.main.setSize(1280,720);
    this.cameras.main.setBounds(0,0,1280,720);
    this.cameras.main.startFollow(player,true,1,1);

  //CONTRÔLES
  cursors = this.input.keyboard.createCursorKeys();


  //ITEMS
  eclair = this.physics.add.image(50,100,"eclair");
  eclair.setScale(0.1).refreshBody();




  

  //COLLIDERS
  this.physics.add.collider(player, porte,passageNiveau2);
  this.physics.add.collider(player,eclair,collecteEclair,null,this);

  this.bullets = this.physics.add.group({
    defaultKey: 'thunderProjectile',
    maxSize: 10
});
this.input.on('pointerdown', this.shoot, this);

  }
  // Coordonnées de AB = (xB-xA ; yB-yA) ici A = player(player.x ; player.y) et B = pointeur(pointeur.x;pointeur.y)
  shoot(pointer) {
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

    if(cursors.space.isDown == true ){
      this.shoot,this;
    }
    
    if (up == true) 
    {
      facing ="up";
      if (thunderAbility == true){
        player.setVelocityY(-180);
      }
      else{
        player.setVelocityY(-150);
      }
      
      
    }  

    if (down == true) 
    {
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
    
  //console.log(PorteCollide);
  if (clef == true && PorteCollide==true)
  {
    this.scene.start("Scene2");
    PorteCollide=false;
  }
  else
  {
    
  }

  PorteCollide=false;

  this.bullets.children.each(function(b) {
    if (b.active) {
        if (b.y < 0) {
            b.setActive(false);
        }
    }
}.bind(this));
  }

}

function passageNiveau2()
{
  PorteCollide=true;
}

function collecteEclair(){
  thunderAbility = true;
  eclair.disableBody(true,true);
}

function ouch(){
  if(vies>1){
    vies=vies-1;
  }
  else{
    gameOver = true;
  }
}
