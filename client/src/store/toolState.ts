import { makeAutoObservable } from "mobx";
import { Tool } from "src/tools/Tool";

export class ToolState {
  tool: Tool | null = null;
  fillColor: string = "black";
  strokeColor: string = "black";
  lineWidth: number = 1; // Добавляем свойство lineWidth

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool | null) {
    this.tool = tool;
  }

  setFillColor(color: string) {
    this.fillColor = color;
    if (this.tool) {
      this.tool.fillColor = color;
    }
  }

  setStrokeColor(color: string) {
    this.strokeColor = color;
    if (this.tool) {
      this.tool.strokeColor = color;
    }
  }

  setLineWidth(width: number) {
    this.lineWidth = width;
    if (this.tool) {
      this.tool.lineWidth = width;
    }
  }
}

const toolState = new ToolState();

export default toolState;
