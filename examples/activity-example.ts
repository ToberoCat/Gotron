import { Emulator } from "../src/device/Emulator";
import { DefaultApps } from "../src/app/DefaultApps";

(async () => {
  const emulator = await Emulator.connectToEmulator(5555);
  await emulator.waitTillBoot();

  await emulator.apps.killApp(DefaultApps.CHROME);
  await emulator.apps.startActivity({
    appPackage: DefaultApps.CHROME,
    activityPackage: "org.chromium.chrome.browser.ChromeTabbedActivity"
  });

  console.log(await emulator.apps.getActivities(DefaultApps.CHROME));
  console.log(await emulator.apps.openActivities());
})();