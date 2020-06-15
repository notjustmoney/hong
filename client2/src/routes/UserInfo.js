import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cards from "../components/Cards";
import { Link } from "react-router-dom";
import { Loader, Icon, Menu } from "semantic-ui-react";
import apis from "../api";

const Wrapper = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  padding-top: 50px;
`;

const Name = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Email = styled.div`
  font-size: 24px;
  font-weight: 600;
  opacity: 0.6;
  margin-bottom: 20px;
`;

const Nickname = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  width:100%;
  margin-bottom:50px;
  background-color:rgba(255,255,255,1);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;


const Img = styled.div`
  width: 200px;
  height: 200px;
  background: url(${(props) => props.path});
  background-position: center;
  border-radius: 100px;
  margin: 20px 50px;
`;

const PostContainer = styled.div`
  width:100%;
  background-color:rgba(255,255,255,1);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const Notice = styled.div`
  opacity:.6;
  font-size:.9em;
  margin-left:10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 300px));
  justify-content: center;
  gap: 10px;
`;

const MyPostsContainer = styled.div`
  margin-bottom:50px;
  padding:30px 0;
`;

const Nopost = styled.div`
  text-align:center;
  line-height:1.2em;
  opacity:.9;
`;

const AboutLink = styled(Link)`
  color:orange;
  :hover{
    color:orange;
    text-decoration:underline;
  }
`;

const UserInfo = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("1");
  const [posts, setPosts] = useState(null);
  const [posted, setPosted] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [liked, setLiked] = useState(null);
  const [commented, setCommented] = useState(null);
  const [viewpost, setViewpost] = useState(null);
  const {
    match: {
      params: { id },
    },
  } = props;
  const getUserInfo = async (id) => {
    const access = window.localStorage.getItem("access_token");
    try {
      const resp = await apis.authMe(id, access);
      setUserInfo(resp.data);
    } catch (e) {
      console.log(e);
      setError("Invalid Access");
    } finally {
      setLoading(false);
    }
  };

  const getUserArticles = async (id) => {
    setPosts(null);
    try {
      const resp = await apis.getPostsByUser(id);
      const reverse = resp.data.reverse();

      setPosted(reverse.filter(data => data.status === "scrapped"));
      setUploaded(reverse.filter(data => data.status !== "scrapped"));
    } catch (e) {
      console.log(e);
    }
  };

  const getUserLikeArticled = async (id) => {
    try {
      const resp = await apis.getPosts();
      const reverse = resp.data.reverse();

      const findLike = reverse.filter((data) => {
        const result = data.likes.map((likedata) => {
          if(likedata.user.id === id){
            return 1;
          }
          return 0;
        }) 
        if(result[0] === 1){
          return data;
        }
      })
      setLiked(findLike);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserCommentArticled = async (id) => {
    try {
      const resp = await apis.getPosts();
      const reverse = resp.data.reverse();

      const findLike = reverse.filter((data) => {
        const result = data.comments.map((cmtdata) => {
          if(cmtdata.writer.id === id){
            return 1;
          }
          return 0;
        }) 
        if(result[0] === 1){
          return data;
        }
      })
      setCommented(findLike);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    //getUserArticles(id);
    getUserInfo(id);
    getUserArticles(id);
    getUserLikeArticled(id);
    getUserCommentArticled(id);
  }, [posts]);
  useEffect(() => {
    if(activeItem === '1'){
      setViewpost(posted);
    }
    else if(activeItem === '2'){
      setViewpost(uploaded);
    }
    else if(activeItem === '3'){
      setViewpost(liked);
    }
    else if(activeItem === '4'){
      setViewpost(commented);
    }
  })
  return (
    <Wrapper>
      {loading ? (
        <Loader active />
      ) : (<>
          {error ? (
            <div>{error}</div>
          ) : (
          <>
            <InfoContainer>
              <Img
                path={`http://www.hongsick.com${userInfo.user.profile.thumbnail}`}
              />
              <Info>
                <Name>{userInfo.user.profile.name}</Name>
                <Email>{userInfo.user.email}</Email>
                <Nickname>
                  {userInfo.user.profile.nickname}
                  {userInfo.user.role === "productor" && <Icon color='green' name="check circle outline" />}
                </Nickname>
              </Info>
            </InfoContainer>
            <PostContainer>
              <Menu pointing secondary>
                <Menu.Item
                  name='포스팅된 내 게시글'
                  active={activeItem === '1'}
                  onClick={() => setActiveItem('1')}
                  color="orange"
                />
                <Menu.Item
                  name='업로드된 내 게시글'
                  active={activeItem === '2'}
                  onClick={() => setActiveItem('2')}
                  color="orange"
                />
                <Menu.Item
                  name='좋아요 한 게시글'
                  active={activeItem === '3'}
                  onClick={() => setActiveItem('3')}
                  color="orange"
                />
                <Menu.Item
                  name='댓글을 단 게시글'
                  active={activeItem === '4'}
                  onClick={() => setActiveItem('4')}
                  color="orange"
                />
              </Menu>
                {activeItem === '1' && <Notice><Icon name="hashtag" />포스팅된 내 게시글은 현재 홍대병 페이지에 노출되고 있는 글이며 모든 사용자가 접근할 수 있습니다.</Notice>}
                {activeItem === '2' && <Notice><Icon name="hashtag" />업로드된 내 게시글은 현재 포스팅 전 단계의 글이며 회원님께서만 접근이 가능하고 직접 포스팅 할 수 있습니다.</Notice>}
                {activeItem === '3' && <Notice><Icon name="hashtag" />회원님께서 좋아요를 누른 게시글들 입니다.</Notice>}
                {activeItem === '4' && <Notice><Icon name="hashtag" />회원님께서 댓글을 단 게시글들 입니다.</Notice>}
              <MyPostsContainer>
                {viewpost === null || ( viewpost != null && typeof viewpost == "object" && !Object.keys(viewpost).length ) ?
                  (<Nopost>
                    해당하는 글이 없습니다.
                    {activeItem === '1' && 
                      <div>
                        <p>혹시 판매자가 아니신가요?</p>
                        <p>궁금하신점은 <AboutLink to="/about">여기</AboutLink>를 참고해주세요.</p>
                      </div>
                    }
                    {activeItem === '2' && 
                      <div>
                        <p>혹시 판매자가 아니신가요?</p>
                        <p>궁금하신점은 <AboutLink to="/about">여기</AboutLink>를 참고해주세요.</p>
                      </div>
                    }
                    {activeItem === '3' && 
                      <div>
                        <p>좋아요 기능을 활용해주세요!</p>
                        <p>궁금하신점은 <AboutLink to="/about">여기</AboutLink>를 참고해주세요.</p>
                      </div>
                    }
                    {activeItem === '4' && 
                      <div>
                        <p>댓글 기능을 사용해 소통해보세요!</p>
                        <p>궁금하신점은 <AboutLink to="/about">여기</AboutLink>를 참고해주세요.</p>
                      </div>
                    }
                  </Nopost>):(<></>)
                }
                <Grid>
                  {viewpost &&
                  viewpost.map((post) => (
                    <Cards
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      contents={post.contents}
                      imgs={`http://www.hongsick.com${post.imgs[0]}`}
                      tags={post.tags}
                      price={post.price}
                      writer={post.writer.profile.nickname}
                      imgsLength={post.imgs.length}
                      likes={post.likes}
                      comments={post.comments.length}
                    />
                  ))}
                </Grid>
              </MyPostsContainer>
            </PostContainer>
          </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default UserInfo;
