import React from "react";

import { Button, DecorContainer, Input } from "@components";
import { Brush, Rect, Circle, Eraser, Line } from "@tools";

import canvasState from "src/store/canvasState";
import toolState from "src/store/toolState";

import styles from "./Toolbar.module.scss";

export const Toolbar = () => {
  const DrawingTools = [
    {
      type: "button",
      drawingMode: "brush",
      // onClick: () => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid)),
      onClick: () => {
        if (canvasState.canvas) {
          toolState.setTool(new Brush(canvasState.canvas));
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
      // onClick: () => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid)),
      onClick: () => {
        if (canvasState.canvas) {
          toolState.setTool(new Rect(canvasState.canvas));
        } else {
          console.warn("Canvas is not initialized yet.  Cannot set rect tool.");
        }
      },
    },
    {
      type: "button",
      drawingMode: "circle",
      // onClick: () => toolState.setTool(new Circle(canvasState.canvas)),
      onClick: () => {
        if (canvasState.canvas) {
          toolState.setTool(new Circle(canvasState.canvas));
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
      // onClick: () => toolState.setTool(new Eraser(canvasState.canvas)),
      onClick: () => {
        if (canvasState.canvas) {
          toolState.setTool(new Eraser(canvasState.canvas));
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
      // onClick: () => toolState.setTool(new Line(canvasState.canvas)),
      onClick: () => {
        if (canvasState.canvas) {
          toolState.setTool(new Line(canvasState.canvas));
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
      // onClick: () => canvasState.undo(),
    },
    {
      type: "button",
      drawingMode: "redo",
      // onClick: () => canvasState.redo(),
    },
    {
      type: "button",
      drawingMode: "save",
      // onClick: () => download(),
    },
  ];

  const plug = () => {
    console.log("object");
  };
  return (
    <div className={styles.toolbar}>
      <DecorContainer>
        {DrawingTools.map((item, index) => {
          if (item.type === "button") {
            return (
              <Button
                key={index}
                drawingMode={item.drawingMode ?? ""}
                onClick={item.onClick ?? plug}
              />
            );
          } else if (item.type === "input") {
            return (
              <Input
                className={styles.input}
                onChange={e => {
                  toolState.setStrokeColor(e.target.value);
                  toolState.setFillColor(e.target.value);
                }}
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
