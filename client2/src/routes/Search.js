import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import apis from "../api";
import Cards from "../components/Cards";
import styled from "styled-components";
import ByTags from "./SearchByTags";
import ByUser from "./SearchByUser";

const Container = styled.div`
  width: 1250px;
  margin: 0 auto;
  padding-top: 60px;
`;

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

export default withRouter(() => {
  const [posts, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const uH = useHistory();

  

  useEffect(() => {
    if(urlParams.get("userId")){
      setSearchType("userId");
    }
    else if(urlParams.get("tags")){
      setSearchType("tags");
    }
    else{
      setSearchType(null);
    }
  }, []);

  console.log(posts);
  
  return (
    <>
      <Container>
        <>
          {searchType === "userId" && <><ByUser /></>}
          {searchType === "tags" && <><ByTags /></>}
          {searchType === null && <>잘못된 주소로의 접근입니다.</>}
        </>
      </Container>
    </>
  );
});
