import React, { useState } from "react";
import "../LoginPage/LoginPage.css";
import { useDispatch } from "react-redux";
import { resisterUser } from "../../../_action/user_action";

const ResisterPage = (props) => {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 다릅니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(resisterUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
    //  _action 의 useraction으로 데이터를 보냄

    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    // console.log(e);
    if (e.target.type === "email") {
      setEmail(value);
    } else if (e.target.type === "text") {
      setName(value);
    } else {
      setPassword(value);
    }
  };

  const onConfirmChange = (e) => {
    const {
      target: { value },
    } = e;
    setConfirmPassword(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onChange} />
        <label>name</label>
        <input type="text" value={Name} onChange={onChange} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onChange} />
        <label>confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmChange}
        />

        <br />
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default ResisterPage;
