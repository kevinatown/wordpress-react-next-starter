import React, { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import PostList from '../components/PostList';
import PostMediaLink from '../components/Post/PostMediaLink';
import { getNavigation, getPosts, getCategories } from '../actions';
import { COLORS, SIZES } from '../style';

const FeaturedPostWrapper = styled.div`

`;

const PostsContainer = styled.div`
  display: flex;
  @media screen and (min-width:600px) {
    margin: ${SIZES.s};
  }
`;

const CatPostContainer = styled(PostsContainer)`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  max-height: 60vh;
  @media screen and (min-width:600px) {
    flex-wrap: nowrap;
  }
`;

const CatPostWrapper = styled.div`
  flex-basis: 100%;
  overflow: hidden;
  margin: 1rem;
  background: ${COLORS.magenta};
  box-shadow: 0px 2px 5px 3px ${COLORS.black};
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 15px;
  &:hover {
    box-shadow: 0px 2px 11px 2px ${COLORS.green} 
  }
`;

const CatPostHeaderWrapper = styled.div`
  position: absolute;
  background-color: rgba(85,85,85,0.8);
  width: 100%;
`

// maybe not this, not sure
// border-left: 0.25rem solid ${COLORS.red};
const CatPostHeader = styled.h2`
  color: ${COLORS.white};
  text-align: center;
  margin: 0.75rem;
`

export async function getServerSideProps({ query }) {
  const { page = 1 } = query;
  const perPage = page * 10;
  const [ headerMenu, { posts: featuredPosts, total, totalPages }, musicCat, tvCat, filmCat ] = await Promise.all([
    getNavigation(),
    getPosts({}),
    getCategories({ slug: 'music' }),
    getCategories({ slug: 'tv' }),
    getCategories({ slug: 'film' }),
  ]);

  const featuredPost = featuredPosts && featuredPosts[0] || 0;
  const { posts: featuredMusics } = await getPosts({
    cat: musicCat?.id,
    ignore: [ featuredPost?.id ]
  });
  const featuredMusic = featuredMusics && featuredMusics[0] || 0;

  const { posts: featuredTvs } = await getPosts({
    cat: tvCat?.id,
    ignore: [ featuredPost?.id, featuredMusic?.id ]
  });
  const featuredTv = featuredTvs && featuredTvs[0] || 0;
  
  const { posts: featuredFilms } = await getPosts({
    cat: filmCat?.id,
    ignore: [ featuredPost?.id, featuredMusic?.id, featuredTv?.id ]
  });
  const featuredFilm = featuredFilms && featuredFilms[0] || 0;

  const { posts } = await getPosts({
    page: 1,
    perPage: perPage < total ? perPage : total,
    ignore: [
      featuredPost?.id,
      featuredMusic?.id,
      featuredTv?.id,
      featuredFilm?.id
    ]
  });

  return {
    props: {
      posts,
      headerMenu,
      featuredPost,
      featuredMusic,
      featuredFilm,
      featuredTv,
      total,
      totalPages
    },
  }
}

const Index = ({
  posts,
  headerMenu,
  featuredPost,
  featuredMusic,
  featuredFilm,
  featuredTv,
  total,
  totalPages
}) => {
  const metaData = {
    description: 'A pop culture blog focusing on tv, film, and music.',
    image: featuredPost?._embedded['wp:featuredmedia']?.[0]?.source_url,
    title: 'Era of Good Feeling'
  };

  return (
    <Layout menu={headerMenu} metaData={metaData}>
      <div>
        <PostMediaLink
          post={featuredPost}
          isHeader
        />
        <CatPostContainer>
          <CatPostWrapper>
            <CatPostHeaderWrapper>
              <CatPostHeader>Music</CatPostHeader>
            </CatPostHeaderWrapper>
            <PostMediaLink
              post={featuredMusic}
              isSmall
              isFeatureCatPost
            />
          </CatPostWrapper>
          <CatPostWrapper>
            <CatPostHeaderWrapper>
              <CatPostHeader>Film</CatPostHeader>
            </CatPostHeaderWrapper>
            <PostMediaLink
              post={featuredFilm}
              isSmall
              isFeatureCatPost
            />
          </CatPostWrapper>
          <CatPostWrapper>
            <CatPostHeaderWrapper>
              <CatPostHeader>TV</CatPostHeader>
            </CatPostHeaderWrapper>
            <PostMediaLink
              post={featuredTv}
              isSmall
              isFeatureCatPost
            />
          </CatPostWrapper>
        </CatPostContainer>
        <PostsContainer>
          <PostList
            total={total}
            totalPages={totalPages}
            posts={posts}
            ignore={[
              featuredPost?.id,
              featuredMusic?.id,
              featuredTv?.id,
              featuredFilm?.id
            ]}
          />
        </PostsContainer>
      </div>
    </Layout>
  );
}

export default PageWrapper(Index);
