import { useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Toolbar, Canvas, SettingBar, Modal, Input, Button } from "@components";

import styles from "./App.module.scss";

function App() {
  const [showModal, setShowModal] = useState(true);
  const usernameRef = useRef<HTMLInputElement>(null);

  const connectHandler = () => {
    console.log(usernameRef.current?.value);
    setShowModal(false);
  };
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Введите ваше имя"
      >
        <Input
          inputId="username"
          type="text"
          ref={usernameRef}
        />
        <Button
          className={styles.button}
          buttonText="Войти"
          onClick={connectHandler}
        />
      </Modal>
    </div>
  );
}

export default App;
