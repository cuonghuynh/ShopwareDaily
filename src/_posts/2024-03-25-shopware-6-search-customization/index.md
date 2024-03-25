---
title: Shopware 6 Search Customization
description: This post dives into the basics of search customization, helping you understand keywords, search behavior, and how to optimize results for a smoother shopping experience for your customers.
keywords: ['Shopware 6', 'Search customization', 'Search keywords', 'Keyword dictionary', 'Search behavior', 'Search performance']
categories: [shopware6]
---


Last week, I delved into the world of Shopware 6 search customization, and I'm here to share my insights with you! This blog post will unpack the inner workings of Shopware's search functionality and offer valuable tips to optimize your search experience.

### Understanding Search Keywords:

- Shopware stores extracted keywords from your product content along with a ranking value.
- These keywords are limited to 500 characters each.
- The ranking value is calculated based on the content where the keyword appears.

{% include "postImage.html" src: "./images/searchable_content_config.png", alt: "Settings > Search > Searchable Content", caption: "Settings > Search > Searchable Content" %}

### The Keyword Dictionary:

This table stores additional keywords extracted from your product content.

### Inserting Search Data:

- Shopware automatically generates keyword data based on your searchable content configuration at product indexing.
- We'll explore the specific code responsible for this process at Content/Product/DataAbstractionLayer/SearchKeywordUpdater.php:123

```php
foreach ($existingProducts as $product) {
    $analyzed = $this->analyzer->analyze($product, $context, $configFields);

    $productId = Uuid::fromHexToBytes($product->getId());

    foreach ($analyzed as $keyword) {
        $keywords[] = [
            'id' => Uuid::randomBytes(),
            'version_id' => $versionId,
            'product_version_id' => $versionId,
            'language_id' => $languageId,
            'product_id' => $productId,
            'keyword' => $keyword->getKeyword(),
            'ranking' => $keyword->getRanking(),
            'created_at' => $now,
        ];
        $key = $keyword->getKeyword() . $languageId;
        $dictionary[$key] = [
            'id' => Uuid::randomBytes(),
            'language_id' => $languageId,
            'keyword' => $keyword->getKeyword(),
        ];
    }
}

$this->insertKeywords($keywords);
$this->insertDictionary($dictionary);
```

### Finding Relevant Keywords:

- When a user enters a search term, Shopware breaks it down into individual words.
- It then excludes words defined in the "Excluded Search Terms" configuration.

{% include "postImage.html" src: "./images/excluded_search_terms.png", alt: "Settings > Search > Excluded Search Terms", caption: "Settings > Search > Excluded Search Terms" %}

- Shopware searches the Keyword Dictionary table for matches and assigns scores based on the Levenshtein distance between search words and dictionary keywords

```php
// Content/Product/SearchKeyword/ProductSearchTermInterpreter.php

// ...
$scoring = [];
foreach ($matches as $match) {
    $score = 1;

    $matchSegments = $this->tokenizer->tokenize($match);

    if (\count($matchSegments) > 1) {
        $score += \count($matchSegments) * 4;
    }

    foreach ($tokens as $token) {
        $levenshtein = levenshtein($match, (string) $token);

        if ($levenshtein === 0) {
            $score += 6;

            continue;
        }

        if ($levenshtein <= 2) {
            $score += 3;

            continue;
        }

        if ($levenshtein <= 3) {
            $score += 2;
        }
    }

    $scoring[$match] = $score / 10;
}
```

### Matching Products:

- The system searches the Search Keyword table for identified keywords and retrieves relevant products.
- Products are ranked based on their keyword scores.

{% include "postImage.html" src: "./images/live_search_results.png", alt: "Settings > Search > Live search", caption: "Settings > Search > Live search" %}

### Shopware's Search Behavior:

Shopware offers two search behaviors:
- "AND" search: Only displays results containing all search terms.
- "OR" search: Shows results that match any of the search terms.

{% include "postImage.html" src: "./images/search_behaviour.png", alt: "Settings > Search > Search behaviour", caption: "Settings > Search > Search behaviour" %}

### Performance Optimization Tips:

I encountered performance issues with "AND" searches for a high number of terms.
If you face a similar problem, consider switching to "OR" search for broader results.
Alternatively, you can customize the product search builder service to limit the number of search terms. In my case, I limited it to 7 terms for optimal performance.

```php
// decorate service Content/Product/SearchKeyword/ProductSearchBuilder.php

public function build(Request $request, Criteria $criteria, SalesChannelContext $context): void
{
  //...

  // override search term
  $words = explode(" ", $term);
  $wordLimit = 7; // my limit
  $limitedWords = array_slice($words, 0, $wordLimit);
  $limitedTerm = implode(" ", $limitedWords);

  $pattern = $this->interpreter->interpret($limitedTerm, $context->getContext());

  //...
}
```
