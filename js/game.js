//hello world of phaser = basic game = single scene in spin and win game
//how to create the basic skeleton for the game -> Game loop
let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height:600,
    backgroundColor : 0xffcc00,
    
    scene: {
        preload: preload,
        create : create,
        update: update,
    }
    
};

let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    //load object, load some images
    this.load.image("background","Assets/back.jpg");
    this.load.image("wheel","Assets/wheel.png");
    this.load.image("stand","Assets/stand.png");
    this.load.image("pin","Assets/pin.png");
    this.load.image('button', 'Assets/taptospin.png');
    this.load.audio('spinmusic', 'Assets/yt_mp3spinwheel.mp3');
    this.load.audio('sad', 'Assets/sad.mp3');
    this.load.audio('thuglife', 'Assets/thuglife.mp3');
    this.load.audio('clap', 'Assets/clap.mp3');
}
function create(){
    console.log("Create");
    //create the background image
    let W = game.config.width;
    let H = game.config.height;
    let spins = 1;
    
    let background = this.add.sprite(0 , 0, 'background');
    background.setPosition(W/2 , H/2);
    background.setScale(0.20);
    
     //create the stand
    let stand = this.add.sprite(W/2 , H/2+250 , "stand");
    stand.setScale(0.25);
    
    //create the pin
    let pin = this.add.sprite(W/2 , H/2-250 , "pin")
    pin.setScale(0.25);
    pin.depth = 1;
    
    //create the wheel
    this.wheel = this.add.sprite(W/2 , H/2 , "wheel");
    this.wheel.setScale(0.25);
    
    this.button = this.add.sprite(W/2-280 , H/2-200 , 'button');
    this.button.setScale(0.10);
    this.button.setInteractive({ cursor: 'pointer'});

    //event listner for mouse click
    this.button.on("pointerdown" , spinwheel , this);
    
    //create text object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color: "red",
    }
    this.game_text = this.add.text(10 , 10 , "Welcome To Spin & Win" , font_style);
    
    this.prizeText = this.add.text(W/2-280 , H/2+100 , "", font_style);
    
    this.spins = 1;
    this.add.text(W/2+180 , H/2-250 , "Spins Left : " + this.spins , font_style);
    
    this.spinmusic = this.sound.add('spinmusic');
    this.sad = this.sound.add("sad");
    this.thuglife = this.sound.add("thuglife");
    this.clap = this.sound.add("clap");
    
    this.canSpin = true;
    this.button.on("pointerdown",spinwheel , this);
    this.add.text(W/2+180 , H/2-250 , "Spins Left : " + this.spins-1 , font_style);
}

//game loop
function update(){
    console.log("Inside Update");
    //this.wheel.angle += 1;
    
}

function spinwheel(){
    console.log("You clicked th mouse");
    console.log("wheel is spinning");
    //this.game_text.setText("You Clicked The Mouse!");
if(this.canSpin){
    this.prizeText.setText("");
    let rounds = Phaser.Math.Between(2 , 5);
    let degrees = Phaser.Math.Between(0 , 11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    this.canSpin = false;
    this.sound.play('spinmusic');
    
    tween = this.tweens.add({
        targets : this.wheel,
        angle : total_angle ,      //we have to generate this randomly
        ease : "Cubic.easeOut",
        duration : 6000,
        callbackScope:this,
        onComplete:function(){
        this.game_text.setText("You won " + prizes_config.prize_names[idx]);
        
        if(prizes_config.prize_names[idx] == "Hard Luck"){
            this.sound.play('sad');
        }else if(prizes_config.prize_names[idx] == "Amazon Voucher" || prizes_config.prize_names[idx] == "Netflix"){
            this.sound.play('thuglife');
        }else{
            this.sound.play('clap');
        }
            this.canSpin = true;
    },
    });
    this.spins = 0;
    this.addText(W/2-265 , H/2-70 , "Spins Left : " + this.spins , font_style);
}
    
}