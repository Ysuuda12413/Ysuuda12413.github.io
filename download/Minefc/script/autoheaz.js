var scriptName = "AutoHead";
var scriptAuthor = "RacBoiVN";
var scriptVersion = 1.1;

var Potion = Java.type('net.minecraft.potion.Potion');
var Item = Java.type('net.minecraft.item.Item');

function ExampleModule() {
  var Health = value.createFloat("Health", 10, 1, 20);
  var slot = value.createInteger("Slot", 1, 1, 9);
  var tick = 0
    this.getName = function() {
        return "AutoHeadFC";
    }
    this.getDescription = function() {
        return "Auto eat Golden Head when your health too lol"
    }
    this.getCategory = function() {
        return "Combat"; 
    }
    this.onEnable = function() {  
    }
    this.onDisable = function() {
        
    }
    this.onUpdate = function() {
      if (mc.thePlayer.getHealth() <= Health.get()) {
        if (!mc.thePlayer.isPotionActive(Potion.regeneration)) { 
          for (var n = 0; n <= 8; n++) {
			if (mc.thePlayer.inventoryContainer.getSlot(n+36).getStack() ? Item.getIdFromItem(mc.thePlayer.inventoryContainer.getSlot(n+36).getStack().getItem()) == 397 : false) {   //code by nvaros
                mc.thePlayer.inventory.currentItem = n;
    			mc.gameSettings.keyBindUseItem.pressed = true;
                tick = 0
                }
            }
          }
        }
        tick++
        if (tick == 3 && mc.thePlayer.isPotionActive(Potion.regeneration)) { 
            mc.gameSettings.keyBindUseItem.pressed = false;
            mc.thePlayer.inventory.currentItem = slot.get()  - 1;
            }
        }
        this.addValues = function(values) {
              values.add(Health);
              values.add(slot);
        } 
}

 var exampleModule = new ExampleModule();
var exampleModuleClient;

function onLoad() {}

function onEnable() {
    exampleModuleClient = moduleManager.registerModule(exampleModule);
}

function onDisable() {
    moduleManager.unregisterModule(exampleModuleClient);
}