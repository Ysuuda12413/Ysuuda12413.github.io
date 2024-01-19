var scriptName = "Critv2"; 
var scriptVersion = 1.3; 
var scriptAuthor = "trum";

var autoGapple = new AutoGapple(); // it's totally autogapple 
var autoGappleClient;

var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");

function AutoGapple() {
	var Mode = value.createList("Mode", ["Packet", "AACv5", "Visual", "Znos", "MotionZ", "MotionY", "NoGround"], "Packet");
	var MotionY = value.createFloat("MotionY", 0.05, 0.01, 0.42);
        var packety = value.createFloat("PacketY", 0.05, 0.01, 0.70)
        var delay = value.createInteger("Delay", 500, 0, 500);
        var hurttime = value.createInteger("HurtTime", 50, 0, 50);

    this.getName = function() {
        return "CriticalsV2";
    };

    this.getDescription = function() {
        return "Hennessy ";
    };
    this.getCategory = function() {
        return "Combat";
    };
	this.onMotion = function() {
	}
	var shit = 0;
     this.onAttack = function(event) {
        var target = event.getTargetEntity()
        if(mc.thePlayer.onGround) {
            switch(mode.get()) {
                case "Packet":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + packety.get(), mc.thePlayer.posZ, true))
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
                        timer.reset()
		    }
		break;
		case "AACv5":
			mc.thePlayer.motionY = 0.32;
		break;
                case "Visual":
		     if(particles.get() || mode.get() == "Visual") {
           mc.thePlayer.onCriticalHit(target)
		    }
		break;
		case "Znos": // critv2 manh vai lon khong biet noi j lun
		    shit++;
		    if(mc.thePlayer.motionX == 0.0 && mc.thePlayer.motionZ == 0.0) {
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 0.0001, mc.thePlayer.posZ, true))
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
		    }
		    if(shit >= 10) {
			shit = 0;	
		    }
		break;
		 case "MotionZ":
                    if(timer2.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.thePlayer.motionY = motiony.get()
                        timer2.reset()
		}
		
		break;
		case "MotionY":
			mc.thePlayer.motionY = MotionY.get();
		break;
		}
		}
	}
	this.onDisable = function() {
		mc.timer.timerSpeed = 1.0;
		shit = 0;
        }
        this.onPacket = function(event) {
		if(Mode.get() == "NoGround") {
		var packet = event.getPacket();
		if(packet instanceof C04PacketPlayer) {
			packet.onGround = false;
                }
                } 
	}
	this.addValues = function(values) {
		values.add(Mode);
		values.add(MotionY);
                values.add(packety);
                values.add(delay);
                values.add(hurttime);
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
