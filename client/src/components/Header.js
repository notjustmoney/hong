import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../images/Logo.png";
import "./header.css";
import { Modal, Button } from "semantic-ui-react";

const Container = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  font-family: "Song Myung", serif;
`;

const Logo = styled.div`
  width: 240px;
  height: 150px;
  background: url(${(props) => props.path});
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
`;

const Menu = styled.div`
  height: 35px;
  font-size: 20px;
  padding: 7px 10px 10px 10px;
  &:nth-child(1) {
    margin-right: 100px;
  }
  &:hover {
    border-bottom: 3px solid #fdcb6e;
  }
  transition: all 0.1s linear;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    margin-right: 10px;
  }
  i {
    padding-right: 10px;
  }
`;

const Input = styled.input`
  font-family: "Song Myung", serif;
  padding: 10px;
  border-width: 3px;
  border-style: solid;
  border-image: linear-gradient(to right, #ffeaa7 0%, #fdcb6e 100%);
  border-image-slice: 1;
  border-radius: 7px;
  border-radius: 10px;
  width: 450px;
  &:focus {
    outline: none;
  }
  transition: all 0.2s linear;
  &:nth-child(1) {
    margin-bottom: 20px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default withRouter(({ location: { pathname } }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };
  const handlePwChange = (event) => {
    setPw(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(id, pw);
    /*const res = await axios.post("")
    console.log(res);*/
  };
  return (
    <>
      <Container>
        <Logo path={LogoImage} />
        <Content>
          <MenuContainer>
            <Menu>메뉴 1</Menu>
            <Menu>메뉴 2</Menu>
          </MenuContainer>
          <InputContainer>
            <div>
              <input
                className="inputBox"
                type="text"
                placeholder="검색어를 입력하세용"
              />
              <div className="inputBar"></div>
            </div>
          </InputContainer>
          <MenuContainer>
            <Menu>QnA</Menu>
            <Menu onClick={() => setOpen(true)}>User</Menu>
          </MenuContainer>
        </Content>
      </Container>
      <Modal
        size="tiny"
        dimmer="blurring"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Modal.Header>로그인</Modal.Header>
        <Modal.Content>
          <FormContainer>
            <Input type="text" placeholder="ID" onChange={handleIdChange} />
            <Input
              type="password"
              placeholder="Password"
              onChange={handlePwChange}
            />
          </FormContainer>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            No
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
            onClick={handleSubmit}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
});
