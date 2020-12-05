import WPAPI from 'wpapi';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

export const getCategories = async ({ slug }) => {
  try {
    return await wp.categories().slug(slug).then(d => d[0]);
  } catch (err) {
    console.error({ err });
    return [];
  }
};

