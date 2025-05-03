import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  socket: WebSocket | null = null;
  sessionid: string | null = null;
  undoList: string[] = [];
  redoList: string[] = [];
  username: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSessionId(id: string | undefined) {
    this.sessionid = id ?? null;
  }

  setSocket(socket: WebSocket | null) {
    this.socket = socket;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  pushToUndo(data: string) {
    this.undoList.push(data);
  }

  pushToRedo(data: string) {
    this.redoList.push(data);
  }

  undo() {
    if (!this.canvas) return;
    let ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop() as string;
      this.redoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        ctx!.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
      };
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    if (!this.canvas) return;
    let ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop() as string;
      this.undoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        ctx!.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
      };
    }
  }
}

const canvasState = new CanvasState();

export default canvasState;
