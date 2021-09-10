import axios from "axios";
import {
    LOGIN_USER
} from './types'

export function loginUser(dataToSubmit) {
  // 여기서 서버에다 데이터를 날려서 받은 응답데이터를 request로 저장
  const request = axios.post("/api/users/login", dataToSubmit)
  .then(res => res.data)
  return {
    //   리턴으로 리듀서로 보냄
    type: LOGIN_USER,
    payload: request,
  }
}

export function resisterUser(dataToSubmit) {
  // 여기서 서버에다 데이터를 날려서 받은 응답데이터를 request로 저장
  const request = axios
    .post("/api/users/resister", dataToSubmit)
    .then((res) => res.data);
  return {
    //   리턴으로 리듀서로 보냄
    type: LOGIN_USER,
    payload: request,
  };
}
