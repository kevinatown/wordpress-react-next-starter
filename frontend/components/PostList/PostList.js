import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PostMediaLink from '../Post/PostMediaLink';
import { getPosts } from '../../actions';
import { useParams } from '../../context/params';
import { useScroll } from '../../context/scroll';
import ContentEnd from '../ContentEnd';
import Loader from '../Loader';

const StyledPostList = styled.div`

`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const PostList = ({ posts = [], cat, total, totalPages }) => {
  const { params, updateParams } = useParams();
  const ref = useRef();
  const { clientHeight } = useScroll();
  const { page=1 } = params;
  
  const [postData, setpostData] = useState(posts);
  const [isFetching, setIsFetching] = useState(false);
 

  const getMorePosts = useCallback(async () => {
    const newPage = parseInt(page, 10) + 1;
    setIsFetching(true);
    if (newPage <= totalPages && !isFetching) {
      const { posts: newPosts } = await getPosts({ page: newPage, cat: cat });
      setpostData([ ...postData, ...newPosts ]);
      updateParams({ page: newPage }, true);
      setIsFetching(false);
    } 
  }, [
    page,
    setpostData,
    getPosts,
    updateParams,
    postData,
    setIsFetching,
    isFetching
  ]);

  const { bottom } = ref?.current?.getBoundingClientRect() || {};
  const hasMore = parseInt(page, 10) < totalPages;

  useEffect(() => {
    if (!isFetching) {
      setpostData(posts);
    }
  },[setpostData, posts, isFetching]);

  const postsComponents = postData.map((post, idx) => {
    const {
      slug,
      id
    } = post;

    return (
      <PostMediaLink
        key={`${id}_${slug}`}
        post={post}
      />
    );
  });

  if (bottom && bottom <= clientHeight && hasMore && !isFetching) {
    getMorePosts();
  }

  return (
    <StyledPostList>
      { postsComponents }
      {
        !hasMore ? 
          <ContentEnd /> :
          <LoaderWrapper>
            { isFetching && <Loader /> }
            <div ref={ref} />
          </LoaderWrapper>
      }
    </StyledPostList>
  );
}
