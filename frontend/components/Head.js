import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Headr = ({ metaData = {} }) => {
  const router = useRouter();
  const {
    description = "DESCRIPTION",
    image,
    title = "TITLE"
  } =  metaData;
  const { asPath } = router;
  const url = `BASE_URL${asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta property="description" content={description} />
      <meta name="description" content={description} />
      
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
     
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={title} />
      
      <meta name="robots" content="index, follow" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default Headr;
