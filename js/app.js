var characters=['images/char-boy.png',
                'images/char-cat-girl.png',
                'images/char-horn-girl.png',
                'images/char-pink-girl.png',
                'images/char-princess-girl.png'];

// Enemies our player must avoid
var Enemy = function(xCoord, yCoord) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.measure = this.sprite.naturalWidth;
    console.log(this.measure);
    this.height =107;
    this.x=xCoord;
    this.y=yCoord;

};

Enemy.prototype.checkCollision = function() {
    if((player.x >=this.x-50 && player.x <=this.x + 51) && (player.y >=this.y-53  && player.y <=this.y +20)) {
        player.reset();
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= ctx.canvas.width-1) {
        this.x=-175;
    } else {
        this.x=this.x+((10*player.level)*dt);
    }
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.speed = 10;
    this.characterSelected=false;
    this.characterInd = 0;
    this.y=240;
    this.x=200;
    this.level=0;
    this.sprite = characters[this.characterInd];//'images/char-boy.png';
    //this.reset();
};

Player.prototype.reset = function(){
    this.x = 1;
    this.y=null;
};

Player.prototype.update = function(dt){
    if(this.y==null){
        this.y=ctx.canvas.height-175;
    }
    if(this.x > star.x -20 && this.x < star.x + 20 && this.y > star.y - 20 && this.y < star.y + 20) {
        star.achieved = true
        this.nextLevel();
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkValidity = function() {
    if(this.y<=5) {
        console.log(this.y);
        this.reset();
    }
};

Player.prototype.nextLevel = function() {
    allEnemies = [];
    this.level++;
    for(i=1;i<=this.level;i++){
        var xCoord = Math.floor(i/4)*200;
        var yCoord = i%4*100 +50;
        allEnemies.push(new Enemy(xCoord, yCoord))
    }
    this.reset();

};

Player.prototype.handleInput = function(dir){

    if(this.characterSelected==true){
        if(dir =="left"){
            if(this.x +this.speed >1)
            this.x =this.x-this.speed;
        } else if (dir =="down") {
            if(this.y +this.speed<ctx.canvas.height-175)
            this.y=this.y+this.speed;
        } else if (dir =="right"){
            if(this.x +this.speed <ctx.canvas.width-100)
            this.x=this.x+this.speed;
        } else if (dir =="up"){
            if(this.y +this.speed >1)
            this.y=this.y-this.speed;
        }
        this.checkValidity();
    } else{
            console.log(dir);
            if(dir =="left"){
                if(this.characterInd>1) {
                    this.characterInd=this.characterInd-1;
                }
            }else if(dir =="right"){
                if(this.characterInd<characters.length - 1) {
                        this.characterInd=this.characterInd+1;
                }
            } else if (dir=="enter"){
                this.characterSelected=true;
                this.nextLevel();
                this.reset();
            }
            this.sprite=characters[this.characterInd];
            console.log(this.sprite);

    }

};

var Star = function() {
    this.achieved = false;
    this.x =400;
    this.y=40;
    this.sprite = 'images/Star.png';
}

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies =[];

var player =new Player;
var star = new Star;
//var text = new SelectCharacter;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    console.log(e.keyCode);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
