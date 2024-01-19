var scriptName = "AutoKeyPressWithLogic";
var scriptVersion = 1.0;
var scriptAuthor = "DuyunDz";

function AutoKeyPressModule() {
    var isModuleActive = false;

    this.getName = function () {
        return scriptName;
    };

    this.getDescription = function () {
        return "Automatically activates modules binded with keys C, F, X, H in LiquidBounce based on conditions.";
    };

    this.getCategory = function () {
        return "Combat";
    };

    function sendPacket(packet) {
        mc.getNetHandler().addToSendQueue(packet);
    }

    this.onUpdate = function () {
        var isFlagActive = moduleManager.getModule("Flag").isEnabled();
        var isPlayerDead = mc.thePlayer.getHealth() <= 0;
        var isEnemyDead = mc.getCurrentServerData() !== null && mc.getCurrentServerData().getPlayerInfo(mc.thePlayer.getName()) !== null &&
            mc.getCurrentServerData().getPlayerInfo(mc.thePlayer.getName()).getGameMode() === 0;

        if (isFlagActive) {
            // Bật các module bind với key H, C, F, X
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Freeze")); // Key H
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Critical")); // Key C
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Killaura")); // Key C
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Speed")); // Key C
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Vautoblock")); // Key C
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "AutoHeadFC")); // Key F
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "AutoHeadFC1")); // Key F
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Regen")); // Key F
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Superregen1")); // Key F
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Autowalk")); // Key X
        } else if (isPlayerDead || isEnemyDead) {
            // Bật các module bind với key C, F, X khi mình hoặc đối thủ chết
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Critical")); // Key C
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Killaura")); // Key C
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Speed")); // Key C
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Vautoblock")); // Key C
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "AutoHeadFC")); // Key F
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "AutoHeadFC1")); // Key F
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Regen")); // Key F
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Superregen1")); // Key F
            sendPacket(new C17PacketCustomPayload("LiquidBounce", "Autowalk")); // Key X
        }
    };

    this.onEnable = function () {
        isModuleActive = true;
    };

    this.onDisable = function () {
        isModuleActive = false;
    };
}

var autoKeyPressModule = moduleManager.registerModule(new AutoKeyPressModule());
