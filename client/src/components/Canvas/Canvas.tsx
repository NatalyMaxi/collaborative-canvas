import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";

import { Modal, Input, Button } from "@components";
import { Brush, Circle, Eraser, Rect } from "@tools";

import canvasState from "src/store/canvasState";
import toolState from "src/store/toolState";

import styles from "./Canvas.module.scss";
import { useParams } from "react-router-dom";

interface IParams {
  id?: string;
  [key: string]: string | undefined;
}

interface IDrawMessage {
  method: "draw";
  figure: {
    type: "brush" | "rect" | "eraser" | "finish" | "circle" | "line";
    x?: number;
    y?: number;
    r?: number;
    width?: number;
    height?: number;
    color?: string;
    strokeColor?: string;
    lineWidth?: number;
    startX?: number;
    startY?: number;
  };
}

const CanvasComponent = () => {
  const [showModal, setShowModal] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const params = useParams<IParams>();
  const { id } = params;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvasState.setCanvas(canvas);
    } else {
      console.warn("Canvas элемент не инициализирован.");
    }
  }, [id]);

  const mouseUpHandler = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvasState.pushToUndo(canvas.toDataURL());
      axios
        .post(`http://localhost:5000/image?id=${params.id}`, {
          img: canvas.toDataURL(),
        })
        .then(response => console.log(response.data))
        .catch(error =>
          console.error("Ошибка при отправке изображения:", error)
        );
    } else {
      console.warn("Canvas не инициализирован. Невозможно выполнить действие.");
    }
  };

  const connectHandler = () => {
    if (usernameRef?.current?.value) {
      canvasState.setUsername(usernameRef?.current?.value);
      setShowModal(false);
    }
  };

const drawHandler = (msg: IDrawMessage) => {
  const figure = msg.figure;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  if (ctx && canvas) {
    switch (figure.type) {
      case "brush":
        Brush.draw(
          ctx,
          figure.x || 0,
          figure.y || 0,
          figure.color || "black",
          figure.lineWidth || 1
        );
        break;
      case "rect":
        Rect.staticDraw(
          ctx,
          figure.x || 0,
          figure.y || 0,
          figure.width || 0,
          figure.height || 0,
          figure.color || "black",
          figure.strokeColor || "black",
          figure.lineWidth || 1
        );
        break;
      case "circle":
        Circle.staticDraw(
          ctx,
          figure.x || 0,
          figure.y || 0,
          figure.r || 0,
          figure.color || "black",
          figure.strokeColor || "black",
          figure.lineWidth || 1
        );
        break;
      case "eraser":
        Eraser.draw(ctx, figure.x || 0, figure.y || 0);
        break;
      case "line":
        ctx.strokeStyle = figure.color || "black";
        ctx.lineWidth = figure.lineWidth || 1;
        ctx.beginPath();
        ctx.moveTo(figure.startX || 0, figure.startY || 0);
        ctx.lineTo(figure.x || 0, figure.y || 0);
        ctx.stroke();
        break;
      case "finish":
        ctx.beginPath();
        break;
      default:
        console.warn("Неизвестный тип фигуры:", figure.type);
    }
  }
};

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(`ws://localhost:5000/`);
      canvasState.setSocket(socket);

      if (id) {
        canvasState.setSessionId(id);
        if (canvasRef.current) {
          toolState.setTool(new Brush(canvasRef.current, socket, id));
        } else {
          console.warn("Ошибка: canvasRef.current равно null.");
        }
      } else {
        console.warn("Ошибка: Параметр ID отсутствует.");
      }

      socket.onopen = () => {
        console.log("Подключение установлено");
        socket.send(
          JSON.stringify({
            id: id,
            username: canvasState.username,
            method: "connection",
          })
        );
      };

      socket.onmessage = event => {
        try {
          const msg = JSON.parse(event.data);
          switch (msg.method) {
            case "connection":
              console.log(`пользователь ${msg.username} присоединился`);
              break;
            case "draw":
              drawHandler(msg);
              break;
            default:
              console.warn(
                "Предупреждение: Неизвестный тип сообщения:",
                msg.method
              );
          }
        } catch (e) {
          console.error("Ошибка при разборе сообщения:", e);
        }
      };

      socket.onclose = () => {
        console.log("Подключение закрыто");
      };

      socket.onerror = error => {
        console.error("Ошибка WebSocket:", error);
      };

      return () => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
        canvasState.setSocket(null);
      };
    }
  }, [id, drawHandler]);

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Введите ваше имя"
      >
        <Input
          inputId="username"
          type="text"
          ref={usernameRef}
          autoComplete="name"
        />
        <Button
          className={styles.button}
          buttonText="Войти"
          onClick={connectHandler}
        />
      </Modal>

      <div className={styles.canvas}>
        <canvas
          ref={canvasRef}
          onMouseUp={() => mouseUpHandler()}
          width={900}
          height={600}
        ></canvas>
      </div>
    </>
  );
};

export const Canvas = observer(CanvasComponent);
