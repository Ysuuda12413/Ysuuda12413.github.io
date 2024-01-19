var scriptName = "PacketMonitor";
var scriptVersion = 1.0;
var scriptAuthor = "Assistant";

var PacketMonitor = new PacketMonitor();
var client;

function PacketMonitor() {
    var packetCount = 0; // Biến đếm số gói tin
    var lastTime = 0; // Biến lưu thời gian cuối cùng in ra thông tin gói tin

    this.getName = function() {
        return "PacketMonitor";
    };

    this.getDescription = function() {
        return "Monitors the packets sent and received by the player.";
    };

    this.getCategory = function() {
        return "Misc";
    };

    this.onPacket = function(event) {
        var packet = event.getPacket(); // Lấy gói tin từ sự kiện

        // Kiểm tra xem gói tin có phải là gói tin người chơi không
        if (packet instanceof C03PacketPlayer) {
            var currentTime = System.currentTimeMillis(); // Lấy thời gian hiện tại

            // Kiểm tra xem đã qua 5 giây từ lần cuối cùng in ra thông tin gói tin chưa
            if (currentTime - lastTime >= 5000) {
                packetCount = 0; // Đặt lại biến đếm số gói tin
                lastTime = currentTime; // Cập nhật thời gian cuối cùng in ra thông tin gói tin
            }

            // Kiểm tra xem số gói tin đã đạt tới giới hạn chưa
            if (packetCount < 5) {
                if (event.isOutgoing()) { // Nếu gói tin đang được gửi đi
                    chat.print("§a[Outgoing] §7" + packet.getClass().getSimpleName());
                } else { // Nếu gói tin đang được nhận
                    chat.print("§c[Incoming] §7" + packet.getClass().getSimpleName());
                }

                packetCount++; // Tăng biến đếm số gói tin
            }
        }
    };
}

function onEnable() {
    client = moduleManager.registerModule(PacketMonitor);
};

function onDisable() {
    moduleManager.unregisterModule(client);
};
