app.config(function ($stateProvider) {
    $stateProvider.state('play', {
        url: '/play',
        templateUrl: 'js/play/play.html',
        controller: 'PlayCtrl',
    });
});

app.controller('PlayCtrl', function ($scope){

    const gameConfig = {
      width: 800,
      height: 600,
      scoreIncrement: 10
    }
    let bombs;
    let platforms;
    let player;
    let bomb;
    let cursors;
    let bombArr = [];
    let score = 0;
    let scoreText;
    let game = new Phaser.Game(gameConfig.width, gameConfig.height, Phaser.AUTO, 'playGame', { preload: preload, create: create, update: update });

    function randombomb(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max-min+min));
    }

    function collectbomb (player, bomb) {
        // Removes the bomb from the screen
        bomb.kill();

        //  Add and update the score
        score += gameConfig.scoreIncrement;
        scoreText.text = 'Score: ' + score;
    }

    function preload() {
        game.load.image('desert', 'assets/desert.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('bomb', 'assets/bombs.png', 128, 128);
    }

    function create() {
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //  A simple background for our game
        game.add.sprite(0, 0, 'desert');
        // add the score
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0;
        player.body.gravity.y = 0;
        player.body.collideWorldBounds = true;
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.animations.add('down', [4, 3, 0, 1], 10, true);

        bombs = game.add.group();
        bombs.enableBody = true;
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 5; i++)
        {
            //  Create a bomb inside of the 'bombs' group
            var bomb = bombs.create(randombomb(64, gameConfig.width-64), 0, 'bomb');
            bomb.scale.setTo(.5,.5);
            bomb.stopFalling = randombomb(64, gameConfig.height-64);
            //  Let gravity do its thing
            bomb.body.gravity.y = 300;
            //  This just gives each bomb a slightly random bounce value
            bomb.body.bounce.y = 0.4 + Math.random() * 0.2;
            bombArr.push(bomb)
        }
    }

    function update() {
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(bombs, platforms);
        cursors = game.input.keyboard.createCursorKeys();
        game.physics.arcade.overlap(player, bombs, collectbomb, null, this)

        bombArr.forEach(bomb => {
          if(bomb.position.y >= bomb.stopFalling) {
            bomb.body.velocity.x =0;
            bomb.body.velocity.y =0;
            bomb.body.gravity.y = 0;
          }
        })

    //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        //  Allow the player to jump if they are touching the ground.
        else if (cursors.up.isDown)
        {
            player.body.velocity.y = -100;
            player.animations.play('down');
        }


        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 100;
            player.animations.play('down');
        }

        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
      }
})