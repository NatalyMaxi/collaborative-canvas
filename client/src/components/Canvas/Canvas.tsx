import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Brush } from "@tools";

import canvasState from 'src/store/canvasState';
import toolState from "src/store/toolState";

import styles from './Canvas.module.scss';

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasState.setCanvas(canvasRef.current);
      toolState.setTool(new Brush(canvasRef.current))
    }
  }, []);

  return (
    <div className={styles.canvas}>
      <canvas ref={canvasRef} width={900} height={600}></canvas>
    </div>
  );
};

export const Canvas = observer(CanvasComponent);