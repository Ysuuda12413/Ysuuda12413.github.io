var scriptName = "DCriticals";
var scriptVersion = 1.2;
var scriptAuthor = "NgThDat";

var exampleModule = new ExampleModule();
var exampleModuleClient;

function ExampleModule() {
    this.getName = function() {
        return "DCriticals";
    };

    this.getDescription = function() {
        return "crit dung chit may thang lon";
    };

    this.getCategory = function() {
        return "Fun";
    };

    this.onAttack = function(event) {
        mc.thePlayer.onCriticalHit(event.getTargetEntity());//chich gai sech : )
    }
}

function onLoad() {
};

function onEnable() {
    exampleModuleClient = moduleManager.registerModule(exampleModule);
};

function onDisable() {
    moduleManager.unregisterModule(exampleModuleClient);
};