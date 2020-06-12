import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Dimmer, Loader, Button, Icon } from "semantic-ui-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import apis from "../api";

const Container = styled.div`
  height: 300px;
  width: 500px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 120%;
`;

const Contents = styled.div`
  font-size: 1em;
  line-height: 1.2;
  margin-bottom: 20px;
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
  border-radius: 50px;
`;

const Nickname = styled.div`
  font-size: 1em;
  font-weight: bold;
  padding: 7px 10px 0px 10px;
`;

const Info = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: 500;
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
  cursor: pointer;
`;

const PopContent = styled.div`
  max-width: 1000px;
  max-height: 700px;
  height: auto;
  overflow: hidden;
  display: flex;
`;

const ImgCarousel = styled.div`
  max-width: 700px;
  float: left;
  background-color: black;
`;

const InstaLink = styled.div`
  position: absolute;
  border-radius: 20px;
  height: 25px;
  padding: 0 5px;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0.5;
  left: 10px;
  bottom: 10px;
  z-index: 100;
  color: white;
  line-height: 25px;
  transition: all 0.5s;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

const Img = styled.img`
  max-width: 700px;
  max-height: 700px;
  object-fit: contain;
  margin: 0;
  padding: 0;
  display: block;
`;

const ContentInfo = styled.div`
  width: 300px;
  min-height: 100%;
  float: right;
  position: relative;
`;
const ImgPostion = styled.div`
  align-items: center;
  height: 100%;
  display: flex;
`;

const PopHeader = styled.div`
  padding: 10px 20px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  margin-bottom: 10px;
`;
const PopContents = styled.div`
  padding: 10px 20px 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;



const PopComment = styled.div`
  min-height: 100px;
  flex: 1;
  width: 100%;
  padding: 10px 20px;
  overflow-y: scroll;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PopInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PopFooter = styled.div`
  width:100%;
  height:30px;
  text-align:right;
  color:rgba(0,0,0,0.6);
  font-size:.95em;
  line-height:30px;
  i{
    transition:all .35s;
    margin-left:5px;
    cursor: pointer;
    :hover{
      color:rgba(0,0,0,1);
    }
  }
`;

const Like = styled(Icon)`
  color:${(props) => props.isliked ? "rgba(254, 136, 0, 1)" : "inherit"};
  :hover{
    color:${(props) => props.isliked ? "rgba(255, 181, 30, 1)" : "rgba(0,0,0,1);"};
  }
`;

const CommentBox = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;

const CommentWriter = styled.span`
  margin-right: 10px;
`;

const Comment = styled.span`
  font-size: 0.8em;
  font-weight: normal;
  line-height: 12px !important;
`;

const NoComments = styled.div`
  height: 200px;
  text-align: center;
  line-height: 200px;
  color: rgba(12, 12, 12, 0.5);
`;

const InputBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

const CommentInput = styled.textarea`
  width: 80%;
  height: 100%;
  border-radius: 0;
  resize: none;
  padding: 15px 10px;
  border: none;
  z-index: 1;
  :focus {
    outline: none;
  }
`;

const CommnetSubmit = styled(Button)`
  width: 20%;
  height: 100%;
  &&& {
    z-index: 1;
    margin: 0;
    padding: 0;
    border-radius: 0;
  }
`;

const NeedLogin = styled.div`
  width: 100%;
  height: 100%;
  font-size: 0.8em;
  color: gray;
  line-height: 50px;
  text-align: center;
`;

const DetailModal = ({ info }) => {
  const [comments, setComment] = useState("");
  const [isLiked, setLike] = useState(false);
  const [btnstate, setBtnState] = useState({
    loading: "",
    disabled: "disabled",
  });
  const loginInfo = window.localStorage.getItem("access_token");
  const [contents, setContents] = useState(info);

  const handleComment = (e) => {
    setComment(e.target.value);
    if (comments !== "") {
      setBtnState({ loading: "", disabled: "" });
    } else {
      setBtnState({ loading: "", disabled: "disabled" });
    }
  };

  useEffect(() => {
    setContents(info);
  }, [info]);

  const handleCommentSubmit = async () => {
    if (comments === "") {
      alert("댓글을 작성해 주세요.");
      return;
    }
    setBtnState({ loading: "loading", disabled: "disabled" });
    const comment = {
      contents: comments,
    };
    try {
      const resp = await apis.comment(comment, contents.id, loginInfo);
      const refresh = await apis.getDetailPost(contents.id);
      setContents(refresh.data);
      setBtnState({ loading: "", disabled: "disabled" });
      const element = document.getElementById("comments");
      element.scroll({
        top: element.scrollHeight,
        behavior: "smooth",
      });
    } catch (e) {
      alert("댓글 작성 실패. 로그인 상태를 확인해 주세요.");
    }
    setComment("");
  };

  return (
    <>
      {contents === null ? (
        <Container>
          <Dimmer inverted active>
            <Loader inverted>불러오는 중</Loader>
          </Dimmer>
        </Container>
      ) : (
        <>
          <PopContent>
            <ImgCarousel>
              <InstaLink
                onClick={() => {
                  window.open(`${contents.link}`);
                }}
              >
                Instagram 바로가기
              </InstaLink>
              <Carousel showThumbs={false}>
                {contents.imgs.map((imgs, index) => (
                  <ImgPostion key={index}>
                    <Img src={`http://www.hongsick.com${imgs}`} />
                  </ImgPostion>
                ))}
              </Carousel>
            </ImgCarousel>
            <ContentInfo>
              <PopInfo>
                <PopHeader>
                  <UserImg
                    src={`http://www.hongsick.com${contents.writer.profile.thumbnail}`}
                  />
                  <Nickname>{contents.writer.profile.nickname}</Nickname>
                </PopHeader>
                <PopContents>
                  <Title>{contents.title}</Title>
                  <Price>{contents.price}원</Price>
                  <Contents>{contents.contents}</Contents>
                  <Info>
                    <HashTags>
                      {contents.tags.map((tag, index) => (
                        <Link to={`/search/${tag.id}`} key={index}>
                          <Tag>#{tag.hashtag}</Tag>
                        </Link>
                      ))}
                    </HashTags>
                    <PopFooter>
                      <Like name="like" isliked={isLiked} />0
                      <Icon name="comment" onClick={() => {document.getElementById("commentbox").focus()}} />0
                    </PopFooter>
                  </Info>
                </PopContents>
                <PopComment id="comments">
                  {contents.comments.length === 0 && (
                    <NoComments>댓글이 없습니다.</NoComments>
                  )}
                  {contents.comments.map((comments, index) => (
                    <CommentBox key={index}>
                      <UserImg
                        src={`http://www.hongsick.com${comments.writer.profile.thumbnail}`}
                      />
                      <Nickname>
                        <CommentWriter>
                          {comments.writer.profile.nickname}
                        </CommentWriter>
                        <Comment>{comments.contents}</Comment>
                      </Nickname>
                    </CommentBox>
                  ))}
                </PopComment>
                <InputBox>
                  {loginInfo ? (
                    <>
                      <CommentInput
                        placeholder="댓글 작성"
                        value={comments}
                        onChange={handleComment}
                        id = "commentbox"
                      />
                      <CommnetSubmit
                        onClick={handleCommentSubmit}
                        content="게시"
                        color="orange"
                        className={[btnstate.loading, btnstate.disabled]}
                      />
                    </>
                  ) : (
                    <NeedLogin>
                      댓글을 작성하시려면 로그인이 필요합니다.
                    </NeedLogin>
                  )}
                </InputBox>
              </PopInfo>
            </ContentInfo>
          </PopContent>
        </>
      )}
    </>
  );
};

export default DetailModal;
