import React, { createContext, useState, useEffect } from "react";
import { client } from "./utilities/client";
import Login from "./pages/Login";
import Trello from "./pages/Trello";
import { notify } from "./utilities/notify";
import { ToastContainer } from "react-toastify";

export const RootContext = createContext();

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

export default function App() {
  const [successLogin, setSuccessLogin] = useState(false);

  const notifyStatus = async (status) => {
    if (status) {
      notify("success", "Đăng nhập thành công!");
      return;
    }

    if (localStorage.getItem("apiKey")) {
      client.setApiKey(JSON.parse(localStorage.getItem("apiKey")));
      const { response } = await client.get("/tasks");

      if (response.ok) {
        setSuccessLogin(true);
      } else {
        notify("error", "Vui lòng đăng nhập lại");
        localStorage.removeItem("apiKey");
        setSuccessLogin(false);
      }
    }
  };

  useEffect(() => {
    notifyStatus(successLogin);
  }, [successLogin]);

  const dataContext = {
    changeSuccessLogin: setSuccessLogin,
  };

  return (
    <RootContext.Provider value={dataContext}>
      <div className="app">
        {!successLogin && <Login />}
        {successLogin && <Trello />}
      </div>
      <ToastContainer />
    </RootContext.Provider>
  );
}
