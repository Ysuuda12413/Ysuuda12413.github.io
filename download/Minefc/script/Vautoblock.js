/// api_version=2
var script = registerScript({
    name: "Vautoblock",
    version: "1.0.0",
    authors: ["bacu"]
});

script.registerModule({
    name: "Vautoblock",
    category: "Combat", 
    description: "TRUM SERVER?"
},

 function (module) {
module.on("attack", function() {
     mc.gameSettings.keyBindUseItem.pressed = true;
	  if (mc.thePlayer.ticksExisted % 34 == 0) {
		mc.thePlayer.swingItem();
	 }	
});

// Event called after the script has been enabled by the client.
module.on("enable", function() {
  
});

// Event called after the script has been disabled by the client.
module.on("disable", function() {
    mc.gameSettings.keyBindUseItem.pressed = false;
});

 });