import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_action/user_action";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  // option
  // null ==> 아무나 출입이 가능한 페이지
  // true ==> 로그인한 유저만 출입이 가능한 페이지
  // false ==> 로그인한 유저는 출입 불가능

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res);

        // 로그인 하지 않은 상태
        if (!res.payload.isAuth) {
          if (option) {
            // 로그인 하지 않은 상태인데
            // 로그인한 사람만 들어가는 페이지 들어가려 할때
            props.history.push("/login");
          }
        } else {
          // 로그인한 상태

          if (adminRoute && !res.payload.isAdmin) {
            //     관리자가 아닌데 관리자페이지로 들어가려할때
            props.history.push("/");
          } else {
            if (!option) {
              //  로그인한 유저가 로그인 안한 유저 페이지에 들어가려할때
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
