import React from "react";
import styled from "styled-components";


const Title = styled.p`
  font-size:1.5em;
  font-weight:bold;
`;

const Bold = styled.span`
  font-weight:bold;
  color:red;
  font-size:1.3em;
`;

const Privacy = () => {
  return (
    <div>
      <Title>[개인정보 수집 및 이용 동의]</Title>
      <p>홍대병은 다음과 같이 개인정보를 수집 및 이용하고 있습니다. </p>
      <ul>
        <li>
          - 수집 및 이용 목적: 회원 가입, 홍대병 서비스 제공, 이용자 식별, 중복가입
          방지, 공지사항 전달
        </li>
        <li>- 항목: 이메일주소, 이름, 닉네임, 비밀번호</li>
      </ul>
      <ul>
        <li>
          - 보유 및 이용기간:{" "}
          <strong>
            회원탈퇴일로부터 즉시 (법령에 특별한 규정이 있을 경우 관련 법령에
            따라 보관)
          </strong>
        </li>
      </ul>
      <p>
        <Bold>동의를 거부할 경우 회원가입이 불가능 합니다.</Bold>
        <br />
        외부 계정을 이용하는 경우 이용자가 동의한 범위 내에서만 개인정보를
        제공받고 처리합니다.
        <br />
        이벤트 등 프로모션 알림 전송을 위해 선택적으로 개인정보를 이용할 수
        있습니다.
      </p>
      <p>
        ※ 그 외의 사항 및 자동 수집 정보와 관련된 사항은 개인정보처리방침을
        따릅니다.
      </p>
    </div>
  );
};

export default Privacy;
