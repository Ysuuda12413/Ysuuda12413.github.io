var scriptName = "HealthMonitor";
var scriptVersion = 1.0;
var scriptAuthor = "idk"; // Đổi tên tác giả thành "idk"

var HealthMonitor = new HealthMonitor();
var client;

function HealthMonitor() {
    var lastHealth; // Lưu trữ số máu cuối cùng của người chơi

    this.getName = function() {
        return "HealthMonitor";
    };

    this.getDescription = function() {
        return "Monitors the player's health.";
    };

    this.getCategory = function() {
        return "Player";
    };

    this.onUpdate = function() {
        var currentHealth = mc.thePlayer.getHealth(); // Lấy số máu hiện tại của người chơi

        if (lastHealth !== undefined && currentHealth !== lastHealth) {
            var healthDifference = currentHealth - lastHealth; // Tính toán sự khác biệt về sức khỏe

            if (healthDifference > 0) {
                chat.print("[+] " + healthDifference); // Thông báo số máu đã hồi
            } else if (healthDifference < 0) {
                chat.print("[-] " + (-healthDifference)); // Thông báo số máu đã mất
            }
        }

        lastHealth = currentHealth; // Cập nhật số máu cuối cùng
    };
}

function onEnable() {
    client = moduleManager.registerModule(HealthMonitor);
};

function onDisable() {
    moduleManager.unregisterModule(client);
};
