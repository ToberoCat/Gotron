import { DOMParser } from "xmldom";
import { select, SelectedValue } from "xpath";
import { Device } from "../Device";
import { DeviceActor } from "./Controller";
import { AppElement } from "../app/AppElement";
import * as fs from "fs";

const xmlFormatter = require("xml-formatter");

export class Hierarchy extends DeviceActor {
  private static readonly parser = new DOMParser();
  private readonly _document: Document;
  private readonly _xml: string;

  constructor(device: Device, xmlHierarchy: string) {
    super(device);
    this._xml = xmlHierarchy;
    this._document = Hierarchy.parser
      .parseFromString(xmlHierarchy, "text/xml");
  }

  public findElementsById(index: string): AppElement[] {
    return this.selectXPath(`//node[@index="${index}"]`)
      .map(x => new AppElement(this.device, x));
  }

  public findElementsByClass(className: string): AppElement[] {
    return this.selectXPath(`//node[@class="${className}"]`)
      .map(x => new AppElement(this.device, x));
  }

  public findElementsByText(text: string, includes: boolean = false): AppElement[] {
    return this.selectXPath(includes
      ? `//node[contains(@text,'${text}')]`
      : `//node[@text="${text}"]`)
      .map(x => new AppElement(this.device, x));
  }

  public findElementsByXPath(expression: string): AppElement[] {
    return this.selectXPath(expression)
      .map(x => new AppElement(this.device, x));
  }

  public writeHierarchyToFile(file: string) {
    fs.writeFileSync(file, xmlFormatter(this.xml));
  }

  public selectXPath(expression: string): SelectedValue[] {
    return select(expression, this._document);
  }

  get document(): Document {
    return this._document;
  }


  get xml(): string {
    return this._xml;
  }
}