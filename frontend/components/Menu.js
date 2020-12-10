/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Config from '../config';
import styled from 'styled-components';

const MenuWrapper = styled.nav`
`;

const getSlug = url => {
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
};

const Menu = ({ menu }) => {
  return (
    <MenuWrapper>
      <div className="links dn flex-l justify-between items-center">
        {
          menu.items.map(item => {
            if (item.object === 'custom') {
              return (
                <a href={item.url} key={item.ID}>{item.title}</a>
              );
            }
            const slug = getSlug(item.url);
            const actualPage = item.object === 'category' ? 'category' : 'post';
            return (
              <Link
                as={`/${item.object}/${slug}`}
                href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                key={item.ID}
              >
                <a>{item.title}</a>
              </Link>
            );
          })
        }
      </div>
    </MenuWrapper>
  );
}
            


// class Menu extends Component {
//   state = {
//     token: null,
//     username: null,
//   };

//   componentDidMount() {
//     const token = localStorage.getItem(Config.AUTH_TOKEN);
//     const username = localStorage.getItem(Config.USERNAME);
//     this.setState({ token, username });
//   }

//   render() {
//     const { menu } = this.props;
//     const { token, username } = this.state;

//     const handleSelectChange = (e) => {
//       location.href = e.target.value;
//     }

//     return (
     
//     );
//   }
// }
export default Menu;
