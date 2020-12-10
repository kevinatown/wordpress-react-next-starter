import React, { Component } from 'react';
import Error from 'next/error';
import styled from 'styled-components';
import Menu from '../../components/Menu';
import Layout from '../../components/Layout';
import PageWrapper from '../../components/PageWrapper';
import ContentEnd from '../../components/ContentEnd';
import { getNavigation, getPost } from '../../actions';
import { COLORS, SIZES } from '../../style';

export async function getServerSideProps({ query, params }) {
  const { slug } = params;

  try {
    const [post, headerMenu] = await Promise.all([
      getPost({ slug }),
      getNavigation()
    ]);

    return { props: { post, headerMenu } };
  } catch (err) {
    console.error(err);
    return { props: {}};
  }  
}

const HeroImageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const NoHero = styled.div`
  background-color: ${COLORS.light_grey};
  color: ${COLORS.dark_grey};
  padding: ${SIZES.m};
  height: 35vh;
  position: relative;
`;

const Hero = styled.img`
  width: 100%;
  height: auto;
`;

const ContentContainer = styled.div`
  position: relative;
`;

const ContentWrapper = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1rem;
  background-color: ${COLORS.light_grey};

  @media screen and (min-width:600px) {
    margin: ${SIZES.s} ${SIZES.m};
    padding: 1rem ${SIZES.m} ${SIZES.s};
    box-shadow: 0px 2px 4px 0px ${COLORS.magenta};
    top: -120px;
  }
`;

const PostTitle = styled.h2`
  font-size: 2rem;
  padding-left: ${SIZES.xs};
  border-left: 0.4rem solid ${COLORS.magenta};
`;

const Post = ({ post, headerMenu }) => {

  if (!post || !post.title) {
    return <Error statusCode={404} />;
  }

  const heroUrl = (
    post._embedded &&
    post._embedded['wp:featuredmedia'] &&
    post._embedded['wp:featuredmedia'][0] &&
    post._embedded['wp:featuredmedia'][0].source_url
  ) ? post._embedded['wp:featuredmedia'][0].source_url : false;

  const catagories = (
    post?._embedded &&
    post?._embedded['wp:term'] &&
    post?._embedded['wp:term'][0]
  ) ? post?._embedded['wp:term'][0].map(c => c.name) : [];

  const authors = (
    post?._embedded &&
    post?._embedded?.author
  ) ? post?._embedded?.author.map(c => c.name) : [];

  const metaData = {
    image: heroUrl,
    title: post?.title?.rendered,
    description: post?.excerpt?._raw,
  };

  return (
    <Layout menu={headerMenu} metaData={metaData} >
      {heroUrl ? (
        <HeroImageWrapper>
          <Hero
            src={heroUrl}
          />
        </HeroImageWrapper>
      ) : <NoHero />}
      <ContentContainer>
        <ContentWrapper>
          <PostTitle
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          />
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
          <ContentEnd />
        </ContentWrapper>
      </ContentContainer>
    </Layout>
  );
};

export default PageWrapper(Post);
