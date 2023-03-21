import { Emulator } from "gotron/lib/device/Emulator";
import { waitForMs } from "gotron/lib/utils/DeviceTools";

(async () => {
  const emulator = await Emulator.connectToEmulator(5555);
  await emulator.waitTillBoot();

  const hierarchy = await emulator.hierarchy();
  const element = hierarchy.findElementsByText("Chrome")[0];
  await element.click();
  await waitForMs(1000);
  await emulator.screenshot("chrome.jpg");
})();
