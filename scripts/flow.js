let config = {
    type: Phaser.WEBGL,
    backgroundColor: "#ffffff",
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

function preload() {
    this.load.image('mario', '../images/circle.png');
    this.load.image('bg', '../images/background.jpg')
    this.scale.scaleMode = Phaser.Scale.ScaleModes.RESIZE;
}

function create() {
    let background = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'bg');
    let image = this.add.sprite(200, 300, 'mario').setInteractive();
    image.setScale(.05);
    background.setScale(.5);

    image.on('pointerover', function () {
        this.setTint(0x00ff00);
    });

    image.on('pointerout', function () {
        this.clearTint();
    });

    this.input.setDraggable(image);

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
