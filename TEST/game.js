var config = {
  width: 1280,
  height: 720,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: true
    }
  }
}
var startX;
var startY;
var gameOver = false;
var player;
var facing = "right";

var cursors;
var up;
var down;
var right;
var left;

//VIE JOUEUR
var invulnerable = 120;
var vies = 3;
var heart1;
var heart2;
var heart3;

//CAPACITES
var thunderPassive = false;
var eclair;
var thunderAbility = false;
var fireActive = false;

var bullets;
var distance;
var dX;
var dY;
var dSpeed;
var coeffDistance

//ENNEMIS
var ennemis;
var ennemi1;
var ennemi2;


//PASSAGE DE NIVEAU
var porte;
var clef = true;
var PorteCollide=false;

//
var game = new Phaser.Game(config)

