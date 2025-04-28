import { DecorContainer, Input } from "@components";

import toolState from "src/store/toolState";

import styles from "./SettingBar.module.scss";

export const SettingBar = () => {
  return (
    <div className={styles.settingBar}>
      <DecorContainer className={styles.decorContainer}>
        <Input
          onChange={e => toolState.setLineWidth(+e.target.value)}
          inputId="line-width"
          inputType="number"
          defaultValue={1}
          min={1}
          max={50}
          label='Толщина линии'
        />
        <Input
          onChange={e => toolState.setStrokeColor(e.target.value)}
          inputId="stroke-color"
          inputType="color"
          label='Цвет обводки'
        />
      </DecorContainer>
    </div>
  );
};
