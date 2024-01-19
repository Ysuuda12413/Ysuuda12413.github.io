/// api_version=2
var script = registerScript({
    name: "AutoPressCFX",
    version: "1.0",
    authors: ["idk"]
});

script.registerModule({
    name: "AutoPressCFX",
    category: "Combat",
    description: "Automatically presses 'C', 'F', and 'X'."
}, function (module) {
    module.on("update", function() {
        ['C', 'F', 'X'].forEach(function(key) {
            var keyBinding = mc.gameSettings.keyBindings.find(function(keyBinding) {
                return keyBinding.keyDescription === "key.keyboard." + key.toLowerCase(); // Tìm phím tắt cho nút 'C', 'F', và 'X'
            });

            if (keyBinding) {
                keyBinding.pressed = true; // Giả lập việc nhấn nút 'C', 'F', và 'X'
                setTimeout(function() {
                    keyBinding.pressed = false; // Giả lập việc thả nút 'C', 'F', và 'X'
                }, 100);
            }
        });
    });
});
