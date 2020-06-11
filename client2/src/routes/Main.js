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
  background: url("images/bannerImage.png");
  background-size: cover;
  background-position: center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 300px;
    width: 420px;
    background-color: #acc538;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
`;

const BannerTitle = styled.div`
  position: relative;
  z-index: 200;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 5px;
  margin-bottom: 20px;
`;

const BannerContent = styled.div`
  color: #f2f2f2;
  position: relative;
  z-index: 200;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Main = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const resp = await apis.getPosts();
      const data = resp.data.reverse();
      setPosts(data);
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
      <Container>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Grid>
            <Banner>
              <BannerTitle>홍대병</BannerTitle>
              <BannerContent>
                카드를 누르면 자세한 정보를 볼 수 있어요!
              </BannerContent>
              <BannerContent>
                해시태그를 누르면 해당 태그를 가진 게시물이 보여요!
              </BannerContent>
              <BannerContent>원하는 옷을 찾아보고 구매하세요!</BannerContent>
              <BannerContent>감사합니다!</BannerContent>
            </Banner>
            {posts &&
              posts.map((post) => (
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
