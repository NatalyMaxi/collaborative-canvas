import canvasState from "src/store/canvasState";
import { Tool } from "./Tool";

export class Brush extends Tool {
  mouseDown: boolean;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.mouseDown = false;
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler;
    this.canvas.onmousedown = this.mouseDownHandler;
    this.canvas.onmouseup = this.mouseUpHandler;
  }

  mouseUpHandler = (e: MouseEvent) => {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    );
  };

  mouseDownHandler = (e: MouseEvent) => {
    this.mouseDown = true;
    canvasState.pushToUndo(this.canvas.toDataURL());
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
      e.pageY - (e.target as HTMLCanvasElement).offsetTop
    );
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.mouseDown && this.ctx) {
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "brush",
            x: e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
            y: e.pageY - (e.target as HTMLCanvasElement).offsetTop,
            color: this.ctx.strokeStyle,
            lineWidth: this.ctx.lineWidth,
          },
        })
      );
    }
  };

  static draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    lineWidth: number
  ) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
