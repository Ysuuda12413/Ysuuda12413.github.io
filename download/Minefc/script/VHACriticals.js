var scriptName = "VHACriticals";
var scriptVersion = 1.02561515;
var scriptAuthor = "VuHaiAnh";


function VHACritical() {
    this.getName = function () {
        return "VHACriticals";
    };

    this.getDescription = function () {
        return "make a stronger in your hack.";
    };

    this.getCategory = function () {
        return "Client";
    };
    this.onAttack = function() {
    if (mc.thePlayer.onGround)
        mc.thePlayer.jump();
	} 
    this.onDisable = function() {
    }
    
    this.onEnable = function() {
    }

}
var SLCriticals = new SLCriticals();
var SLCriticalsMen;

function onEnable() {
    SLCriticalsMen = moduleManager.registerModule(SLCriticals);
};

function onDisable() {
    moduleManager.unregisterModule(SLCriticalsMen);
};