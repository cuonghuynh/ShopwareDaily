---
title: Troubleshooting Shopware 6 with Event Logs
description: Unravel Shopware 6 mysteries with ease! This blog unveils the power of Event Logs, your one-stop shop for efficient troubleshooting within Shopware 6. Learn to pinpoint email delivery issues, decipher priority levels, and even integrate custom event logging into your extensions. Take control of your Shopware 6 experience and ensure a seamless operation!
keywords: ['Shopware 6', 'Event Logs', 'troubleshooting', 'custom event logging', 'Shopware 6 errors']
categories: [shopware6]
---

For developers and administrators working with Shopware 6, pinpointing the source of issues can be crucial. When functionalities like email delivery malfunction, identifying the root cause becomes essential for maintaining a seamless user experience. Shopware 6 offers a robust logging system, with two primary components:

1. File Logs: Located in the /var/log/ directory, these logs capture detailed information about Shopware's operation.
2. Event Logs: Accessible within the Shopware administration panel, these provide a user-friendly interface for examining system events.

This blog focuses on leveraging Event Logs to troubleshoot issues effectively.

### Finding Issue-Related Errors

* Access the Event Logs section: `Settings > System > Event Logs`.
* Utilize the search bar to filter for "email" logs.
* Focus on entries with a Priority of `Error (300)` or `Critical (400)`. These indicate potential problems with email functionality.

### Understanding Priority Levels:

* Debug (100): Valuable for in-depth debugging but less critical for everyday troubleshooting.
* Info (200): Provides general system information.
* Error (300): Indicates an error that requires investigation.
* Critical (400): Highlights a severe error demanding immediate attention.

### Examining Log Details

Clicking on the `Content` column of an error log reveals a detailed window. This window provides additional information to pinpoint the root cause of the current issue.

{% include "postImage.html" src: "./images/system-logs-1.png", alt: "System Logs filtered by email events", caption: "System Logs filtered by email events" %}

{% include "postImage.html" src: "./images/system-logs-2.png", alt: "System Logs detail window", caption: "System Logs detail window" %}


### Add Your Own Event Logs in Your Extension

Shopware 6 also allows you to log custom events within your extensions for better monitoring. Here's how:

1. Injecting the Monolog Logger:

```xml
<service id="YourExtension\Service\YourExtensionService">
  <argument type="service" id="monolog.logger.business_events"/>
</service>
```

2. Implementing the Service:

```php
use Monolog\Level;
use Monolog\Logger;

class YourExtensionService
{
    /**
     * @internal
     */
    public function __construct(
        private readonly Logger $logger
    ) {
    }

    public function doSomething(): void
    {
        // logic

        // ... add log event
        $additionalData = [];
        $logLevel = Level::Debug;  // Adjust log level as needed

        $this->logger->addRecord(
            $logLevel,
            'your_extension.do.something',
            [
                'source' => 'your_extension',
                'additionalData' => $additionalData,
            ]
        );
    }
}
```

By effectively utilizing Shopware 6's Event Logs, you can streamline troubleshooting and ensure your store functions optimally.

