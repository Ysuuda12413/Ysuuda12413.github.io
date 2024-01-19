/// api_version=2

var script = registerScript({
    name: "BotHelper",
    version: "1.0",
    authors: ["xx__Duy__xx"]
});

script.registerModule({
    name: "BotHelper",
    category: "Misc",
    description: "Bot Helper"},
    function(module){

    module.on("update", function(event)
    {
        mc.gameSettings.keyBindUseItem.pressed = true;
        mc.gameSettings.keyBindForward.pressed = true;
        mc.gameSettings.keyBindJump.pressed = true;
    });
    module.on("disable", function(event)
    {
        mc.gameSettings.keyBindUseItem.pressed = false;
        mc.gameSettings.keyBindForward.pressed = false;
        mc.gameSettings.keyBindJump.pressed = false;
    });

});