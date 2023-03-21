import { Emulator } from "gotron/lib/device/Emulator";
import { DefaultApps } from "gotron/lib/app/DefaultApps";
import { waitForMs } from "gotron/lib/utils/DeviceTools";


(async () => {
  const emulator = await Emulator.connectToEmulator(5555);

  await emulator.apps.startActivity({
    appPackage: DefaultApps.CHROME,
    activityPackage: "org.chromium.chrome.browser.ChromeTabbedActivity"
  });
  const hierarchy = await emulator.hierarchy();
  const searchField = hierarchy.findElementsByText("Search or type", true)[0];

  await searchField.type("https://www.npmjs.com/package/gotron");
  await emulator.inputs.enter();

  await waitForMs(5000); // Wait 5 seconds to give the device some time to load the website
  await emulator.inputs.click(594, 1590);

  await waitForMs(100);
  await emulator.screenshot("chrome.png");

  await emulator.apps.killApp(DefaultApps.CHROME);
})();