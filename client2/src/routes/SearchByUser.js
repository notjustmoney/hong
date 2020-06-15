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
`;


export default withRouter((props) => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    setUserId(urlParams.get("userId"));
  }, []);
  useEffect(() => {
    if(userId){
      handleGetUserPost();
    }
  },[userId])

  const handleGetUserPost = async () => {
    try{
      const resp = await apis.getPostsByUser(userId);
      const reverse = resp.data.reverse();
      setPosts(reverse);
      
    }catch(e){
      console.log(e);
      setError(e.response.data.message);
      
    }finally{
      setLoading(false);
    }
  }

  return (<>
    {loading ? (
      <Loader active />
    ) : (
    <>
      {error && <div>{error}</div>}
      {posts && <WhoIsUser>{posts[0].writer.profile.nickname}님의 게시글</WhoIsUser>}
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
