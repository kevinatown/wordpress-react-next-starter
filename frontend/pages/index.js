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

export async function getServerSideProps({ query }) {
  const { page = 1 } = query;
  const perPage = page * 10;
  // Fetch featured/latest post first
  const [ headerMenu, { posts: featuredPosts, total, totalPages } ] = await Promise.all([
    getNavigation(),
    getPosts({})
  ]);

  // get the rest of the posts
  const { posts } = await getPosts({
    page: 1,
    perPage: perPage < total ? perPage : total,
    ignore: [
      featuredPost?.id
    ]
  });

  return {
    props: {
      posts,
      headerMenu,
      featuredPost,
      total,
      totalPages
    },
  }
}

const Index = ({
  posts,
  headerMenu,
  featuredPost,
  total,
  totalPages
}) => {
  const metaData = {
    description: '',
    image: featuredPost?._embedded['wp:featuredmedia']?.[0]?.source_url,
    title: ''
  };

  return (
    <Layout menu={headerMenu} metaData={metaData}>
      <div>
        <PostMediaLink
          post={featuredPost}
          isHeader
        />
        <PostsContainer>
          <PostList
            total={total}
            totalPages={totalPages}
            posts={posts}
            ignore={[
              featuredPost?.id,
            ]}
          />
        </PostsContainer>
      </div>
    </Layout>
  );
}

export default PageWrapper(Index);
