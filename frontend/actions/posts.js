import WPAPI from 'wpapi';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

export const getPostCount = async ({}) => {

};

export const getPosts = async ({ page=1, ignore=[], cat=-1, perPage=10 }) => {
  try {
    if (cat >= 0) {
      return await wp.posts()
        .perPage(perPage)
        .page(page)
        .categories(cat)
        .embed()
        .then((data) => {
          const { total = 0, totalPages = 0 } = data?._paging || {};
          return {
            posts: data.filter((p) => {
              return ignore.indexOf(p?.id) < 0;
            }),
            total,
            totalPages,
          }
        });
    }
    const res = await wp.posts()
      .perPage(perPage)
      .page(page)
      .embed()
      .then((data) => {
        const { total = 0, totalPages = 0 } = data?._paging || {};
        return {
          posts: data.filter((p) => {
            return ignore.indexOf(p?.id) < 0;
          }),
          total,
          totalPages,
        }
      });
    return res;
  } catch (err) {
    console.error({ err });
    return [];
  }
};

export const getPost = async ({ slug }) => {
  try {
    return await wp.posts()
      .slug(slug)
      .embed()
      .then(data => {
        return data[0];
      });
  } catch (err) {
    console.error({ err });
    return {};
  }
};

