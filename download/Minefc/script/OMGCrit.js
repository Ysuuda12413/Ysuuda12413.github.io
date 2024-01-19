var scriptName = "OMGCrit"; 
var scriptVersion = 1.2; 
var scriptAuthor = "idk";

var autoGapple = new AutoGapple(); // it's totally autogapple 
var autoGappleClient;

var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var MSTimer = Java.type('net.ccbluex.liquidbounce.utils.timer.MSTimer');
var timer = new MSTimer()
var player = mc.thePlayer;
function AutoGapple() {
	var Mode = value.createList("Mode", ["Best","Motion","NCP","AAC4HIT","Super"], "Best");
	var MotionY = value.createFloat("CustomMotionY", 0.05, 0.01, 0.42);

    this.getName = function() {
        return "CRIT";
    };

    this.getDescription = function() {
        return "OMGGG";
    };

    this.getCategory = function() {
        return "Combat";
    };
	this.onMotion = function() {
	}
	var shit = 0;
    this.onAttack = function (event) {
		if(mc.thePlayer.onGround) {
		switch(Mode.get()) {
		case "Best": // seems to work on Spartan on treeAC, every other hit is a critical
		    shit++;
			chat.print(shit)
		    if(shit == 1) { 
		    	mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.045, mc.thePlayer.posZ, true))
		    	mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
		    }
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "AAC4HIT":	 
                mc.thePlayer.onCriticalHit(entity)
		break;
		case "NCP":
                    if(timer.hasTimePassed(500) && target.hurtTime <= 8) {
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 0.11, mc.thePlayer.posZ, true))
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
                        timer.reset()
                    }
		break;
		case "Motion":
			mc.thePlayer.motionY = MotionY.get();
		break;
		case "Super":
			if (player.isAttacking()) {
				shit++
				if (player.onGround && shit == 1) {
					mc.netHandler.addToSendQueue(new C04PacketPlayerPosition(player.posX, player.posY + 0.045, player.posZ, false));
				} if(shit >= 5){
					mc.netHandler.addToSendQueue(new C04PacketPlayerPosition(player.posX, player.posY, player.posZ, false));
					shit = 0
				}
			}
		break;
		}
		}
	}
	this.onDisable = function() {
		shit = 0;
	}
	this.addValues = function(values) {
		values.add(Mode);
		values.add(MotionY);
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
