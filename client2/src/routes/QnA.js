import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./QnA.css";
import Kakaomap from "../components/Kakaomap";

// 아코디언 형식의 FAQ와 카카오맵을 이용해 지도 구현

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
  background-position: center;
  background-size: cover;
`;

const TitleWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 40px;
`;

const Explain = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Accordion = styled.div`
  max-width: 1300px;
  width: 100%;
  padding: 0 40px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const SLink = styled(Link)`
  color: #cd6133;
`;

const QnA = () => {
  // 아코디언 FAQ
  const handleClick = (event) => {
    if (!event.target.classList.contains("accordian-toggle")) return;
    // 클릭한 제목의 content 선택
    let content = document.querySelector(event.target.hash);
    if (!content) return;
    event.preventDefault();
    // 클릭한 제목의 내용이 펼쳐져 있는 상태면 닫음
    if (content.classList.contains("active")) {
      content.classList.remove("active");
      return;
    }
    // 열려있는 모든 내용을 닫음
    let accordians = document.querySelectorAll(".accordian-content.active");
    for (let i = 0; i < accordians.length; i++) {
      accordians[i].classList.remove("active");
    }
    // 선택한 제목의 내용만 오픈
    content.classList.add("active");
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return (
    <>
      <Container>
        <TitleWrapper>
          <Title>홍대병 FAQ</Title>
          <Explain>자주 묻는 질문을 모았습니다.</Explain>
          <Explain>
            추가적으로 궁금하신 부분은 홍대병 오픈카톡으로 문의해주세요.
          </Explain>
        </TitleWrapper>
        <Accordion>
          <div className="accordian-wrapper">
            <a href="#content-1" className="accordian-toggle">
              홍대병은 어떤 사이트인가요?
            </a>
            <div className="accordian-content" id="content-1">
              홍대병은 SNS 연계 의류 홍보 사이트입니다.
              <br />
              개성을 강조하는 시대에서, 패션은 그 어떤 것보다 자신을 잘
              나타냅니다.
              <br />
              우리는 이러한 트렌드를 따라가 자신만의 개성이 담긴 옷을 다른
              사람들에게 알려줍니다.
              <br />전 세계의 쇼핑몰들을 둘러보고 마음에 드는 옷을 구매해보세요!
            </div>
          </div>
          <div className="accordian-wrapper">
            <a href="#content-2" className="accordian-toggle">
              회원가입은 어떻게 하나요?
            </a>
            <div className="accordian-content" id="content-2">
              오른쪽 위 User를 클릭해서 나오는 창에서 회원가입을 누르시면
              <br />
              회원가입 페이지로 이동합니다.
            </div>
          </div>
          <div className="accordian-wrapper">
            <a href="#content-3" className="accordian-toggle">
              좋아요와 댓글 기능이 궁금해요.
            </a>
            <div className="accordian-content" id="content-3">
              좋아요 기능을 통해 원하는 글을 저장할 수 있고
              <br />
              댓글 기능을 통해 다른 이용자와 소통할 수 있습니다.
            </div>
          </div>
          <div className="accordian-wrapper">
            <a href="#content-4" className="accordian-toggle">
              판매자 인증은 어떻게 하나요?
            </a>
            <div className="accordian-content" id="content-4">
              홍대병 공식 SNS 또는 이메일로 문의 주시면
              <br />
              홍대병에서 검토 후 인증 처리 해드리겠습니다.
            </div>
          </div>
          <div className="accordian-wrapper">
            <a href="#content-5" className="accordian-toggle">
              게시글은 어떻게 작성하나요?
            </a>
            <div className="accordian-content" id="content-5">
              판매자 인증 후 홍대병에게 문의 주시면
              <br />
              자세히 설명해 드리겠습니다.
            </div>
          </div>
        </Accordion>
        <TitleWrapper>
          <Title>찾아오시는 길</Title>
          <Kakaomap />
        </TitleWrapper>
        <TitleWrapper>
          <Title>Contact US</Title>
          <Explain>
            자세한 내용을 보려면 <SLink to="/contact">여기</SLink>를 클릭하세요.
          </Explain>
        </TitleWrapper>
      </Container>
    </>
  );
};

export default QnA;
