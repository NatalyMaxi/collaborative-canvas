import { Tool } from "./Tool";

export class Line extends Tool {
  mouseDown: boolean;
  name: string;
  saved: string;
  currentX: number;
  currentY: number;

  // constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
  //   super(canvas, socket, id);
  //   this.mouseDown = false;
  //   this.listen();
  // }

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.mouseDown = false;
    this.name = "Line";
    this.currentX = 0;
    this.currentY = 0;
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
    this.currentX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft;
    this.currentY = e.pageY - (e.target as HTMLCanvasElement).offsetTop;
    this.ctx.beginPath();
    this.ctx.moveTo(this.currentX, this.currentY);
    this.saved = this.canvas.toDataURL();
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
    const img = new Image();
    img.src = this.saved;

    img.onload = async () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.currentX, this.currentY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }

  // static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
  //   ctx.lineTo(x, y);
  //   ctx.stroke();
  // }
}
