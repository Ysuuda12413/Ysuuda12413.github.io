var scriptName = "KillSluts";
var scriptVersion = 1.1;
var scriptAuthor = "quanghuy_VN";

var S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");
var Pattern = Java.type("java.util.regex.Pattern");
var Matcher = Java.type("java.util.regex.Matcher");

var msgs = [
	"Mày kiếm Config đó ở đâu mà rác thể hả %name% ?",
	"Nếu muốn mạnh và đẹp trai như tao thì hãy mua CoD đê!.",
	"Sao mày PvP óc chó thể hả ?? Mày biết đây là sân chơi của Hacker mà %name% ?.",
	"Địt mẹ mấy thằng PvP rác rưởi haha và tao sẽ dùng CoD để kill chúng nó!.",
	"Nếu như mày ngu quá %name%, cho tao mượn bờ vài, thì thầm tao nói nhỏ: 'Config mày như cái đầu buồi'.",
	"Sao mày óc chó thể hả %name%, mua CoD đê nó giúp mày thông minh hơn đấy!",
	"Cay chưa ?? Cay đỏ lồn chưa hả ??? Cay thì mua CoD đi cho bớt cay chứ mày PvP như con cặc!",
	"Mày nên nhớ mày có thể mua CoD trên pornhub.c,o,m =)))",
	"Con gà thì mãi mãi là con gà thôi nhá chứ đừng mong pro lên với trình của mày %name%",
	"Config của mày đừng hòng lại Config của tao nhá con chó !! %name%.",
	"Config của mày sao rác thể hở ?? Đi mua CoD đi cho bớt rác %name%!.",
	"Đù má aim như cặc ấy đánh đéo trúng phát nào =))).",
	"%name% Thôi mà đừng sủa, tao chỉ kill mày để cho zui thôi mà con chó này =)).",
        "%name% Biết đéo kill lại tao mà cứ cố haha =)).",
        "Đẹp trai thanh lịch zô địch khắp vũ trụ chỉ có tao haha =)).",
        "Config CoD ( Clover of Dead ) rẻ lắm chỉ có giá là 50,000 VNĐ à.",
        "Muốn mua thì liên hệ Discord quanghuy_VN#3217 để mua nhá cưng :3.", 
];

function Module1() {
    this.getName = function() {
        return "KillSluts";
    };
	this.getTag = function() {
		return "Minefc";
	};
    this.getDescription = function() {
        return "Get some stupid memes";
    };
    this.getCategory = function() {
        return "Fun";
    };
	var killer = Pattern.compile("§r§a([^§ ]*)");
	var victim = Pattern.compile("§r§c([^§ ]*)");
	var curMsg = 0;
	
	this.onPacket = function(event) {
		var packet = event.getPacket();
		if (packet instanceof S02PacketChat) {
			var msg = packet.getChatComponent().getFormattedText();
			if (msg.startsWith("§r§7[§r§e§lSkywars§r§7] ")) {
				var m0 = killer.matcher(msg), m1 = victim.matcher(msg);
				
				if (!m0.find() || !m1.find()) return;
				var a = m0.group(1), b = m1.group(1);
				if (a.equalsIgnoreCase(mc.thePlayer.getName())) {
					if (curMsg >= msgs.length - 1) curMsg = 0;
					mc.thePlayer.sendChatMessage(msgs[curMsg].replaceAll("%name%", b));
					curMsg++;
				}
			}
		}
	};
}

var modules = [
	new Module1()
];
function onEnable() {
	for (var i = 0; i < modules.length; i++) moduleManager.registerModule(modules[i]);
};
function onDisable() {
	for (var i = 0; i < modules.length; i++) moduleManager.unregisterModule(modules[i]);
};