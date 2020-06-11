import React from "react";
import styled from "styled-components";
import { Dimmer, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  min-height: 500px;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Contents = styled.div`
  font-size: 18px;
  line-height: 1.2;
  margin-bottom: 50px;
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

const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 10px;
`;

const Img = styled.img`
  max-width: 500px;
`;

const Info = styled.div`
  display: flex;
  width: 450px;
  flex-direction: column;
  position: relative;
  padding: 30px;
  justify-content: center;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
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
          <Dimmer inverted active>
            <Loader inverted />
          </Dimmer>
        </Container>
      ) : (
        <Container>
          <Img src={`http://www.hongsick.com${info.imgs[0]}`} />
          <Info>
            <Title>{info.title}</Title>
            <Writer>
              <UserImg
                src={`http://www.hongsick.com${info.writer.profile.thumbnail}`}
              />
              <div>{info.writer.profile.nickname}</div>
            </Writer>
            <Contents>{info.contents}</Contents>
            <Price>{info.price}원</Price>
            <HashTags>
              {info.tags.map((tag, index) => (
                <Tag key={index}>
                  <Link to={`/search/${tag.id}`}>#{tag.hashtag}</Link>
                </Tag>
              ))}
            </HashTags>
          </Info>
        </Container>
      )}
    </>
  );
};

export default DetailModal;
