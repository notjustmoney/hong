import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import "./header.css";
import { Modal, Visibility, Icon } from "semantic-ui-react";
import LoginModal from "../components/LoginModal";
import allActions from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import UserDropdown from "./UserDropdown";
import apis from "../api";

const Fixedheader = styled.div`
  /*font-family: "Song Myung", serif;*/
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 100%;
  background-color: white;
  height: 60px;
  position: fixed;
  left: 0;
  top: ${(props) => (props.status ? "0" : "-70px")};
  z-index: 20;
  transition: all 0.25s;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  /*font-family: "Song Myung", serif;*/
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  z-index: 10;
`;

const SLink = styled(Link)`
  background: url(${(props) => props.path});
  background-size: cover;
  background-position: center;
  margin-bottom: 15px;
`;

const Logo = styled.div`
  width: 220px;
  height: 68px;
  background: url(${(props) => props.path});
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
`;

const Menu = styled.div`
  width: 70px;
  height: 35px;
  font-size: 16px;
  padding: 10px 0;
  &:nth-child(1) {
    margin-right: 100px;
  }
  &:hover {
    border-bottom: 3px solid #fdcb6e;
  }
  transition: all 0.2s linear;
  border-bottom: 3px solid
    ${(props) => (props.status ? "#fdcb6e" : "transparent")};
  font-weight: 700;
  text-align: center;
  cursor: pointer;
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
    padding-left: 10px;
    padding-right: 20px;
    opacity: 0.5;
    transition: all 0.35s;
  }
  border-bottom: 3px solid rgba(255, 234, 167, 0.7);
`;

const STLink = styled(Link)``;

const SVisibility = styled(Visibility)`
  width: 100%;
`;

const Iconlefst = styled(Icon)`
  padding-top: 13px;
  float: left;
`;

const Iconright = styled(Icon)`
  padding-top: 13px;
  float: right;
`;

const SearchInput = styled.input`
  ::-webkit-input-placeholder {
    color: #000;
    opacity: 0.5;
    -webkit-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
    text-align: center;
  }
  :hover::-webkit-input-placeholder {
    opacity: 0.75;
    -webkit-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :focus::-webkit-input-placeholder {
    text-align: center;
    opacity: 0;
    -webkit-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
`;

export default withRouter(({ location: { pathname } }) => {
  //const [open, setOpen] = useState(false);
  const open = useSelector((state) => state.isOpen);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [calculations, setCalcul] = useState({
    topPassed: false,
    bottomPassed: false,
    topVisible: false,
    bottomVisible: false,
  });
  const loginInfo = useSelector((state) => state.loginInfo);

  const handleIsUser = async () => {
    const userId = window.localStorage.getItem("id");
    const access = window.localStorage.getItem("access_token");
    if (userId !== null) {
      const {
        data: { user },
      } = await apis.authMe(userId, access);
      dispatch(allActions.loginActions.loginUserSuccess(user));
    }
  };

  useEffect(() => {
    handleIsUser();
  }, []);

  const handleUpdate = (e, { calculations }) => {
    setCalcul(calculations);
  };

  const handleValideToken = async () => {
    const userId = window.localStorage.getItem("id");
    const access = window.localStorage.getItem("access_token");
    if (userId === null || access === null) return;
    try {
      const resp = await apis.authMe(userId, access);
    } catch (e) {
      if (e.response.status === 401) {
        console.log("401");
        const currentRefresh = window.localStorage.getItem("refresh_token");

        //try {
        /*const resp = await axios.post(
          `http://www.hongsick.com/api/auth/refresh-tokens`,
          { refreshToken: currentRefresh }
        );*/
        const resp = await apis.refreshToken(currentRefresh);
        console.log("재요청");
        const access = resp.data.access.token;
        const refresh = resp.data.refresh.token;
        window.localStorage.setItem("access_token", access);
        window.localStorage.setItem("refresh_token", refresh);
        /*const response = await axios.get(
            `http://www.hongsick.com/api/auth/me/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );
        } catch (error) {
          window.localStorage.removeItem("access_token");
          window.localStorage.removeItem("refresh_token");
          window.localStorage.removeItem("id");
          dispatch(allActions.loginActions.logOutUser());
          alert("로그인 해주세요");
        }*/
      }
    }
  };
  useEffect(() => {
    handleValideToken();
  }, [pathname]);
  return (
    <>
      <SVisibility className="Vcontainer" onUpdate={handleUpdate}>
        <Container>
          <SLink to="/main">
            <Logo path={`images/logo.png`} />
          </SLink>
          <Content>
            <MenuContainer>
              <STLink to="/main">
                <Menu status={pathname === "/main"}>Main</Menu>
              </STLink>
              <Menu
                status={pathname.includes("search")}
                onClick={() => {
                  document.getElementById("MainInput").focus();
                }}
              >
                Search
              </Menu>
            </MenuContainer>
            <InputContainer>
              <div>
                <SearchInput
                  className="inputBox"
                  type="text"
                  placeholder="태그를 입력하세요."
                  id="MainInput"
                />
                <Iconlefst name="hashtag" />
                <Iconright name="search" />
                <div className="inputBar"></div>
              </div>
            </InputContainer>
            <MenuContainer>
              <STLink to="/about">
                <Menu status={pathname === "/about"}>About</Menu>
              </STLink>
              {loginInfo ? (
                //<Menu onClick={handleLogout}>{loginInfo.profile.nickname}</Menu>
                <UserDropdown
                  id={loginInfo.id}
                  nickname={loginInfo.profile.nickname}
                />
              ) : (
                <Menu
                  onClick={() => dispatch(allActions.modalActions.openModal())}
                >
                  User
                </Menu>
              )}
            </MenuContainer>
          </Content>
        </Container>
      </SVisibility>
      <Fixedheader status={calculations.bottomPassed}>
        <Content>
          <MenuContainer>
            <STLink to="/main">
              <Menu status={pathname === "/main"}>Main</Menu>
            </STLink>
            <Menu
              status={pathname === "/search"}
              onClick={() => {
                document.getElementById("SubInput").focus();
              }}
            >
              Search
            </Menu>
          </MenuContainer>
          <InputContainer>
            <div>
              <SearchInput
                className="inputBox"
                type="text"
                placeholder="태그를 입력하세요."
                id="SubInput"
              />
              <Iconlefst name="hashtag" />
              <Iconright name="search" />
              <div className="inputBar"></div>
            </div>
          </InputContainer>
          <MenuContainer>
            <STLink to="/about">
              <Menu status={pathname === "/about"}>About</Menu>
            </STLink>
            {loginInfo ? (
              <UserDropdown
                id={loginInfo.id}
                nickname={loginInfo.profile.nickname}
              />
            ) : (
              <Menu
                onClick={() => dispatch(allActions.modalActions.openModal())}
              >
                User
              </Menu>
            )}
          </MenuContainer>
        </Content>
      </Fixedheader>
      <Modal
        size="mini"
        dimmer="blurring"
        open={open}
        onClose={() => dispatch(allActions.modalActions.closeModal())}
      >
        <LoginModal />
      </Modal>
    </>
  );
});
