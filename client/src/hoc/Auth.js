import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../user_actions/user_actions";

function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(authUser())
        .then((res) => {
          // 로그인x
          if (!res.payload.isAuth) {
            if (option) {
              navigate("/");
            }
          } else {
            // 로그인
            if (adminRoute && !res.payload.isAdmin) {
              navigate("/");
            } else {
              if (!option) {
                navigate("/");
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    return <SpecificComponent />;
  }
  return <AuthenticationCheck />;
}

export default Auth;
