import * as child_process from "child_process";
import { Device } from "./Device";


export interface ExecResult {
  stdout: string,
  stderr: string
}

export function exec(command: string): Promise<ExecResult> {
  return new Promise((res, rej) => {
    child_process.exec(command, (error, stdout, stderr) => {
      if (error) return rej(error);
      res({ stdout, stderr });
    });
  });
}

export function waitForMs(ms: number): Promise<void> {
  return new Promise(res => setTimeout(res, ms));
}

export function waitForCondition(condition: () => Promise<boolean>,
                                 timeout: number = 200): Promise<void> {
  return new Promise(res => {
    const id = setInterval(async () => {
      if (!(await condition()))
        return;

      clearInterval(id);
      res();
    }, timeout);
  });
}

export function waitForXPath(device: Device, expression: string, timeout: number = 1000): Promise<void> {
  return waitForCondition(async () => (await device.hierarchy())
    .selectXPath(expression).length >= 1, timeout);
}

export function waitForId(device: Device, id: string, timeout: number = 1000): Promise<void> {
  return waitForCondition(async () => (await device.hierarchy())
    .findElementsById(id).length >= 1, timeout);
}

export function waitForText(device: Device, text: string, timeout: number = 1000): Promise<void> {
  return waitForCondition(async () => (await device.hierarchy())
    .findElementsByText(text).length >= 1, timeout);
}

export function waitForClass(device: Device, className: string, timeout: number = 1000): Promise<void> {
  return waitForCondition(async () => (await device.hierarchy())
    .findElementsByClass(className).length >= 1, timeout);
}