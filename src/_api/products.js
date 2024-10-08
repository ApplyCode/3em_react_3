// project imports
import services from 'utils/mockAdapter';
import { products } from 'data/e-commerce';

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/products/list').reply(200, { products });

services.onPost('/api/products/filter').reply((config) => {
  try {
    const { filter } = JSON.parse(config.data);

    if (filter.sort === 'high') {
      products.sort((a, b) => Number(b.offerPrice) - Number(a.offerPrice));
    }

    if (filter.sort === 'low') {
      products.sort((a, b) => Number(a.offerPrice) - Number(b.offerPrice));
    }

    if (filter.sort === 'popularity') {
      products.sort((a, b) => Number(b.popularity) - Number(a.popularity));
    }

    if (filter.sort === 'discount') {
      products.sort((a, b) => Number(b.discount) - Number(a.discount));
    }

    if (filter.sort === 'new') {
      products.sort((a, b) => Number(b.new) - Number(a.new));
    }

    const results = products.filter((product) => {
      let searchMatches = true;

      if (filter.search) {
        const properties = ['name', 'description', 'rating', 'salePrice', 'offerPrice', 'gender'];
        let containsQuery = false;
        
        properties.forEach((property) => {
          if (product[property] && product[property].toString().toLowerCase().includes(filter.search.toString().toLowerCase())) {
            containsQuery = true;
          }
        });
        if (!containsQuery) {
          searchMatches = false;
        }
      }

      const genderMatches = filter.gender.length > 0 ? filter.gender.some((item) => item === product.gender) : true;
      const categoriesMatches =
        filter.categories.length > 0 && filter.categories.some((category) => category !== 'all')
          ? filter.categories.some((category) => product.categories.some((item) => item === category))
          : true;
      const colorsMatches = filter.colors.length > 0 ? filter.colors.some((color) => product.colors.some((item) => item === color)) : true;

      const minMax = filter.price ? filter.price.split('-') : '';
      const priceMatches = filter.price ? product.offerPrice >= minMax[0] && product.offerPrice <= minMax[1] : true;
      const ratingMatches = filter.rating > 0 ? product.rating >= filter.rating : true;

      return searchMatches && genderMatches && categoriesMatches && colorsMatches && priceMatches && ratingMatches;
    });

    return [200, results];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

services.onPost('/api/product/details').reply((config) => {
  try {
    const { id } = JSON.parse(config.data);

    let results;
    if (id === 'default') {
      [results] = products;
    } else {
      // eslint-disable-next-line
      [results] = products?.filter((product) => product.id === Number(id));
    }

    return [200, results];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

services.onPost('/api/product/related').reply((config) => {
  try {
    const { id } = JSON.parse(config.data);

    const results = products.filter((product) => product.id !== Number(id));

    return [200, results];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
