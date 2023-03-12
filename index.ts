import { Emulator } from "./src/Emulator";

(async () => {
  const emulator = await Emulator.connectToEmulator(5555);
  await emulator.waitTillBoot();

  const hierarchy = await emulator.hierarchy();
  const element = hierarchy.findElementsByText("Chrome")[0];
  element.click();
})();
