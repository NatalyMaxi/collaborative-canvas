import { Tool } from "./Tool";

export class Rect extends Tool {
  mouseDown: boolean;
  startX: number;
  startY: number;
  // width: number;
  // height: number;
  saved: string;

  // constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
  //   super(canvas, socket, id);
  //   this.mouseDown = false;
  //   this.startX = 0;
  //   this.startY = 0;
  //   this.width = 0;
  //   this.height = 0;
  //   this.saved = "";
  //   this.listen();
  // }
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.mouseDown = false;
    this.startX = 0;
    this.startY = 0;
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
    this.ctx.beginPath();
    this.startX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft;
    this.startY = e.pageY - (e.target as HTMLCanvasElement).offsetTop;
    this.saved = this.canvas.toDataURL();
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.mouseDown) {
      let currentX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft;
      let currentY = e.pageY - (e.target as HTMLCanvasElement).offsetTop;
      let width = currentX - this.startX;
      let height = currentY - this.startY;
      this.draw(this.startX, this.startY, width, height);
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

  // draw(x: number, y: number, w: number, h: number) {
  //   const img = new Image();
  //   img.src = this.saved;
  //   img.onload = () => {
  //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //     this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  //     this.ctx.beginPath();
  //     this.ctx.rect(x, y, w, h);
  //     this.ctx.fill();
  //     this.ctx.stroke();
  //   };
  // }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  // static staticDraw(
  //   ctx: CanvasRenderingContext2D,
  //   x: number,
  //   y: number,
  //   w: number,
  //   h: number,
  //   color: string
  // ) {
  //   ctx.fillStyle = color;
  //   ctx.beginPath();
  //   ctx.rect(x, y, w, h);
  //   ctx.fill();
  //   ctx.stroke();
  // }
}
