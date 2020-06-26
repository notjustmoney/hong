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

const NoPost = styled.div`
  font-size:1.5em;
  text-align:center;
  opacity:.8;
  padding-top:100px;
`;

//태그 검색 관련 컴포넌트입니다.
export default withRouter(({props}) => {
  const urlParams = new URLSearchParams(window.location.search);
  const [posts, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState("");
  const [tagsArray, setTagsArray] = useState(urlParams.get("tags").split(","));
  const uH = useHistory();

  //검색한 태그들은 상단에 노출되며 클릭시 삭제할 수 있습니다.
  const handleRemoveTag = (index) => {
    tagsArray.splice(index,1);
    if(tagsArray.length === 0){
      uH.push(`/main`);
      return; 
    }
    const url = encodeURIComponent(tagsArray);
    uH.push(`/search?tags=${url}`);
  }
  
  //태그로 게시글을 불러오는 함수입니다.
  //태그검색으로 통한 중복검색을 reduce메소드를 이용하여 구분했습니다.
  const handleGetPostByTags = async () => {
    if(tags === null || tags === ""){
      return;
    }
    setLoading(true);
    try{
      const resp = await apis.searchByTags(tags);
      const reverse = resp.data.reverse();
      const filtered = reverse.filter(data => data);
      const unique = filtered.reduce((a,b)=> {
        if(!JSON.stringify(a).includes(b.id)) a.push(b);
        return a;
      },[])
      setPost(unique);
    }catch(e){
      console.log(e);
      
    }
    setLoading(false);
  }
  
  
  //url이 바뀔때마다 태그를 분류하는 함수입니다.
  useEffect(() => {
    setTagsArray(urlParams.get("tags").split(","));
  },[urlParams.get("tags")])

  useEffect(() => {
    setTags(encodeURIComponent(JSON.stringify(tagsArray)));
  },[tagsArray])

  useEffect(() => {
    handleGetPostByTags();
  },[tags])
  
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
          {posts && posts.length === 0 && <NoPost><Icon name="hashtag" />검색하신 태그에 해당하는 글이 없습니다.</NoPost>}
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
                    likes={post.likes}
                    comments={post.comments.length}
                  />
                )
              )}
            </Grid>
          </>
        )}
    </>
  );
});
