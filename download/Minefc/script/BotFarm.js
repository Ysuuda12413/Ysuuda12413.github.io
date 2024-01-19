var scriptName = "BotFarm";
var scriptVersion = 1.0;
var scriptAuthor = "AmongUs";

var exampleModule = new ExampleModule();
var exampleModuleClient;

function ExampleModule() {
    this.getName = function() {
        return "BotFarm";
    }

    this.getDescription = function() {
        return "Really Cool";
    }

    this.getCategory = function() {
        return "combat";
    }

var namebot = "DuyunDz23"
var password = "huuduy"

bot.jointhepit = true
bot.autowalk = true

function onLoad() {}

function onUnload() {}

function onEnable() {
    exampleModuleClient = moduleManager.registerModule(exampleModule);
};

function onDisable() {
    moduleManager.unregisterModule(exampleModuleClient);
};