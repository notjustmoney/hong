import React, { useState, useEffect } from "react";
import styled from "styled-components";
import apis from "../api";
import { Modal, Icon } from "semantic-ui-react";
import DetailModal from "../components/DetailModal";
import { useSelector } from "react-redux";
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
  transition: all 0.35s;
  :hover {
    transform: translateY(-3px);
  }
  cursor: pointer;
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
  flex-direction: column;
  padding: 20px;
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.4;
  overflow-y: scroll;
  opacity: 1 !important;
  ::-webkit-scrollbar{
    display:none;
  }
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

const Img = styled.div`
  width: 300px;
  height: 200px;
  background: url(${(props) => props.path});
  background-position: center;
  background-size: cover;
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
  &&& {
    border-radius: 0;
  }
`;

const MultipleIcon = styled(Icon)`
  z-index:3;
  position:absolute;
  top:10px;
  right:5px;
`;

const LikesAndComments = styled.div`
  color:rgba(0,0,0,.6);
  margin-bottom:10px;
  span{
    margin-right:5px;
  }
`;

const Like = styled(Icon)`
  &&&{
    color: ${(props) => (props.isliked === "true" ? "rgba(254, 136, 0, 1)" : "rgba(0, 0, 0, 0.6)")};
  }
`;

const Cards = ({ id, imgs, title, tags, contents, price, writer, imgsLength, likes, comments }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [isLiked, setLike] = useState("false");
  const loginInfo = useSelector((state) => state.loginInfo);
  const handleClick = async () => {
    setOpen(true);
    const resp = await apis.getDetailPost(id);
    setInfo(resp.data);
  };
  useEffect(() => {
    let content = document.getElementById(id);
    let parseContents = contents.replace(/&lt;/gi, "<");
    content.innerHTML = parseContents;
  }, []);

  useEffect(() => {
    if(!likes || !loginInfo){
      return;
    }
    for (let key in likes){
      if(likes[key].user.id === loginInfo.id){
        setLike("true");
        return;
      }
    }
  },[likes])
  return (
    <>
      <Container onClick={handleClick}>
        <Bg>
          <BgTitle>{title}</BgTitle>
          <BgDesc id={id}></BgDesc>
        </Bg>
        {
          imgsLength > 1 && <MultipleIcon inverted name='clone' />
        }
        <Img path={imgs} />
        <Title>{title}</Title>
        <Info>
          <Price>{price}원</Price>
          <Writer>{writer}</Writer>
          <LikesAndComments>
            <Like name="like" isliked={isLiked} /><span>{likes.length}</span>
            <Icon name="comment" /><span>{comments}</span>
          </LikesAndComments>
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
