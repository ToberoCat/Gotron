# Gotron

> Gotron is a Node.js library which provides a high level API to control an android device over the [android debug
> bridge.](https://developer.android.com/studio/releases/platform-tools#downloads) Gotron is able to use emulated
> devices and real devices

---

### What can I do?

Most things that ca be done with android can be automated with this tool. Here are a few examples:

- Take screenshots of from the device
- Navigate apps and scrape their data
- Write automated tests for your app

## Getting started

---

### Requirements

When you want to use this tool, you should
have [adb](https://developer.android.com/studio/releases/platform-tools#downloads) installed on your computer, as well
as
the emulator tool provided by android. These tools are command line tools. so make sure you add them to the path
environment variable when installing

### Installation

To use gotron in your project, run:

````bash
npm i gotron
# or `yarn add gotron`
# or `pnpm i gotron`
````

### Usage

Gotron follows the latest [maintenance LTS](https://github.com/nodejs/Release#release-schedule) version of Node.

### Example

The following example opens the Chrome browser and navigates to the npm package of gotron.

````typescript
import { Emulator } from ".gotron/lib/device/Emulator";
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
````

## API

---


## Resources

---

- [Examples](examples)
