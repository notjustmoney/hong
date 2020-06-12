import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import apis from "../api";
import Cards from "../components/Cards";
import styled from "styled-components";

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

export default withRouter((props) => {
  const [posts, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    match: {
      params: { id },
    },
  } = props;
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

  useEffect(() => {
    searchByTag(id);
  }, []);

  console.log(posts);
  return (
    <>
      <Container>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Grid>
                {posts.map((post, index) =>
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
                    />
                  )
                )}
              </Grid>
            )}
          </>
        )}
      </Container>
    </>
  );
});
