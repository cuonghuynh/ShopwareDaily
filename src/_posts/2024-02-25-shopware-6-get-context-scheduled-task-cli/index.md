---
title: Understanding Context in Shopware 6 Storefront vs. Schedule Tasks/CLI
description: This post explores the concept of context in Shopware, focusing on how it impacts data handling (reading and writing) in different environments.
keywords: [shopware6, shopware6-cli]
categories: [shopware6]
---

The context contains facts such as language, currency, tax, rules, ... it used the most in the data handling (reading / writing)

From storefront controller, you can easily to get the context in Sales Channels Context:

```php
  public function example(Request $request, EntityRepository $entityRepository)
  {
      $salesChannelContext = $request->attributes->get(PlatformRequest::ATTRIBUTE_SALES_CHANNEL_CONTEXT_OBJECT);
      $context = $salesChannelContext->getContext();
      // .. build critertia
      $result = $entityRepository->search($criteria, $context);
      // ...
  }
```

but it's not available in Schedule tasks / CLI.

Therefore we can create a default context, the issue of it `is that using that method will break some fundamental features of shopware, for example the translation or currency features, where the DAL automatically selects the needed languages or currencies for you.`

```php
Context::createDefaultContext();
```

In case we want handle translation and currency:

```php
use Shopware\Core\System\SalesChannel\Context\SalesChannelContextServiceInterface;

  public function handle(SalesChannelContextServiceInterface $contextService)
  {
      $salesChannelContext = $contextService->get(new SalesChannelContextServiceParameters(
            $salesChannelId,
            Random::getAlphanumericString(32),
            $languageId,
            $currencyId
        ));
      $context = $salesChannelContext->getContext();
      // .. build critertia
      $result = $entityRepository->search($criteria, $context);
      // ...
  }
```

* [Context::createDefaultContext() is marked as @internal](https://github.com/shopware/shopware/issues/1245)
* [Data handling](https://developer.shopware.com/docs/guides/plugins/plugins/framework/data-handling/)
