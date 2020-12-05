import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ParamsContextProvider } from '../context/params';
import { COLORS, normalize, wordpressOverrides } from '../style';

export default class SiteDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render () {
    return (
      <html>
        <Head>
          <style>
            {
              `
                ${normalize}
                ${wordpressOverrides}
                body {
                  background-color: ${COLORS.light_grey};
                  color: ${COLORS.dark_grey};
                  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                   
                }
                p {
                  line-height: 170%;
                  margin-bottom: 1.5em;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                  font-family: TimesNewRoman,Times New Roman,Times,Baskerville,Georgia,serif;
                }
                h4 {
                  font-size: 1.5rem;
                }
                h6 {
                  font-size: 1.25rem;
                }
              `
            }
          </style>
          { this.props.styleTags }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
