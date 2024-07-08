---
title: "Adding JavaScript and CSS from an npm Package in Shopware 6: A Guide Using SimpleBar"
description: "Learn how to install and use NPM packages in Shopware 6 by integrating the Simplebar package for custom scrollbars. Follow our step-by-step guide to enhance your Shopware 6 store with beautiful and consistent scrollbars using Simplebar."
keywords: ['Shopware 6', 'npm', 'js', 'css', 'simplebar', 'tutorial', 'frontend']
categories: [shopware6]
thumbnail: ./images/simplebar.png
---

{% include "postImage.html" src: "./images/simplebar.png", alt: "Simplebar", caption: "Simplebar" %}

[Simplebar](https://www.npmjs.com/package/simplebar) is a customizable scrollbars library that enables developers to create beautiful, cross-browser custom scrollbars with minimal effort. It can enhance the user experience by providing more visually appealing and consistent scrollbars across different browsers.


### Step 1. Initialize NPM:

Navigate to the `<plugin root>src/Resources/app/storefront/` folder and initialize npm

```bash
cd src/Resources/app/storefront/
npm init -y
```

### Step 2. Install simplebar

Install simplebar using npm

```bash
npm install simplebar
```

### Step 3. Add package to the build system

Create a `build` folder in current area and add the `webpack.config.js` file with the following content:

```js
// <plugin root>/src/Resources/app/storefront/build/webpack.config.js
const { join, resolve } = require('path');
module.exports = () => {
    return {
        resolve: {
           alias: {
               'simplebar': resolve(
                    join(__dirname, '..', 'node_modules', 'simplebar')
               )
           }
       }
   };
}
```

### Step 4. Include JS and CSS

1. Import simplebar in JS

Create a new plugin js `simplebar.plugin.js` file in `src/plugin/` folder and init simplebar elements

```js
// <plugin root>/src/Resources/app/storefront/src/plugin/simplebar.plugin.js

import Plugin from 'src/plugin-system/plugin.class';
import SimpleBar from 'simplebar';

export default class SimpleBarPlugin extends Plugin {
    init() {
        new SimpleBar(this.el, { autoHide: false });
    }
}
```

Register a new plugin js in the `main.js` file

```js
// <plugin root>/src/Resources/app/storefront/src/main.js
import SimpleBarPlugin from "./plugin/simple-bar.plugin";

PluginManager.register('SimpleBar', SimpleBarPlugin, '[data-simple-bar]');
```

2. Import simplebar styles

Modify base style `base.scss` file and import simplebar style

```scss
// <plugin root>/src/Resources/app/storefront/src/scss/base.scss


@import '../../node_modules/simplebar/dist/simplebar.min';

```

By following these steps, you've successfully integrated the [Simplebar](https://www.npmjs.com/package/simplebar) NPM package into your Shopware 6 plugin. This not only enhances the visual appeal of your scrollbars but also demonstrates the power and flexibility of using NPM packages within Shopware. Happy coding!

Ref:
- https://www.npmjs.com/package/simplebar
- https://developer.shopware.com/docs/v6.5/guides/plugins/plugins/plugin-fundamentals/using-npm-dependencies.html
