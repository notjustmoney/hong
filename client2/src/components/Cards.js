import React, { useState } from "react";
import styled from "styled-components";
import apis from "../api";
import { Modal } from "semantic-ui-react";
import DetailModal from "../components/DetailModal";
import "./card.css";

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
  /*font-family: "Song Myung", serif;*/
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  position: relative;
  transition:all .35s;
  :hover{
    transform:translateY(-3px);
  }
`;

const Bg = styled.div`
  opacity: 0;
  position: absolute;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 5;
  &:hover {
    background-color: rgba(12, 12, 12, 0.7);
    color: white;
    opacity: 1;
  }
  transition: all 0.1s linear;
  padding: 20px;
`;

const Info = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 20px;
  position: relative;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  padding-bottom: 0;
  line-height: 1.2;
`;

const BgTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const BgDesc = styled.div`
  font-family: "Song Myung", serif;
  line-height: 1.4;
  overflow-y: scroll;
  ::-webkit-scrollbar:{
    display:none;
  }
  opacity: 1 !important;
`;

const HashTags = styled.div`
  display: flex;
  width: 100%;
  div {
    margin-right: 5px;
    color: #0984e3;
  }
  flex-wrap: wrap;
  margin-bottom: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 600;
`;

const Img = styled.img`
  width: 300px;
  transition:all .35s;
  :hover{
    filter:brightness(50%);
  }
`;


const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Writer = styled.div`
  margin-bottom: 20px;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #e2e2e2;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
`;

const PopupModal = styled(Modal)`
  &&&{
    border-radius:0;
  }

`;

const Cards = ({ id, imgs, title, tags, contents, price, writer }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const handleClick = async () => {
    setOpen(true);
    const resp = await apis.getDetailPost(id);
    setInfo(resp.data);
    
  };
  return (
    <>
      <Container onClick={handleClick}>
        <Bg>
          <BgTitle>{title}</BgTitle>
          <BgDesc>{contents}</BgDesc>
        </Bg>
        <Img src={imgs} alt=""/>
        <Title>{title}</Title>
        <Info>
          <Price>{price}원</Price>
          <Writer>{writer}</Writer>
          <HashTags>
            {tags.map((tag, index) => (
              <Tag key={index}>#{tag.hashtag}</Tag>
            ))}
          </HashTags>
        </Info>
      </Container>
      <PopupModal open={open} onClose={() => setOpen(false)}>
        <DetailModal info={info} />
      </PopupModal>
    </>
  );
};

export default Cards;
