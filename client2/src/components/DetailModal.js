import React from "react";
import styled from "styled-components";
import { Dimmer, Loader } from "semantic-ui-react";

const Container = styled.div`
  padding: 50px;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Contents = styled.div`
  font-size: 20px;
  line-height: 1.2;
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
  width: 100%;
  margin-bottom: 20px;
`;

const Info = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
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

const DetailModal = ({ info }) => {
  console.log(info);
  return (
    <>
      {info === null ? (
        <Container>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Container>
      ) : (
        <Container>
          <Title>{info.title}</Title>
          <Img src="/images/placeholder-img.jpg" />
          <Contents>{info.contents}</Contents>
          <Info>
            <Price>{info.price}원</Price>
            <Writer>{info.writer.profile.nickname}</Writer>
            <HashTags>
              {info.tags.map((tag, index) => (
                <Tag key={index}>#{tag.hashtag}</Tag>
              ))}
            </HashTags>
          </Info>
        </Container>
      )}
    </>
  );
};

export default DetailModal;
