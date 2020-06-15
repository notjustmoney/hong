import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Icon, Loader } from "semantic-ui-react";
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

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #e2e2e2;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  transition:all .35s;
  cursor: pointer;
  i{
    margin-left:3px;
    color:black;
    transition:all .2s;
  }
  :hover{
    background-color:rgb(255, 181, 30);
    i{
      transform: rotate(90deg);
    }
  }
`;

export default withRouter((props) => {
  const [posts, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const uH = useHistory();
  const {
    match: {
      params: { id },
    },
  } = props;
  
  const tags = props.location.search;
  const tagsArray = decodeURIComponent(tags.split("=")[1]).split(",");
  
  const searchByTag = async (id) => {
    try {
      const resp = await apis.searchByTag(id);
      setPost(resp.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTag = (index) => {
    tagsArray.splice(index,1);
    if(tagsArray.length === 0){
      uH.push(`/main`);
      return; 
    }
    const url = encodeURIComponent(tagsArray);
    uH.push(`/search?tags=${url}`);
  }

  useEffect(() => {
    searchByTag(id);
    console.log(urlParams.get('userId'));
    console.log(1);
  }, []);

  console.log(posts);
  
  return (
    <>
        <HashTags>
          {tagsArray && tagsArray.map((tag, index) => 
            <Tag key={index} onClick={() => handleRemoveTag(index)}>
              #{tag}<Icon name="x" />
            </Tag>
          )}
        </HashTags>
        {loading ? (
          <Loader active />
        ) : (
          <>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Grid>
                {posts && posts.map((post, index) =>
                  post === null ? (
                    <div key={index}></div>
                  ) : (
                    <Cards
                      key={index}
                      id={post.id}
                      title={post.title}
                      contents={post.contents}
                      imgs={`http://www.hongsick.com${post.imgs[0]}`}
                      tags={post.tags}
                      price={post.price}
                      writer={post.writer.profile.nickname}
                      imgsLength={post.imgs.length}
                    />
                  )
                )}
              </Grid>
            )}
          </>
        )}
    </>
  );
});
