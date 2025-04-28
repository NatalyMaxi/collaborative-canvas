import styles from './App.module.scss';
import { Toolbar, Canvas, SettingBar } from "@components";

function App() {
  return (
    <div className={styles.app}>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  );
}

export default App;
