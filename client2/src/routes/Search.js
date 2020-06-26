import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import ByTags from "./SearchByTags";
import ByUser from "./SearchByUser";

const Container = styled.div`
  width: 1250px;
  margin: 0 auto;
  padding-top: 60px;
`;

//검색 컴포넌트입니다.
//url의 query string을 받아와서 변수가 user검색인지 tag검색인지를 구분합니다.
//user검색이면 SearchByUser.js를 렌더링 tag검색이면 SearchByTags.js를 렌더링합니다.
//또한 url의 query string이 바뀔때마다 렌더링의 갱신이 이루어집니다.
export default withRouter(() => {
  const [searchType, setSearchType] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);

  //주소가 바뀜에 따라 searchType의 값을 바꿔줍니다.
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
    
  }, [window.location.search]);

  useEffect(()=> {
    console.log(searchType)
  },[searchType])

  return (
    <>
      <Container>
        <>
          {(searchType === "tags" && <ByTags />) || (searchType === "userId" && <ByUser />) || (searchType === null && <>잘못된 주소로의 접근입니다.</>)}

        </>
      </Container>
    </>
  );
});
