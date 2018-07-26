var CarFreeDay = CarFreeDay || {};
var banner;

function onDeviceReady(){
	//StatusBar.hide();
	if (!window.Cocoon || !Cocoon.Ad || !Cocoon.Ad.AdMob){
		alert('Cocoon AdMob plugin not installed');
		return;
	}

	Cocoon.Ad.AdMob.configure({
	    android: {
	        appId: "ca-app-pub-3537042140912764~9994705449",
	        banner: "ca-app-pub-3537042140912764/3161402464"
	    }
	});

	banner = Cocoon.Ad.AdMob.createBanner();

	CarFreeDay.game = new Phaser.Game(720, 1280, Phaser.AUTO, '');

	CarFreeDay.game.state.add('Boot', CarFreeDay.Boot);
	CarFreeDay.game.state.add('Preload', CarFreeDay.Preload);

	CarFreeDay.game.state.add('Title', CarFreeDay.Title);
	CarFreeDay.game.state.add('Game', CarFreeDay.Game);
	CarFreeDay.game.state.add('Score', CarFreeDay.Score);

	CarFreeDay.game.state.start('Boot');
}

//window.onload = function(){
	
//}
document.addEventListener("deviceready", onDeviceReady, false);

