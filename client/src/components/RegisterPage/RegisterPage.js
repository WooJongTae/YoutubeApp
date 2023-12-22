import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../user_actions/user_actions";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEamilHandle = (e) => {
    setEmail(e.target.value);
  };
  const onNameHandle = (e) => {
    setName(e.target.value);
  };

  const onPasswordHandle = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordHandle = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    dispatch(registerUser(body)).then((response) => {
      console.log(response.payload.success);
      if (response.payload.success) {
        alert("회원가입이 완료되었습니다.");

        navigate("/");
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="eamil" value={Email} onChange={onEamilHandle} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandle} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandle} />

        <label>확인Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandle}
        />
        <br />
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
