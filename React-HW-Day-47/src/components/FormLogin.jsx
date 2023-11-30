import React, { useState, useContext } from "react";
import { stripHTML } from "../utilities/method";
import { notify } from "../utilities/notify";
import { client } from "../utilities/client";
import { RootContext } from "../App";

export default function FormLogin() {
  const { changeSuccessLogin } = useContext(RootContext);
  const [valueInput, setValueInput] = useState("");

  const handleChangeInputEmail = (event) => {
    setValueInput(stripHTML(event.target.value));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (isValidEmail(valueInput)) {
      await handleApiRequest();
    } else {
      notify("error", "Email không hợp lệ!");
    }
  };

  const isValidEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handleApiRequest = async () => {
    const { response, data } = await client.get(`/api-key?email=${valueInput}`);

    if (response.ok) {
      handleSuccessfulLogin(data.data.apiKey);
    } else {
      notify("error", "Email không tồn tại!");
    }
  };

  const handleSuccessfulLogin = (apiKey) => {
    client.setApiKey(apiKey);
    localStorage.setItem("apiKey", JSON.stringify(apiKey));
    changeSuccessLogin(true);
  };

  return (
    <form className="form-login" onSubmit={handleSubmitForm}>
      <label htmlFor="input-login-email" className="label-login-email">
        Nhập email:
      </label>
      <input
        type="text"
        id="input-login-email"
        className="input-login-email"
        placeholder="Email..."
        value={valueInput}
        onChange={handleChangeInputEmail}
      />
    </form>
  );
}
