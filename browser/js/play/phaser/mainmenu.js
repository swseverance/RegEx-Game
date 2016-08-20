RegexGame.MainMenu = function(){};

RegexGame.MainMenu.prototype = {
  start: function(){
      this.game.state.start('Game');
  },
  create: function() {
    //play the menu bumper
    let music = this.add.audio('menuBumper');
    music.addMarker('playMenuBumper',0,6)
    music.play('playMenuBumper');
   //show the space tile, repeated
    //this.background = this.game.add.sprite(0, 0, 'desert');
    this.background = this.game.add.tilemap('simpleCity_Layer1');
    this.background.addTilesetImage('streetTiles');
    let layer = this.background.createLayer(0);

    let textStyle = { font: "25px gameFont", fill: "cyan", align: "center" };

    //start game text
    let text1 = "CLICK TO BEGIN!";
    let t1 = this.game.add.text(this.game.width/2, this.game.height/2, text1, textStyle);
    t1.anchor.set(0.5);
    t1.inputEnabled = true;
    t1.events.onInputDown.add(this.start, this);


    //highest score
    let text3 = "Highest score: "+ this.game.scope.highestScore;
    this.game.scope.$evalAsync();
    let t3 = this.game.add.text(this.game.width/2, this.game.height/2 + 100, text3, textStyle);
    t3.anchor.set(0.5);

  },

};
