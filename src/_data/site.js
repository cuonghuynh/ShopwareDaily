const environmentSpecificVariables = {
  development: {
    // FIXME: don't hardcode port
    url: 'http://localhost:4001',
  },
  production: {
    url: 'https://www.shopwaredaily.com',
  },
};

module.exports = {
  title: 'Shopware Daily',
  author: 'Shopware Daily',
  email: 'cuongdev@hotmail.com',
  description: 'Every day bringing you the latest news, tutorials, and packages for the Shopware 6.',
  keywords: ['Shopware Daily', 'Shopware 6', 'Symfony', 'PHP', 'VueJs', 'Docker'],
  lang: 'en-US',
  issues: {
    owner: `cuonghuynh`,
    repo: `shopwaredaily.com`,
  },
  pagination: {
    itemsPerPage: 21,
  },
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV],
};
