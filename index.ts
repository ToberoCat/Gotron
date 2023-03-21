import { Emulator } from "./lib/device/Emulator";
import { DefaultApps } from "./lib/app/DefaultApps";
import { waitForMs } from "./lib/utils/DeviceTools";
import { WifiDevice } from "./src/device/WifiDevice";
import { Device } from "./src/device/Device";


(async () => {
  const emulator = await WifiDevice.connectDevice("10.0.0.3", 5555); //await WifiDevice.usbDeviceToWifi((await Device.getDevices())[0], 5555);
  console.log(emulator.ip, emulator.port);
  await emulator.screenshot("screenshot.png");
  await emulator.disconnect();
})();