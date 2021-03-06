import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Dimmer, Loader, Button, Icon } from "semantic-ui-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../store/actions";
import apis from "../api";

// 상품에 대한 자세한 정보 출력 컴포넌트

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
  position: relative;
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
  width: 100%;
  height: 30px;
  text-align: right;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.95em;
  line-height: 30px;
  i {
    transition: all 0.35s;
    margin: 0 5px;
    cursor: pointer;
    :hover {
      color: rgba(0, 0, 0, 1);
    }
  }
`;

const Like = styled(Icon)`
  &&& {
    color: ${(props) =>
      props.isliked === "true" ? "rgba(254, 136, 0, 1)" : "rgba(0, 0, 0, 0.6)"};
    :hover {
      color: ${(props) =>
        props.isliked === "true" ? "rgba(0,0,0,1)" : "rgba(255, 181, 30, 1)"};
    }
    margin-right: 10px;
  }
`;

const DeletePost = styled(Icon)`
  &&& {
    :hover {
      color: rgba(254, 136, 0, 1);
    }
  }
`;

const CommentBox = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  position: relative;
  :hover {
    .options {
      opacity: 1;
    }
  }
  z-index: 100;
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
  line-height: 100%;
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
  z-index: 1;
`;

const NeedLoginSpan = styled.span`
  color: rgba(254, 136, 0, 1);
  z-index: 2;
  cursor: pointer;
`;

const CommentOptions = styled.div`
  z-index: 2;
  height: 100%;
  width: 20px;
  left: 100%;
  position: absolute;
  opacity: 0;
`;
const OptionIcon = styled(Icon)`
  &&& {
    position: absolute;
    top: 30%;
    opacity: 0.5;
    transition: all 0.35s;
    cursor: pointer;
    :hover {
      color: rgba(254, 136, 0, 1);
    }
  }
`;

const Pointer = styled.span`
  cursor: pointer;
`;

const DetailModal = ({ info }) => {
  const access = window.localStorage.getItem("access_token");
  const [comments, setComment] = useState("");
  const [isLiked, setLike] = useState("false");
  const [btnstate, setBtnState] = useState({
    loading: "",
    disabled: "disabled",
  });
  const access_token = window.localStorage.getItem("access_token");
  const loginInfo = useSelector((state) => state.loginInfo);
  const open = useSelector((state) => state.isOpen);
  const [contents, setContents] = useState(info);
  const dispatch = useDispatch();

  // comment 작성 시 버튼 상태 변경
  const handleComment = (e) => {
    setComment(e.target.value);
    if (comments !== "") {
      setBtnState({ loading: "", disabled: "" });
    } else {
      setBtnState({ loading: "", disabled: "disabled" });
    }
  };

  // 좋아요 관련 설정
  const handleLike = async () => {
    if (!loginInfo) {
      dispatch(allActions.modalActions.openModal());
      return;
    }
    if (isLiked === "false") {
      try {
        // 좋아요
        const resp = await apis.likes(contents.id, loginInfo.id, access_token);
        const refresh = await apis.getDetailPost(contents.id);
        setContents(refresh.data);
        setLike("true");
      } catch (e) {
        const mess = e.response.data.message;
        if (mess && mess.includes("Already")) {
          alert("이미 좋아요를 눌렀습니다.");
        }
      }
    } else {
      try {
        // 좋아요 취소
        const resp = await apis.unlikes(
          contents.id,
          loginInfo.id,
          access_token
        );
        const refresh = await apis.getDetailPost(contents.id);
        setContents(refresh.data);
        setLike("false");
      } catch (e) {
        console.log(e);

        alert("새로고침이 필요합니다.");
      }
    }
  };

  // 포스트 삭제 함수
  // access token 필요
  const handleDeletePost = async () => {
    try {
      const resp = await apis.deletepost(contents.id, access_token);
      window.location.reload();
    } catch (e) {
      alert("삭제 실패! 로그인 상태를 확인해주세요.");
    }
  };

  useEffect(() => {
    setContents(info);
  }, [info]);

  // content 렌더링 부분
  // 내용이 바뀔 때마다 다시 렌더링하도록 설정
  useEffect(() => {
    if (contents) {
      let content = document.getElementById(`${contents.id}modal`);
      let parseContents = contents.contents.replace(/&lt;/gi, "<");
      content.innerHTML = parseContents;
      if (loginInfo && contents.likes.length > 0) {
        for (let key in contents.likes) {
          if (contents.likes[key].user.id === loginInfo.id) {
            setLike("true");
            return;
          }
        }
      }
      setLike("false");
    }
  }, [contents]);

  // comment 제출 함수
  // 작성 버튼 클릭 시 버튼 비활성화
  const handleCommentSubmit = async () => {
    if (comments === "") {
      alert("댓글을 작성해 주세요.");
      return;
    }
    setBtnState({ loading: "loading", disabled: "disabled" });
    const comment = {
      postId: contents.id,
      contents: comments,
    };
    try {
      const resp = await apis.comment(comment, access_token);
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

  // 댓글 삭제 함수
  // access token으로 인증 필요
  const hadleDeleteComment = async (commentId) => {
    try {
      const resp = await apis.deleteComment(
        commentId,
        loginInfo.id,
        access_token
      );
      const refresh = await apis.getDetailPost(contents.id);
      setContents(refresh.data);
      setBtnState({ loading: "", disabled: "disabled" });
      const element = document.getElementById("comments");
      element.scroll({
        top: 0,
        behavior: "smooth",
      });
    } catch (e) {
      alert("댓글 삭제 실패! 로그인 상태를 확인해주세요.");
    }
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
                  <Nickname onClick={() => window.location.href=`/search?userId=${contents.writer.id}`} >
                      <Pointer>{contents.writer.profile.nickname}</Pointer>
                  </Nickname>
                </PopHeader>
                <PopContents>
                  <Title>{contents.title}</Title>
                  <Price>{contents.price}원</Price>
                  <Contents id={`${contents.id}modal`}></Contents>
                  <Info>
                    <HashTags>
                      {contents.tags.map((tag, index) => (
                        <Link to={`/search?tags=${tag.hashtag}`} key={index}>
                          <Tag>#{tag.hashtag}</Tag>
                        </Link>
                      ))}
                    </HashTags>
                    <PopFooter>
                      {loginInfo && contents.writer.id === loginInfo.id && (
                        <DeletePost
                          name="x"
                          onClick={() => {
                            if (
                              window.confirm("해당 게시글을 삭제하시겠습니까?")
                            ) {
                              handleDeletePost();
                            } else {
                            }
                          }}
                        />
                      )}
                      <Like name="like" isliked={isLiked} onClick={handleLike}>
                        {contents.likes.length}
                      </Like>
                      <Icon
                        name="comment"
                        onClick={() => {
                          if (loginInfo) {
                            document.getElementById("commentbox").focus();
                          } else {
                            dispatch(allActions.modalActions.openModal());
                          }
                        }}
                      >
                        {contents.comments.length}
                      </Icon>
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
                      {loginInfo && comments.writer.id === loginInfo.id && (
                        <CommentOptions className="options">
                          <OptionIcon
                            name="x"
                            onClick={() => {
                              if (
                                window.confirm("해당 댓글을 삭제하시겠습니까?")
                              ) {
                                hadleDeleteComment(comments.id);
                              } else {
                              }
                            }}
                          />
                        </CommentOptions>
                      )}
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
                        id="commentbox"
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
                      댓글을 작성하시려면{" "}
                      <NeedLoginSpan
                        onClick={() =>
                          dispatch(allActions.modalActions.openModal())
                        }
                      >
                        로그인
                      </NeedLoginSpan>
                      이 필요합니다.
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
