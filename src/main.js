var CarFreeDay = CarFreeDay || {};

CarFreeDay.game = new Phaser.Game(720, 1280, Phaser.CANVAS, '');

CarFreeDay.game.state.add('Boot', CarFreeDay.Boot);
CarFreeDay.game.state.add('Preload', CarFreeDay.Preload);

CarFreeDay.game.state.add('Title', CarFreeDay.Title);
CarFreeDay.game.state.add('Game', CarFreeDay.Game);
CarFreeDay.game.state.add('Score', CarFreeDay.Score);

CarFreeDay.game.state.start('Boot');