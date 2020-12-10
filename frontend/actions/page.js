import WPAPI from 'wpapi';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

export const getPage = async ({ slug }) => {
  try {
    return await wp.pages().slug(slug).embed().then(d => d[0]);
  } catch (err) {
    console.error({ err, location: 'getPage' });
    return [];
  }
};

