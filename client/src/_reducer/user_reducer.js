import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_action/types";

export default function foo (state = {}, action) {
  // 다른 타입이 올때마다 다른 조치를 취하기 위해 스위치 사용
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;

    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
      
    default:
      return state;
  }
}
