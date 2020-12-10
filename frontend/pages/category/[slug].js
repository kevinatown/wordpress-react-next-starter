import React from 'react';
import Error from 'next/error';
import styled from 'styled-components';
import Menu from '../../components/Menu';
import Layout from '../../components/Layout';
import PageWrapper from '../../components/PageWrapper';
import PostList from '../../components/PostList';
import { getNavigation, getPosts, getCategories } from '../../actions';
import { SIZES, COLORS } from '../../style';
import { useResize } from '../../context/resize';

const CatHeader = styled.div`
  background-color: ${COLORS.light_grey};
  color: ${COLORS.dark_grey};
  padding: ${SIZES.m};
  height: 35vh;
  position: relative;
`;

const PostsContainer = styled.div`
  display: flex;
  margin: ${SIZES.s};
`;

const StyledHeader = styled.h2`
  font-size: ${SIZES.m};
  position: absolute;
  font-size: 4rem;
  right: ${({isMobile}) => isMobile ? 'auto' : '2em'};
  left: ${({isMobile}) => isMobile ? 0 : 'auto'};
  bottom: 0.25em;
  padding: 0 ${SIZES.s};
  border-right: 0.5rem solid ${COLORS.green};
  border-bottom: 0.5rem solid ${COLORS.green};
`;

export async function getServerSideProps({ query, params }) {
  const { apiRoute, page=1 } = query;
  const { slug } = params;
  try {
    const [cat, headerMenu] = await Promise.all([
      getCategories({ slug }),
      getNavigation()
    ]);

    const { posts, total, totalPages } = await getPosts({
      page,
      cat: cat.id
    });


    return { props: { cat, posts, headerMenu, total, totalPages } };
  } catch (err) {
    console.error(err);
    return { props: {}};
  }  
};

const Category = ({ cat, posts, headerMenu, total, totalPages }) => {
  const { windowWidth } = useResize();
  const isMobile = windowWidth < 600;

  const { description, name } = cat;
  
  const metaData = {
    title: `- ${name}`,
    image: posts?.[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    description
  };

  if (!headerMenu || !posts || headerMenu.length < 1 || posts.length < 1) {
    return (
      <Layout menu={{ items: [] }} metaData={metaData}>
        <CatHeader>
          <StyledHeader isMobile={isMobile}>{cat.name}</StyledHeader>
        </CatHeader>
        <p>Coming soon</p>
      </Layout>
    );
  }

  return (
    <Layout menu={headerMenu} metaData={metaData}>
      <CatHeader>
        <StyledHeader isMobile={isMobile}>{cat.name}</StyledHeader>
      </CatHeader>
      <PostsContainer>
        <PostList
          posts={posts}
          cat={cat.id}
          total={total}
          totalPages={totalPages}
        />
      </PostsContainer>
    </Layout>
  );
};

export default PageWrapper(Category);
