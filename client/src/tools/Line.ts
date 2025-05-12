import canvasState from "src/store/canvasState";
import { Tool } from "./Tool";
import toolState from "src/store/toolState";

export class Line extends Tool {
  mouseDown: boolean;
  startX: number;
  startY: number;
  x: number;
  y: number;
  saved: string;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.mouseDown = false;
    this.startX = 0;
    this.startY = 0;
    this.x = 0;
    this.y = 0;
    this.saved = "";
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
          type: "line",
          x: this.x,
          y: this.y,
          startX: this.startX,
          startY: this.startY,
          color: this.ctx.strokeStyle,
          lineWidth: toolState.lineWidth,
        },
      })
    );
  };

  mouseDownHandler = (e: MouseEvent) => {
    this.mouseDown = true;
    canvasState.pushToUndo(this.canvas.toDataURL());
    this.startX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft;
    this.startY = e.pageY - (e.target as HTMLCanvasElement).offsetTop;
    this.saved = this.canvas.toDataURL();
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.mouseDown) {
      this.x = e.pageX - (e.target as HTMLCanvasElement).offsetLeft;
      this.y = e.pageY - (e.target as HTMLCanvasElement).offsetTop;
      this.draw(this.startX, this.startY, this.x, this.y);
    }
  };

  draw(startX: number, startY: number, x: number, y: number) {
    const img = new Image();
    img.src = this.saved;

    img.onload = async () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.ctx.fillStyle;
      this.ctx.lineWidth = toolState.lineWidth;
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }
}
