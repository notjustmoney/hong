import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cards from "../components/Cards";
import Header from "../components/Header";
import apis from "../api";

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

const Banner = styled.div`
  grid-column: span 4;
  height: 300px;
  border: 1px solid gray;
  margin-bottom: 20px;
`;

const Main = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const resp = await apis.getPosts();
      setPosts(resp.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts);
  return (
    <>
      <Header />
      <Container>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Grid>
            <Banner>Hello</Banner>
            {posts.map((post) => (
              <Cards
                key={post.id}
                id={post.id}
                title={post.title}
                contents={post.contents}
                imgs={`http://www.hongsick.com${post.imgs[0]}`}
                tags={post.tags}
                price={post.price}
                writer={post.writer.profile.nickname}
              />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Main;
