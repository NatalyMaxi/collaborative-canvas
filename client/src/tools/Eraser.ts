import { Brush } from "./Brush";

export class Eraser extends Brush {
  
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.listen();
  }

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.mouseDown && this.ctx) {
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "eraser",
            x: e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
            y: e.pageY - (e.target as HTMLCanvasElement).offsetTop,
          },
        })
      );
    }
  };

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.strokeStyle = "white";
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
