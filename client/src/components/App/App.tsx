import styles from './App.module.scss';
import { Toolbar, Canvas, SettingBar } from "@components";

function App() {
  return (
    <div className={styles.App}>
      <SettingBar />
      <Toolbar />
      <Canvas />
    </div>
  );
}

export default App;
