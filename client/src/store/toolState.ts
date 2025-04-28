import { makeAutoObservable } from "mobx";
import { Tool } from "src/tools/Tool";

class ToolState {
  tool: Tool | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool | null) {
    this.tool = tool;
  }

  setFillColor(color: string) {
    if (this.tool) {
      this.tool.fillColor = color;
    }
  }

  setStrokeColor(color: string) {
    if (this.tool) {
      this.tool.strokeColor = color;
    }
  }

  setLineWidth(width: number) {
    if (this.tool) {
      this.tool.lineWidth = width;
    }
  }
}

const toolState = new ToolState();

export default toolState;
