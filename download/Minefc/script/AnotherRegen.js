var scriptName = "AnotherRegen";
var scriptVersion = 1.3;
var scriptAuthor = "LoNg_D4rk";

var Nolagz = new Nolagz();
var NolagzClient;
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var DiamondSword = Java.type("net.minecraft.network.play.client.C00PacketKeepAlive");
var PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var Pingr = Java.type("net.minecraft.network.status.client.C01PacketPing");
var Items = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");
var Potion = Java.type("net.minecraft.potion.Potion");

function Nolagz() {
	var Mode = value.createList("Mode", ["Packet", "Old"], "Packet");
//	var Regen = value.createBoolean("RegenOnly", false);
	var Speed = value.createInteger("Speed", 5, 1, 100);
	    this.getName = function () {
        return "AnotherRegen";
    };

    this.getDescription = function () {
        return "Regenerates health quickly.";
    };
var swics = false;
    this.getCategory = function () {
        return "Player";
    };
	var helditem;
var switcher = false;
var dely = 0;
    this.onUpdate = function () {
		dely++;
		if(mc.thePlayer.getHealth() <= Health.get()) {
		if(dely >= Delay.get()) {
	if(((OnGround.get() && mc.thePlayer.onGround) || OnGround.get() == false)) {
		switch(Mode.get()) {
		case "Packet":
			for(var x = 0; x < Speed.get(); x++) {
				mc.thePlayer.sendQueue.addToSendQueue(new PlayerPacket(true));
			}
			if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Regenning ");
		} else {
			chat.print("§c[Debug] §fRegenning ");
		}
		}
		break;
		case "Old":
				for(var x = 0; x < Speed.get(); x++) {
				mc.thePlayer.sendQueue.addToSendQueue(new PlayerPacket(mc.thePlayer.onGround));
			}
			if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Regenning " + mc.thePlayer.onGround);
		} else {
			chat.print("§c[Debug] §fRegenning " + mc.thePlayer.onGround);
		}
		}
			break;
			case "Regen":
			if(mc.thePlayer.isPotionActive(Potion.regeneration)){
							for(var x = 0; x < Speed.get(); x++) {
				mc.thePlayer.sendQueue.addToSendQueue(new PlayerPacket(true));
			}
			if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Regenning ");
		} else {
			chat.print("§c[Debug] §fRegenning ");
		}
		}
			}
			break;
		}
		dely = 0;
		}
		}
		}
    }
    
    this.onDisable = function() {
		dely = 0;
    }
    
    this.onEnable = function() {
    }
	this.addValues = function(ass) {
		ass.add(Mode);
		ass.add(Speed);
	//	ass.add(Regen);
		}
}

function onEnable() {
    NolagzClient = moduleManager.registerModule(Nolagz);
};

function onDisable() {
    moduleManager.unregisterModule(NolagzClient);
};