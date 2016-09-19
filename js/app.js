//  -- Using 'strict mode' to improve security
'use strict';

//  -- Enemy Function
var Enemy = function(x, y, speed) {
    this.speed = this.randInt(100, 500);
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug2.png';
};

/*  -- Enemy Position
    -- Keeping Enmy within Canve  */

Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    var lane = [60, 145, 225, 305];
    var position = this.randInt(0, 4);
    if (this.x >= 500) {
        this.x = -100;
        this.y = lane[position];
        this.speed = this.randInt(10, 600);
    }
};

//  -- Enemy Speed
Enemy.prototype.randInt = function(min, max) {
    this.min = min;
    this.max = max;
    var enemySpeed = 0;
    enemySpeed = Math.floor(Math.random() * (this.max - this.min)) + this.min;
    return enemySpeed;
};

//  -- Renedering Enemy
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  -- Player Function
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
};

//  -- Collision Detection Function
Player.prototype.checkCollisions = function() {
    for (var i = 0, len = allEnemies.length; i < len; i++) {
        if ((allEnemies[i].x) <= player.x + 50 &&
            (allEnemies[i].x + 50) >= (player.x) &&
            (allEnemies[i].y) <= player.y + 50 &&
            (allEnemies[i].y + 50) >= (player.y)) {

            /*  -- Collision Detected
                -- Display "Looser Message"
                -- Reset Player Position */

            looserText();
            setTimeout(gameOnText, 1000);
            alert("LooseR");
            this.reset();
        }
    }
};

//  -- Player Function

Player.prototype.update = function(dt) {

    this.x * dt;
    this.y * dt;
    this.checkCollisions();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  -- Player Starting Position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 500;
};

//  -  Player Movement Based Keyboard Input
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 85;
    }
    if (this.y <= 0) {
        /*  -- Water Detected
            -- Display "Winner Message"
            -- Reset Player Position */
        winnerText();
        setTimeout(gameOnText, 1000);
        alert("WinneR");
        this.reset();
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (direction === 'down' && this.y < 450) {
        this.y += 85;
    }
};



//  -- Enemy Objects

var enemy1 = new Enemy(-100, 60, 0);
var enemy2 = new Enemy(-100, 145, 0);
var enemy3 = new Enemy(-100, 225, 0);
var enemy4 = new Enemy(-100, 305, 0);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

//  -- Player Objects
var player = new Player(200, 500);

//  -- Event Listner Function - Listens to Key Press
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});