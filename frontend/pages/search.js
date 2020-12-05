import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import WPAPI from 'wpapi';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

class Search extends Component {
  state = {
    posts: [],
    filter: '',
  };

  /**
   * Execute search query, process the response and set the state
   */
  executeSearch = async () => {
    const { filter } = this.state;
    let posts = await wp
      .posts()
      .search(filter);

    this.setState({ posts });
  }

  render() {
    const { posts } = this.state;
    const { headerMenu } = this.props;

    if (!headerMenu || !posts || headerMenu.length < 1 || posts.length < 1) {
      return (<p>Coming soon</p>);
    }

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <p>Coming soon..</p>
      </Layout>
    );
  }
}

export default PageWrapper(Search);
