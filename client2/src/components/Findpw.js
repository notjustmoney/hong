import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";
import styled from "styled-components";
import apis from "../api";

const Wrap = styled.div`
  clear: both;
  width: 450px;
  margin: 0 auto;
  padding: 70px 0;
`;

const InputA = styled(Input)`
  padding-bottom: 19px;
`;
const Header = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 19px;
`;
const Errormsg = styled.div`
  color: red;
  margin-bottom: 19px;
  text-align: center;
`;

const Findpw = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [inputstate, setInputstate] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [buttonstate, setButtonstate] = useState({ loading: "", disabled: "" });

  const HandleChange = (e) => {
    let id = e.target.id;
    if (id === "email") {
      setEmail(e.target.value);
    } else if (id === "password") {
      setPassword(e.target.value);
    } else if (id === "passwordchk") {
      setPasswordChk(e.target.value);
    } else {
      console.log("ERROR");
    }
  };
  const HandleSubmit = async () => {
    setInputstate("");
    setButtonstate({ loading: "loading", disabled: "disabled" });
    setError("");
    if (email === "") {
      setError("이메일을 입력해주세요.");
      setInputstate("error");
      setButtonstate({ loading: "", disabled: "" });
      return;
    }

    if (token === "") {
      const data = {
        email: email,
      };
      try {
        const resp = await apis.forgot(data);
        setToken(resp.data.resetPasswordToken);
        setInputstate("disabled");
      } catch (e) {
        setError("존재하는 이메일이 없습니다.");
        setInputstate("error");
      }
    } else {
      if (password !== passwordChk) {
        setError("비밀번호가 일치하지 않습니다.");
        setPasswordError("error");
        setButtonstate({ loading: "", disabled: "" });
        return;
      } else if (password.length < 8) {
        setError("비밀번호는 8글자 이상으로 작성되어야 합니다.");
        setPasswordError("error");
        setButtonstate({ loading: "", disabled: "" });
        return;
      }

      const data = {
        password: password,
      };
      try {
        const resp = await apis.reset(token, data);
        alert("비밀번호가 변경됐습니다.");
        window.location.href = "http://www.hongsick.com/#/main";
      } catch (e) {
        const mess = e.response.data.message;
        if (mess && mess.includes("letter ")) {
          setError("비밀번호는 최소 한 개의 숫자와 영문이 포함되어야 합니다.");
          setPasswordError("error");
          setButtonstate({ loading: "", disabled: "" });
          return;
        }

        setError("서버 에러 발생! 관리자에게 문의해주세요.");
      }
    }
    setButtonstate({ loading: "", disabled: "" });
  };
  return (
    <Wrap>
      <Header>홍대병 비밀번호 찾기</Header>

      <InputA
        className={inputstate}
        placeholder="이메일을 입력해주세요."
        fluid
        id="email"
        value={email}
        onChange={HandleChange}
      ></InputA>
      {token ? (
        <>
          <Header>홍대병 비밀번호 변경</Header>
          <InputA
            type="password"
            password
            className={passwordError}
            placeholder="변경할 비밀번호 (8자리 이상, 영문 및 숫자 한 개 이상 포함)"
            fluid
            id="password"
            value={password}
            onChange={HandleChange}
          ></InputA>
          <InputA
            type="password"
            password
            className={passwordError}
            placeholder="변경할 비밀번호 확인"
            fluid
            id="passwordchk"
            value={passwordChk}
            onChange={HandleChange}
          ></InputA>
        </>
      ) : (
        <></>
      )}
      {error && <Errormsg>{error}</Errormsg>}
      <Button
        className={[buttonstate.loading, buttonstate.disabled]}
        color="orange"
        fluid
        onClick={HandleSubmit}
      >
        {token ? <>홍대병 비밀번호 변경</> : <>홍대병 이메일 인증</>}
      </Button>
    </Wrap>
  );
};

export default Findpw;
