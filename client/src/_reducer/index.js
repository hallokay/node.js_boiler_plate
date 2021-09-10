import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer = combineReducers({
    // 아래 적힐 리듀서들을 컴바인 리듀서로 합쳐줌
    user,

});
export default rootReducer;