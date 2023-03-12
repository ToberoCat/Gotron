# Gotron

This tool is still under development.

## ToDo
- [ ] Better documented API

## About
> Gotron is a javascript automation tool for android devices. It allows you to interact with any android device allowing
> you to simulate button presses, screenshots, app management, etc.

## Installation
Requirements:
- [adb](https://developer.android.com/studio/releases/platform-tools#downloads) cli tool
- The android emulator cli tool when you want to create emulators with gotron

## Usage
A simple example of gotron being used to open Google Chrome and save a screenshot on an already started emulator.
````typescript
import {Emulator} from "gotron/lib/device/Emulator";
import {waitForMs} from "gotron/lib/utils/DeviceTools";

(async () => {
  const emulator = await Emulator.connectToEmulator(5555); // Connect to the emulator
  await emulator.waitTillBoot(); // Make sure the device is ready to be navigated

  const hierarchy = await emulator.hierarchy(); // Access the current android activity layout
  const element = hierarchy.findElementsByText("Chrome")[0]; // Search for an element with the text chrome in it
  await element.click(); // Click the element
  await waitForMs(1000); // Wait 1 second to make sure the activity navigated
  await emulator.screenshot("chrome.jpg"); // Take a screenshot named chrome.jpg. The file will be created in the working directory
})();
````

Other examples can be found [here](examples)

