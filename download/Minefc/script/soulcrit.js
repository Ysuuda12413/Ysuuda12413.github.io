var scriptName = "Criticals"; 
var scriptVersion = 1.3; 
var scriptAuthor = "soulplexis";

var autoGapple = new AutoGapple(); // it's totally autogapple 
var autoGappleClient;

var C06PlayerPosLookPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var attk = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
function randomIntFrom(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
} 

function AutoGapple() {
	var Mode = value.createList("Mode", ["Packet", "FluxB13", "Hop", "Matrix", "Spartan", "Horizon", "Custom", "CPacket", "NoGround", "New", "LegitPacket", "ACP", "Super", "Hypixel", "NoHit", "Void"], "Packet");
	var MotionY = value.createFloat("CMotionY", 0.05, 0.01, 0.42);
	var NewY = value.createFloat("CPacketY", 0.05, 0.01, 1.00);
	var NewDiv = value.createBoolean("CPacketDivide", false);
	var hurttime = value.createInteger("HurtTime", 5, 0, 10);
	var delay = value.createInteger("Delay", 0, 0, 20);
	var SuperAmount = value.createInteger("SuperAmount", 9, 0, 20);
	var Debug = value.createBoolean("Debug", false);
	var swics = false;
    this.getName = function() {
        return "SoulCriticals";
    };

    this.getDescription = function() {
        return "More critical modes i guess.";
    };

    this.getCategory = function() {
        return "Combat";
    };

	var newy1 = 0;
	this.onMotion = function() {
		if(NewDiv.get() == true) {
			newy1 = NewY.get() / 10;
		} else {
			newy1 = NewY.get();
		}
		if(Mode.get() == "NoHit") {
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + newy1, mc.thePlayer.posZ, true))
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
		if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! " + newy1);
		} else {
			chat.print("§c[Debug] §fCritical! " + newy1);
		}
		}
	}
	}
	var shit = 0;
	var fuckin = false;
	var target;
	var attackin = false;
	var crittin = false;
    this.onAttack = function (event) {
			target = event.getTargetEntity();
			if(Mode.get() == "Void") {
				mc.thePlayer.onCriticalHit(target);
				mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(!mc.thePlayer.onGround));
				mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(!mc.thePlayer.onGround));
				mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(!mc.thePlayer.onGround));
				mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(!mc.thePlayer.onGround));
				mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(!mc.thePlayer.onGround));
				mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(!mc.thePlayer.onGround));
				mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(!mc.thePlayer.onGround));
				mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(!mc.thePlayer.onGround));
				mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(!mc.thePlayer.onGround));
			}
		if(mc.thePlayer.onGround) {
			fuckin = true;
			shit++;
		if(target.hurtTime <= hurttime.get() && shit >= delay.get()) {
				shit = 0;
			attackin = true;
		switch(Mode.get()) {
		case "Packet":
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.08, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
					if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! 0.08");
		} else {
			chat.print("§c[Debug] §fCritical! 0.08");
		}
		}
		break;
		case "FluxB13": // does not bypass Hypixel it jus has the same offset as Flux client
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.001, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
					if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! 0.001");
		} else {
			chat.print("§c[Debug] §fCritical! 0.001");
		}
		}
		break;
		case "Hop":
			mc.thePlayer.motionY = 0.10;
			if(Debug.get() && mc.thePlayer.motionY < 0 && mc.thePlayer.onGround == false) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! " + mc.thePlayer.motionY);
		} else {
			chat.print("§c[Debug] §fCritical! " + mc.thePlayer.motionY);
		}
		}
		break;
		case "Matrix":
		    if(mc.thePlayer.motionX == 0.0 && mc.thePlayer.motionZ == 0.0) {
		    	mc.thePlayer.motionY = 0.20; 
						if(Debug.get() && mc.thePlayer.motionY < 0 && mc.thePlayer.onGround == false)  {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! " + newy1);
		} else {
			chat.print("§c[Debug] §fCritical! " + newy1);
		}
		}
		    }
			
		break;
		case "Spartan": //patchd 
		    	mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.04, mc.thePlayer.posZ, true))
		    	mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
								if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! 0.04");
		} else {
			chat.print("§c[Debug] §fCritical! 0.04");
		}
		}
		break;
		case "Horizon": // patchd
		if(mc.thePlayer.motionX == 0.0 && mc.thePlayer.motionZ == 0.0) {
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.00000000255, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
							if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! 0.0E-8255");
		} else {
			chat.print("§c[Debug] §fCritical! 0.0E-8255");
		}
		}
		}
		break;
		case "Custom":
			mc.thePlayer.motionY = MotionY.get();
						if(Debug.get() && mc.thePlayer.motionY < 0 && mc.thePlayer.onGround == false)  {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! " + MotionY.get());
		} else {
			chat.print("§c[Debug] §fCritical! " + MotionY.get());
		}
		}
		break;
		case "CPacket":
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + newy1, mc.thePlayer.posZ, true))
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
									if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! " + newy1);
		} else {
			chat.print("§c[Debug] §fCritical! " + newy1);
		}
		}
		break;
		case "New":
		crittin = true;
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + (randomIntFrom(8,2048) / 10000), mc.thePlayer.posZ, false))
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
									if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! " + (randomIntFrom(8,2048) / 10000));
		} else {
			chat.print("§c[Debug] §fCritical! " + (randomIntFrom(8,2048) / 10000));
		}
		}
		break;
		case "LegitPacket":
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.20, mc.thePlayer.posZ, false))
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
											if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! 0.20");
		} else {
			chat.print("§c[Debug] §fCritical! 0.20");
		}
		}
		break;
		case "Super":
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + SuperAmount.get(), mc.thePlayer.posZ, false))
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
											if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! " + SuperAmount.get());
		} else {
			chat.print("§c[Debug] §fCritical! " + SuperAmount.get());
		}
		}
		break;
		}
		}
		}
		if(Mode.get() == "ACP") {
			    	shit++;
		    if(shit == 1) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.000000128, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
												if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! 0.0E-6128");
		} else {
			chat.print("§c[Debug] §fCritical! 0.0E-6128");
		}
		}
		}
		    }
		    if(shit >= 5) {
			shit = 0;
		    }
			if(Mode.get() == "Hypixel") {
				if(mc.thePlayer.onGround) {
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + newy1, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
									if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! " + newy1 );
		} else {
			chat.print("§c[Debug] §fCritical! " + newy1 );
		}
		}
				} else {
					mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + newy1 /10000, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
									if(Debug.get()) {
		swics = !swics 
		if(swics) {
			chat.print("§c[Debug] §7Critical! " + newy1 /10000);
		} else {
			chat.print("§c[Debug] §fCritical! " + newy1 /10000);
		}
		}
				}
		    }
	}
	this.onDisable = function() {
		mc.timer.timerSpeed = 1.0;
		shit = 0;
	}
	this.onPacket = function(event) {
		if(crittin == true && Mode.get() == "New") {
		var packet = event.getPacket();
			if (packet instanceof C03PacketPlayer && !(packet instanceof C04PacketPlayerPosition) && !(packet instanceof C05PacketPlayerLook) && !(packet instanceof C06PacketPlayerPosLook)){
					mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, packet.isOnGround()));
					event.cancelEvent();
				}
				if (packet instanceof C05PacketPlayerLook){
					mc.thePlayer.sendQueue.addToSendQueue(new C06PacketPlayerPosLook(packet.getPositionX(), packet.getPositionY(), packet.getPositionZ(), mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, packet.isOnGround()));
					event.cancelEvent()
				}
				crittin = false;
		}
		/* if(fuckin == true) {
			if(packet instanceof C03PacketPlayer) {
				event.cancelEvent();
				fuckin = false;
			}
		} */
		if(Mode.get() == "NoGround") {
		var packet = event.getPacket();
		if(packet instanceof C03PacketPlayer) {
			packet.onGround = false;
		}
		}
	}
	this.addValues = function(values) {
		values.add(Mode);
		values.add(MotionY);
		values.add(NewY);
		values.add(NewDiv);
		values.add(hurttime);
		values.add(delay);
		values.add(SuperAmount);
		values.add(Debug)
    }
	this.getTag = function() {
    return Mode.get();
}
}

function onLoad() {
};

function onEnable() {
    autoGappleClient = moduleManager.registerModule(autoGapple);
};

function onDisable() {
    moduleManager.unregisterModule(autoGappleClient);
};