import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Toolbar, Canvas, SettingBar } from "@components";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route
          path="/:id"
          element={
            <>
              <Toolbar />
              <SettingBar />
              <Canvas />
            </>
          }
        />
        <Route
          path="/"
          element={<Navigate to={`/${uuidv4()}`} />}
        />
      </Routes>
    </div>
  );
}

export default App;
