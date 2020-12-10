import React from 'react';
import Error from 'next/error';
import styled from 'styled-components';
import Menu from '../../components/Menu';
import Layout from '../../components/Layout';
import PageWrapper from '../../components/PageWrapper';
import PostList from '../../components/PostList';
import ContentEnd from '../../components/ContentEnd';
import { getNavigation, getPage } from '../../actions';
import { SIZES, COLORS } from '../../style';
import { useResize } from '../../context/resize';

const PageHeader = styled.div`
  background-color: ${COLORS.light_grey};
  color: ${COLORS.dark_grey};
  padding: ${SIZES.m};
  height: 35vh;
  position: relative;
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
  }
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
  const { apiRoute } = query;
  const { slug } = params;
  try {
    const [page, headerMenu] = await Promise.all([
      getPage({ slug }),
      getNavigation()
    ]);

    return { props: { page, headerMenu } };
  } catch (err) {
    console.error(err);
    return { props: {}};
  }  
};

const Page = ({ page, headerMenu }) => {
  const { windowWidth } = useResize();
  const isMobile = windowWidth < 600;

  const { title, content, excerpt } = page;
  
  const metaData = {
    title: `${title?.rendered}`,
    image: page?._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    description: excerpt?._raw
  };

  if (!headerMenu || !page) {
    return (
      <Layout menu={{ items: [] }} metaData={metaData}>
        <PageHeader>
          <StyledHeader isMobile={isMobile}>{title?.rendered}</StyledHeader>
        </PageHeader>
        <p>Coming soon</p>
      </Layout>
    );
  }

  return (
    <Layout menu={headerMenu} metaData={metaData}>
      <PageHeader>
        <StyledHeader isMobile={isMobile}>{title?.rendered}</StyledHeader>
      </PageHeader>
      <ContentContainer>
        <ContentWrapper>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: content?.rendered,
            }}
          />
          <ContentEnd />
        </ContentWrapper>
      </ContentContainer>
    </Layout>
  );
};

export default PageWrapper(Page);
