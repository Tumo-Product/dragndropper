const width = 1080;
const height = 1080;

let config = {
    type: Phaser.AUTO,
    backgroundColor: '#2dab2d',
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.FIT,
        _parent: 'phaser-example',
        width: width,
        height: height
    },
    scene: {
        preload: preload,
        create: create
    },
    transparent : true
};

let game = new Phaser.Game(config);

function preload() {
    this.load.image('bg'        , '../images/background.jpg');
    this.load.image('circle'    , '../images/circle.png');
    this.load.image('poster1'   , '../images/poster.png');
    gfx.toggleLoadingScreen();
}
let context;

function create() {
    context = this;
   // let bg = this.add.image(width / 2, height / 2, 'bg').setOrigin(0.5);
   createPosterLayer1();

    let circle = this.add.image(0, 0, "circle").setOrigin(0);
    circle.scale = 0.05;
    circle.setInteractive();

    this.input.setDraggable(circle);
    this.input.dragDistanceThreshold = 5;

    this.input.on('dragstart', function (pointer, gameObject) {
        gameObject.setTint(0xff0000);
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject) {
        gameObject.clearTint();
    });
}

function createPosterLayer1() {
    let poster = context.add.image(width/2, height/2, 'poster1').setOrigin(0.5);
}
