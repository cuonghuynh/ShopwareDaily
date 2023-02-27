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
  description: 'Dev tutorials, thoughts on software development, and the occasional off-topic post.',
  keywords: ['Shopware Daily', 'Shopware 6', 'Symfony', 'PHP', 'VueJs', 'Docker'],
  lang: 'en-US',
  issues: {
    owner: `AleksandrHovhannisyan`,
    repo: `aleksandrhovhannisyan.com`,
  },
  pagination: {
    itemsPerPage: 21,
  },
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV],
};
