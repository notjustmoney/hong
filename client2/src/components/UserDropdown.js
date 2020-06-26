import React from "react";
import { Dropdown } from "semantic-ui-react";
import allActions from "../store/actions";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./UserDropdown.css";

// 로그인 되어있을 시 출력하는 드롭다운

const SDropdown = styled(Dropdown)`
  &&& {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
  }
`;

const UserDropdown = ({ id, nickname }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 로컬스토리지 및 리덕스 스토어 제거
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    window.localStorage.removeItem("id");
    dispatch(allActions.loginActions.logOutUser());
  };
  return (
    <SDropdown text="My Info" icon="">
      <Dropdown.Menu>
        <Link to={`/user/${id}`}>
          <Dropdown.Item text={`#${nickname}`} />
        </Link>
        <Dropdown.Divider />
        <Dropdown.Item text="로그아웃" onClick={handleLogout} />
      </Dropdown.Menu>
    </SDropdown>
  );
};

export default UserDropdown;
