import React, { useState, useEffect } from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import "./header.css";
import { Modal, Visibility, Icon } from "semantic-ui-react";
import LoginModal from "../components/LoginModal";
import allActions from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import UserDropdown from "./UserDropdown";
import apis from "../api";

// 스크롤에 반응하는 헤더
// 큰 헤더가 보이지 않게 되면 간축된 헤더가 나타남

const Fixedheader = styled.div`
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 100%;
  background-color: white;
  height: 60px;
  position: fixed;
  left: 0;
  top: ${(props) => (props.status ? "0" : "-70px")};
  z-index: 95;
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
  cursor: pointer;
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

const ModalWrapper = styled(Modal)`
  &&& {
    border-radius: 0;
  }
`;

export default withRouter(({ location: { pathname, search } }) => {
  const open = useSelector((state) => state.isOpen);
  const posts = useSelector((state) => state.posts);
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState(0);
  const [cnt, setCnt] = useState(0);
  const urlParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const [tagsearch, setTagSearch] = useState("");
  const [calculations, setCalcul] = useState({
    topPassed: false,
    bottomPassed: false,
    topVisible: false,
    bottomVisible: false,
  });
  const loginInfo = useSelector((state) => state.loginInfo);
  const uH = useHistory();

  // 로컬스토리지에 유저 정보가 있는지 혹인
  const handleIsUser = async () => {
    const userId = window.localStorage.getItem("id");
    const access = window.localStorage.getItem("access_token");
    if (userId !== null) {
      console.log("LS get user");
      const {
        data: { user },
      } = await apis.authMe(userId, access);
      // 유저 정보가 있다면 redux 스토어에 저장
      dispatch(allActions.loginActions.loginUserSuccess(user));
    }
  };

  useEffect(() => {
    handleIsUser();
  }, []);

  const handleSearch = (e) => {
    const tags = e.target.value.replace(" ", ",");
    setTagSearch(tags);
  };

  const handleTagSearch = () => {
    if (tagsearch === "") {
      alert("태그를 입력해주세요.");
      return;
    }
    const url = encodeURIComponent(tagsearch);
    uH.push(`/search?tags=${url}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTagSearch();
    }
  };

  // 스크롤 시 헤더의 정보를 저장하는 calculations 업데이트
  const handleUpdate = (e, { calculations }) => {
    setCalcul(calculations);
  };

  // access token 만료 시 refresh token을 발급하기 위한 작업
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

  useEffect(() => {
    if (pathname === "/search" && urlParams.get("tags")) {
      const tags = urlParams.get("tags");
      setTagSearch(tags);
    } else {
      setTagSearch("");
    }
  }, [search]);

  return (
    <>
      <SVisibility className="Vcontainer" onUpdate={handleUpdate}>
        <Container>
          <SLink to="/main">
            <Logo path={`/images/logo.png`} />
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
                  placeholder="띄어쓰기로 태그 별 검색."
                  id="MainInput"
                  onChange={handleSearch}
                  value={tagsearch}
                  onKeyPress={handleKeyPress}
                />
                <Iconlefst name="hashtag" />
                <Iconright name="search" onClick={handleTagSearch} />
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
                placeholder="띄어쓰기로 태그 별 검색."
                id="SubInput"
                onChange={handleSearch}
                value={tagsearch}
                onKeyPress={handleKeyPress}
              />
              <Iconlefst name="hashtag" />
              <Iconright name="search" onClick={handleTagSearch} />
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
      <ModalWrapper
        size="mini"
        dimmer="blurring"
        open={open}
        onClose={() => dispatch(allActions.modalActions.closeModal())}
      >
        <LoginModal />
      </ModalWrapper>
    </>
  );
});
