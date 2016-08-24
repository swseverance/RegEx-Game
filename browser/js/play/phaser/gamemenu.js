RegexGame.GameMenu = function(){};

RegexGame.GameMenu.prototype = {
  goHome: function(){
    this.music.stop();
    this.game.scope.goHome();
  },
  start: function(){
      this.music.stop();
      this.game.state.start('Game', true, false, 'battleA' , 186);
  },
  init: function(){
    this.music = this.add.audio('theme');
    this.music.addMarker('playTheme',0,6)
    this.background = this.game.add.tilemap('simpleCity_Layer1');
    this.background.addTilesetImage('streetTiles');
  },
  create: function() {

    this.music.play('playTheme');
    this.background.createLayer(0);
    this.game.add.image(0,0, 'dudeLogo')

    //create buttons
    let startButton = new TextOrButton('button', this.game, 35, 10, 'Begin', 100, this.start, this);

    let mainMenuButton = new TextOrButton('button', this.game, 10, 10, 'Main Menu', 50, this.goHome, this);

    this.game.scope.$evalAsync();
    let highScore = new TextOrButton('text', this.game, 0, 0, 'Highest Score: ' + this.game.scope.highestScore, null, null, null, 300);

  },

};
