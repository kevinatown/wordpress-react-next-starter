import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { SIZES, COLORS } from '../../style';

const ArticleMediaWrapper = styled.article`
  background: ${({ mediaSrc }) => `white url(${mediaSrc})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  
  display: flex;
  margin:  ${({ isSmall, isHeader }) => isSmall ? '0' : isHeader ?
    `0 0 ${SIZES.s}` : `${SIZES.s} 0`};  
`;

const TitleLink = styled.a`
  cursor: pointer;
  width: 100%;
  height: ${({ isSmall }) => isSmall ? 'auto' : '100%'};
`;

const StyledHeader = styled.h3`
  
`;


const ArticleExcerpt = styled.div`

`;


const PostMediaLink = ({ post, isSmall=false, isHeader=false, isFeatureCatPost=false }) => {

  const {
    featured_media, 
    _embedded,
    title,
    excerpt,
    slug
  } = post || {};

  const featuredMedia = featured_media ? _embedded['wp:featuredmedia'][0] : {};
  const { source_url } = featuredMedia;
   
  return (
    <ArticleMediaWrapper
      mediaSrc={source_url}
      isSmall={isSmall}
      isHeader={isHeader}
      isFeatureCatPost={isFeatureCatPost}
    >
      <Link
        as={`/post/${slug}`}
        href={`/post?slug=${slug}&apiRoute=post`}
      >
        <TitleLink
          isSmall={isSmall}
          isHeader={isHeader}
        >
          <StyledHeader
            isSmall={isSmall}
            dangerouslySetInnerHTML={{
              __html: title && title.rendered || '',
            }}
          />
          {
            !isSmall &&
            <ArticleExcerpt>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: excerpt && excerpt.rendered || '',
                }}
              />
            </ArticleExcerpt>
          }
        </TitleLink>
      </Link> 
    </ArticleMediaWrapper>
  );
}

export default PostMediaLink;
