import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Loader, Icon } from "semantic-ui-react";
import apis from "../api";
import Cards from "../components/Cards";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 300px));
  justify-content: center;
  gap: 10px;
  margin-bottom: 50px;
`;

const WhoIsUser = styled.div`
  font-size: 2em;
  margin:20px 10px;
  opacity:.7;
`;

// 유저 id 검색 관련 컴포넌트입니다.
export default withRouter((props) => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(window.location.search);

  //첫 렌더링때 userId 값을 받아옵니다.
  useEffect(() => {
    setUserId(urlParams.get("userId"));
  }, []);

  //userId가 변경될때마다 게시물을 불러오는 함수입니다.
  useEffect(() => {
    if(userId){
      handleGetUserPost();
    }
  },[userId])

  //userId를 이용하여 서버에 request를 보내 게시물을 불러오는 함수입니다.
  const handleGetUserPost = async () => {
    try{
      const resp = await apis.getPostsByUser(userId);
      const reverse = resp.data.reverse();
      setPosts(reverse);
      
    }catch(e){
      console.log(e);
      setError("검색하신 아이디에 해당하는 유저가 없거나 유저의 글이 없습니다.");
      
    }finally{
      setLoading(false);
    }
  }

  return (<>
    {loading ? (
      <Loader active />
    ) : (
    <>
      {error && <div><Icon name="hashtag" />{error}</div>}
      {posts && <WhoIsUser><Icon name="hashtag" />{posts[0].writer.profile.nickname}님의 게시글</WhoIsUser>}
      <Grid>
        {posts && posts.map((post, index) =>
          post === null ? (
              <div key={index}></div>
            ) : (
              
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
            )
        )}
      </Grid>
      </>
    )}
  </>);
});
