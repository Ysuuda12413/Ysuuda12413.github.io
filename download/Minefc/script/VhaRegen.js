var scriptName = "vharegen";
var scriptVersion = 1.0;
var scriptAuthor = "npa";

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
	var Mode = value.createList("Mode", ["Packet", "Best", "Unkhown", "Gapple"], "Best");
	var OnGround = value.createBoolean("Groundonly", false);
	var Speed = value.createInteger("Speed", 5, 1, 100);
	var Delay = value.createInteger("Delay", 3, 0, 100);
	var Health = value.createInteger("Health", 18, 1, 20);
	var Debug = value.createBoolean("Debug", false);
    this.getName = function () {	
        return "VHARegen";
    };

    this.getDescription = function () {
        return "vharegen test";
    };
var swics = false;
    this.getCategory = function () {
        return "Client";
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
			chat.print("§7[Debug] §cRegenning ");
		} else {
			chat.print("§7[Debug] §cRegenning ");
		}
		}
		case "Best":
				for(var x = 0; x < Speed.get(); x++) {
				mc.thePlayer.sendQueue.addToSendQueue(new PlayerPacket(mc.thePlayer.onGround));
			}
			if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§7[Debug] §cRegenning " + mc.thePlayer.onGround);
		} else {
			chat.print("§7[Debug] §cRegenning " + mc.thePlayer.onGround);
		}
		}
			break;
			case "Unkhown":
			if(mc.thePlayer.isPotionActive(Potion.regeneration)){
							for(var x = 0; x < Speed.get(); x++) {
				mc.thePlayer.sendQueue.addToSendQueue(new PlayerPacket(true));
			}
			if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§7[Debug] §cRegenning ");
		} else {
			chat.print("§7[Debug] §cRegenning ");
		}
		}
			}
			break;
		case "Gapple":
				for(var x = 0; x < Speed.get(); x++) {
				mc.thePlayer.sendQueue.addToSendQueue(new PlayerPacket(mc.thePlayer.onGround));
			}
			if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§7[Debug] §cRegenning " + mc.thePlayer.onGround);
		} else {
			chat.print("§7[Debug] §cRegenning " + mc.thePlayer.onGround);
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
		ass.add(Delay);
		ass.add(Health);
		ass.add(OnGround);
	//	ass.add(Regen);
		ass.add(Debug);
	}
}

function onEnable() {
    NolagzClient = moduleManager.registerModule(Nolagz);
};

function onDisable() {
    moduleManager.unregisterModule(NolagzClient);
};