/// api_version=2
var freezeModule = moduleManager.getModule("freeze"); // Lấy module "freeze" từ moduleManager
var script = registerScript({
    name: "Bot",
    version: "1.0.0",
    authors: ["DuyunDz"]
});
script.registerModule({
    name: "BotTest",
    category: "Combat", 
    description: "Test"
}, function (module) {
    module.on('update', function () {
        if (Keyboard.isKeyDown(Keyboard.KEY_C)) {
            // Bấm nút C
            Keyboard.keyPress(Keyboard.KEY_C);
    
            // Chờ một khoảng thời gian
            setTimeout(function () {
                // Bấm nút X
                Keyboard.keyPress(Keyboard.KEY_X);
    
                // Kiểm tra flag
                if (flag) {
                    // Bật module "freeze" nếu flag được kích hoạt
                    if (!freezeModule.isActive()) { // Kiểm tra xem module đã được kích hoạt hay chưa
                        freezeModule.toggle(); // Bật module nếu chưa được kích hoạt
                    }
                    // Thực hiện hành động 'h'
                    // ...
                }
    
                // Kiểm tra nếu KillAura đã giết được đối thủ
                if (KillAura.hasKilledTarget()) {
                    // Tắt toàn bộ
                    module.setValue(false);
                    KillAura.setValue(false);
                    // Tắt các module khác nếu cần thiết
                    // ...
                }
            }, 1000); // Thời gian chờ sau khi bấm nút C (đơn vị: milliseconds)
        }
    });
});



