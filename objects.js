// ALIENS
function Alien(x,y) {
    this.x = x;
    this.y = y;

    this.direction = 1;

    // Show function - preloaded alien image, its size
    this.show = function () {
        // Built-in function to set center point of image
        imageMode(CENTER);
        // Set size of image
        image(alienImage, this.x, this.y,23,44);
    }

    this.move = function() {
        this.x = this.x + this.direction;
    }

    this.downReverse = function() {
        this.y += 10;
        this.direction *= -1;
    }
}

// SPACESHIP
function SpaceShip() {
    // Starting position of spaceship / at center x
    this.x = 350;
    this.y = 460;

    // Show function - color and shape of spaceship
    this.show = function () {
        fill(193,31,55);
        triangle(this.x - 10, this.y + 10, this.x + 10, this.y + 10, this.x, this.y - 10);
    }

    // Move function - move spaceship left and right
    this.move = function(direction) {
        this.x += direction;
    }
}

// MISSILES
function Missile(x,y) {
    // Position of missile changes based on x & y
    this.x = x;
    this.y = y;
    this.destroy = false;

    // Show function - color and shape of missile
    this.show = function () {
        fill(181,249,7);
        ellipse(this.x, this.y, 8, 8);
    }

    // Shoot function - y coordinate of missile decreases with each draw() execution
    this.shoot = function(dir) {
        this.y = this.y - 5;
    }

    this.hits = function(alien) {
        var distance = dist(this.x, this.y, alien.x, alien.y);
        if (distance < 17) {
            return true;
        } else {
            return false;
        }
    }

    this.getsBoss = function(x, y) {
        var distance = dist(this.x, this.y, x, y);
        if (distance < 25) {
            return true;
        } else {
            return false;
        }
    }

    this.farEnough = function(x, y) {
        var distance = dist(this.x, this.y, x, y);
        if (distance > 500) {
            return true;
        } else {
            return false;
        }
    }
}

// BOSS
function Boss(x, y) {
    this.x = x;
    this.y = y;

    this.show = function () {
        imageMode(CENTER);
        image(bossImage, this.x, this.y, 90, 65);
    }

    this.direction = -1.5;

    this.move = function () {
        this.x = this.x + this.direction;
    }

    this.reverse = function () {
        this.direction *= -1;
        if (this.y > 30) {
            this.y -= 520;
        }
    }

    this.disappear = function () {
        this.y += 520;
    }
}

// BOSS BULLETS
function BossBullets(x,y) {
    this.x = x;
    this.y = y;

    this.show = function () {
        fill(251,214,50);
        ellipse(this.x,this.y,11,11);
    }

    this.shoot = function (dir) {
        this.y += 5;
    }

    this.hits = function(x,y) {
        var distance = dist(this.x, this.y, x, y);
        if (distance < 17) {
            return true;
        } else {
            return false;
        }
    }
}

// GAME OVER
function GameOver(x,y) {
    this.x = x;
    this.y = y;

    this.show = function() {
        imageMode(CENTER);
        image(gameOver, this.x, this.y, 700, 400);
    }
}



