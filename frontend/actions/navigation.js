import WPAPI from 'wpapi';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });
wp.menus = wp.registerRoute('menus/v1', '/menus/(?P<id>[a-zA-Z(-]+)');

export const getNavigation = async (menu='Main') => {
  try {
    return await wp.menus().id(menu);
  } catch (error) {
    console.error(`Error getting menu: ${menu}`, error);
    return { items: [] };
  }
};

