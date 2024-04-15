---
title: "Shopware 6 CMS: Optimizing Performance with Partial Loading"
description: Unlock faster loading times and a smoother user experience for your Shopware 6 storefront with CMS partial loading! This blog post dives into how partial loading works, its benefits, and different API endpoints to target specific content sections.
keywords: ['Shopware 6', 'CMS', 'Shopping Experiences', 'partial loading', 'performance optimization']
categories: [shopware6]
---

Shopware 6 offers a powerful CMS system called [Shopping Experiences](https://developer.shopware.com/docs/concepts/commerce/content/shopping-experiences-cms.html#page), built on a flexible structure of pages and layouts. But sometimes, you might not need the entire content of a CMS page on your storefront. This is where partial loading comes in, a feature that allows you to retrieve specific sections of a page, improving performance and efficiency.

### Understanding the Structure

Imagine a CMS page as a hierarchy. At the top, you have sections, which contain blocks. These blocks hold elements, the building blocks of your content. Each element can have its own configuration options.

Here's a simplified example of a CMS page in JSON format:

```json
{
  cmsPage: {
      sections: [{
          blocks: [{
              slots: [{
                  slot: "content",
                  type: "product-listing",
                  /* ... */
              }]
          }, /* ... */]
      }, /* ... */]
  }
}
```

### Why Use Partial Loading?

By default, the API returns the entire HTML content of a CMS page. But what if you only need a specific section, like a product listing or a contact form? Partial loading allows you to target these specific elements, significantly reducing the amount of data transferred. This translates to faster loading times and a smoother user experience for your customers.


### How Partial Loading Works

Shopware 6 provides different API endpoints for various partial loading scenarios:

**Load CMS Page Content**: This endpoint retrieves the HTML of a specific CMS page, excluding the header and footer.

```http
GET /widgets/cms/{cmsPageId}
Content-Type: text/html
Accept: text/html
```

{% include "postImage.html" src: "./images/load_cms_page.png", alt: "Load CMS Page Content", caption: "Load CMS Page Content" %}

{% include "postImage.html" src: "./images/load_cms_page_form.png", alt: "Load CMS Page Contact Form", caption: "Load CMS Page Contact Form" %}


**Load Navigation Page**: This endpoint returns all sections of a category or listing page, perfect for displaying product listings with filters.

```http
GET /widgets/cms/navigation/{cmsPageId}
Content-Type: text/html
Accept: text/html
```

{% include "postImage.html" src: "./images/load_navigation_page.png", alt: "Load Category Page has Listing and Filter", caption: "Load Category Page has Listing and Filter" %}

**Load Navigation Page Slots**: Need even more granularity? Use this endpoint to target specific slots within a category page by specifying slot IDs in the query string. This allows you to load only the filter section, for example.

```http
GET /widgets/cms/navigation/{cmsPageId}?slots={slotID_1|slotID_2}
Content-Type: text/html
Accept: text/html
```

{% include "postImage.html" src: "./images/load_navigation_slot.png", alt: "Load Filter Only in Category Page", caption: "Load Filter Only in Category Page" %}

**Product Switch Variant CMS Element**: This endpoint focuses on product elements. It returns the buy box product element associated with a provided product ID.

```http
GET /widgets/cms/buybox/{productId}/switch
Content-Type: text/html
Accept: text/html
```


### Benefits of Partial Loading

Improved Performance: By loading only the necessary content, you reduce the amount of data transferred, leading to faster page load times.
Enhanced Flexibility: Partial loading gives you more control over the content displayed on your storefront, allowing for a more customized experience.
Optimized Development: By focusing on specific content sections, developers can build more efficient and targeted functionalities.
