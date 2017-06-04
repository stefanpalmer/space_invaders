var aliens = [];
var spaceShip;
var missiles = [];
var boss;
var bossBullets = [];
var score = 0;
var alienImage;
var bossImage;
var gameOver;

// Loads image of Alien, Boss and GameOver into project
function preload() {
    alienImage = loadImage('images/alien.png');
    bossImage = loadImage('images/boss.png');
    gameOver = loadImage('images/win.png');
}

// What's already set up at beginning of project
function setup() {

  // Built-in function for creating canvas
  createCanvas(700,500);

  // An instance of SpaceShip object
  spaceShip = new SpaceShip();

  // Four rows
  for (var i = 0; i < 4; i++) {
      // Eight columns
      for (var j = 0; j < 8; j++) {
          // Each column separated by 75
          var x = j * 75;
          // Second and fourth columns indented
          if (i % 2 != 0) {
              x += 75 / 2;
          }
          // Distance between rows
          var y = 30 + i * 50;
          // Instances of Alien object
          var alien = new Alien(x,y);
          // Push into aliens array
          aliens.push(alien);
      }
  }

  // Instance of Boss object
  boss = new Boss(1900, 30);

}

// Function that continuously executes
function draw() {

  // Background color of canvas
  background(0,0,0);

  // Show the spaceship (show() method and features created in SpaceShip function)
  spaceShip.show();

  // Left and right arrow keys to change x position of spaceShip with keyIsDown() function
  if (keyIsDown(LEFT_ARROW))
      spaceShip.x-=5;
  if (keyIsDown(RIGHT_ARROW))
      spaceShip.x+=5;

  // Display score - set text size, alignment, fill
    textSize(16);
    textAlign(LEFT,TOP);
    fill(250);
    // Score variable
    text("Score: " + score, 20, 470);

  // Show each alien in aliens array
  for (var i = 0; i < aliens.length; i++){
      aliens[i].show();
      // Aliens move
      aliens[i].move();
      // If an alien reaches canvas border
      if (aliens[i].x > 700 || aliens[i].x < 0) {
          // Call downReverse() function on all aliens
          for(var i = 0; i < aliens.length; i++) {
              aliens[i].downReverse();
          }
      }
  }

  // Show the boss (initial position outside of canvas)
  boss.show();
  // The boss moves
  boss.move();

  // Show and shoot each missile in missiles array
  for (var i = 0; i < missiles.length; i++){
      missiles[i].show();
      missiles[i].shoot();
      // Sort through aliens array
      for (var j = 0; j < aliens.length; j++){
          // If missile hits an alien
          if (missiles[i].y < 0) {
              missiles[i].destroy = true;
          }
          if (missiles[i].hits(aliens[j])) {
              // Missile destroyed, alien killed (removed from array), & score increases by 10 points
              missiles[i].destroy = true;
              aliens.splice(j, 1);
              score += 10;
          }
      }
      // If missile hits boss
      if (missiles[i].getsBoss(boss.x, boss.y)) {
          // Missile destroyed, boss' location changes off canvas, & score increases by 50 points
          missiles[i].destroy = true;
          boss.disappear();
          score += 50;
      }
  }

  // If missile destroy is true, the missile is removed from missiles array
  for (var i = missiles.length-1; i >= 0; i--) {
      if (missiles[i].destroy) {
          missiles.splice(i, 1);
      }
  }

  // The boss reverses direction when x position reaches -900
  if (boss.x < -900 ) {
      boss.reverse();
  }

  // Every time the boss' x location is divisible by 20, a new boss bullet is created
  if (boss.x % 20 == 0) {
      // Starting position of boss bullet dependent on boss' location
      var bossBullet = new BossBullets(boss.x, boss.y + 8);
      // New boss bullet gets pushed into bossBullets array
      bossBullets.push(bossBullet);
  }

  // Boss bullet shown and shoots
  for (i=0; i < bossBullets.length; i++) {
      bossBullets[i].show();
      bossBullets[i].shoot();
      // Score goes to 0 if spaceship is hit
      if (bossBullets[i].hits(spaceShip.x, spaceShip.y)) {
          score = 0;
      }
  }

  // If length of aliens array is 0, the game over image appears
  if (aliens.length == 0) {
      var gameends = new GameOver(350,250);
      gameends.show();
  }

}

// Function executes if certain keys are pressed
var last = missiles.length - 1;
//if (missiles[last][y] < 0) {
function keyPressed() {
  // If spacebar is pressed a new instance of Missile is created
  if (key === ' ' && missiles.length < 1) {
    // missile created from spaceShip x position
        var missile = new Missile(spaceShip.x,spaceShip.y - 10);
        // bullet pushed into bullets array
        missiles.push(missile);
    }
  //}
}