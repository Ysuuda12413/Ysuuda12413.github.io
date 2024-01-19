/// api_version=2

var script = registerScript({ 
    name: "Help",
    version: "1.0.0",
    authors: ["idk"]
});

script.registerModule({
    name: "Helps",
    category: "Misc",
    description: "Just walks" },
    function (module) {
    module.on("update", function(event)
    { 
        mc.gameSettings.keyBindForward.pressed = true;
    });
    module.on("disable", function(event)
    {
        mc.gameSettings.keyBindForward.pressed = false;
    });
});