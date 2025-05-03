import { ChangeEvent } from "react";

import { DrawingToolButton, DecorContainer, Input } from "@components";
import { Brush, Rect, Circle, Eraser, Line } from "@tools";

import canvasState from "src/store/canvasState";
import toolState from "src/store/toolState";

import styles from "./Toolbar.module.scss";

export const Toolbar = () => {
  const DrawingTools = [
    {
      type: "button",
      drawingMode: "brush",
      onClick: () => {
        if (canvasState.canvas && canvasState.sessionid && canvasState.socket) {
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        } else {
          console.warn(
            "Canvas is not initialized yet.  Cannot set brush tool."
          );
        }
      },
    },
    {
      type: "button",
      drawingMode: "rect",
      onClick: () => {
        if (canvasState.canvas && canvasState.sessionid && canvasState.socket) { 
          toolState.setTool(
            new Rect(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        } else {
          console.warn("Canvas is not initialized yet.  Cannot set rect tool.");
        }
      },
    },
    {
      type: "button",
      drawingMode: "circle",
      onClick: () => {
        if (canvasState.canvas && canvasState.sessionid && canvasState.socket) {
          toolState.setTool(
            new Circle(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        } else {
          console.warn(
            "Canvas is not initialized yet.  Cannot set circle tool."
          );
        }
      },
    },
    {
      type: "button",
      drawingMode: "eraser",
      onClick: () => {
        console.log('нажала на ластик');
        if (canvasState.canvas && canvasState.sessionid && canvasState.socket) {
          toolState.setTool(
            new Eraser(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        } else {
          console.warn(
            "Canvas is not initialized yet.  Cannot set eraser tool."
          );
        }
      },
    },
    {
      type: "button",
      drawingMode: "line",
      onClick: () => {
        if (canvasState.canvas && canvasState.sessionid && canvasState.socket) {
          toolState.setTool(
            new Line(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        } else {
          console.warn("Canvas is not initialized yet.  Cannot set line tool.");
        }
      },
    },
    {
      type: "input",
    },
    {
      type: "button",
      drawingMode: "undo",
      onClick: () => canvasState.undo(),
    },
    {
      type: "button",
      drawingMode: "redo",
      onClick: () => canvasState.redo(),
    },
    {
      type: "button",
      drawingMode: "save",
      onClick: () => download(),
    },
  ];

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    toolState.setStrokeColor(e.target.value);
    toolState.setFillColor(e.target.value);
  };

  const download = () => {
    if (!canvasState.canvas) {
      console.warn(
        "Canvas не инициализирован. Невозможно скачать изображение."
      );
      return;
    }

    if (!canvasState.sessionid) {
      console.warn(
        "ID сессии не инициализирован. Невозможно скачать изображение."
      );
      return;
    }

    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = canvasState.sessionid + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={styles.toolbar}>
      <DecorContainer>
        {DrawingTools.map((item, index) => {
          if (item.type === "button") {
            return (
              <DrawingToolButton
                type={item.type}
                key={index}
                drawingMode={item.drawingMode ?? ""}
                onClick={item.onClick}
              />
            );
          } else if (item.type === "input") {
            return (
              <Input
                key={index}
                className={styles.input}
                onChange={e => changeColor(e)}
                inputId="fill-color"
                inputType="color"
              />
            );
          }
          return null;
        })}
      </DecorContainer>
    </div>
  );
};