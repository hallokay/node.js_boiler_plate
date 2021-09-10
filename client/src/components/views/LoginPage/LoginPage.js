import React, { useState } from "react";
import "./LoginPage.css";
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_action/user_action'

const LoginPage = ( props ) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
        Email,
        Password
    }

    dispatch(loginUser(body))
    .then(res => {
        if(res.payload.loginSuccess){
            props.history.push('/')
        } else {
            alert('Error');
        }
    })
//  _action 의 useraction으로 데이터를 보냄

    setEmail('');
    setPassword('');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    // console.log(e.target.type);
    if (e.target.type === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onChange} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onChange} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
