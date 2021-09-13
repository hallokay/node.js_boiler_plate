import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
// 이걸써줘야 history를 쓸수 있엉

const LandinPage = (props) => {
  useEffect(() => {
    axios.get("/api/hello").then((res) => {
      console.log(res.data);
    });
  }, []);

  const onClickLogout = () => {
axios.get('api/users/logout')
.then(res => {
  if(res.data.success){
    props.history.push('/login')
  } else {

  }
})
  }

  return <div>
<h1>시작페이지</h1>
<button onClick={onClickLogout}>로그아웃</button>
  </div>;
};

export default withRouter(LandinPage);
