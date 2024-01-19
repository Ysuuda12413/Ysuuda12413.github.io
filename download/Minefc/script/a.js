/// api_version=2
var script = registerScript({
    name: "sex",
    version: "1.0.0",
    authors: ["gay"]
})

script.registerModule({
    name: "AuraHelper",
    category: "Combat", 
    description: "TRUM?",
},

 function (module) {
module.on("update", function() {
	var longjump = moduleManager.getModule("LongJump")
	var fly = moduleManager.getModule("Fly")
	var timer = moduleManager.getModule("Timer")
	
	if (longjump.getState() || fly.getState() || timer.getState() ){
		mc.gameSettings.keyBindUseItem.pressed = false;
	}else{mc.gameSettings.keyBindUseItem.pressed = true;}
     
});

// Event called after the script has been enabled by the client.
module.on("enable", function() {
  
});

// Event called after the script has been disabled by the client.
module.on("disable", function() {
    mc.gameSettings.keyBindUseItem.pressed = false;
});

 });