import { LOGIN_USER } from "../_action/types";

export default function (state={}, action) {
  // 다른 타입이 올때마다 다른 조치를 취하기 위해 스위치 사용
  switch (action.type) {
    case LOGIN_USER:
        return{...state, loginSuccess: action.payload}
      break;

    default:
      return state;
  }
}
