import { Tool } from "./Tool";

export class Brush extends Tool {
  mouseDown: boolean;

  // constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
  //   super(canvas, socket, id);
  //   this.mouseDown = false;
  //   this.listen();
  // }

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
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
    // this.socket.send(
    //   JSON.stringify({
    //     method: "draw",
    //     id: this.id,
    //     figure: {
    //       type: "finish",
    //     },
    //   })
    // );
  };

  mouseDownHandler = (e: MouseEvent) => {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
      e.pageY - (e.target as HTMLCanvasElement).offsetTop
    );
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.mouseDown) {
      this.draw(
        e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
        e.pageY - (e.target as HTMLCanvasElement).offsetTop
      );
      // this.socket.send(
      //   JSON.stringify({
      //     method: "draw",
      //     id: this.id,
      //     figure: {
      //       type: "brush",
      //       x: e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
      //       y: e.pageY - (e.target as HTMLCanvasElement).offsetTop,
      //     },
      //   })
      // );
    }
  };

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  // static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
  //   ctx.lineTo(x, y);
  //   ctx.stroke();
  // }
}
