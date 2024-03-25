---
title: Working with Shopware 6 Message Queues Effectively
description: Boost your Shopware 6 store's performance! Learn how to leverage message queues for optimized background tasks, improved resource allocation, and a more robust system.
keywords: [Shopware 6, Message Queue, 'Background Tasks', 'Performance Optimization', 'Admin Worker', 'CLI Worker', 'Supervisor', 'Debugging', 'Message Queue Best Practices']
categories: [shopware6]
---

Shopware 6 leverages a message queue to handle tasks in the background, ensuring smooth operation even during demanding processes like sending emails, indexing products, or generating sitemaps. Messages are placed in the queue and processed by worker processes one at a time, freeing up the main system.

Shopware's documentation provides excellent resources to get you started. Refer to the guides on adding messages to the queue [Shopware message queue add message](https://developer.shopware.com/docs/guides/plugins/plugins/framework/message-queue/add-message-to-queue.html) and handling messages [Shopware message queue handle message](https://developer.shopware.com/docs/guides/plugins/plugins/framework/message-queue/add-message-handler.html).

This blog post dives into some practical tips for working with Message Queues in Shopware 6.

## Queue Messages

A message is a simple PHP object, but it must be serializable. Here are key points to remember:

* Avoid custom entity types: Don't use custom entity types as message properties. The consumer might encounter errors during deserialization if the entity is removed or refactored.
* Use basic data types: Stick to basic data types like `YourEntityId` for message properties.

## Message Consumers

Two mechanisms consume messages in Shopware 6:

* Admin Worker: This default worker periodically checks the `/api/_action/message-queue/consume` endpoint to fetch messages from the Administration panel. However, messages are only processed when you're logged into the Adminstration page.

* CLI Worker: This worker consumes messages via the command-line interface (CLI) using the command `bin/console messenger:consume`. This method is ideal for debugging as it offers better control. Additionally, you can leverage tools like [Supervisor](http://supervisord.org/) to automatically start the CLI worker process.

## Consumer Importance:

* Consumers are crucial for Shopware's functionality. Crashed or stopped consumers can lead to issues like outdated product prices or order statuses.

## Best Practices for CLI Workers:

* Resource Management: Free up server resources after completing tasks. Set time limits (`--time-limit=60`) and memory limits (`--memory-limit=128M`) when executing the command.

* Error Monitoring: Capture command logs in a file for easier error identification. Use the `logfile` parameter in [Supervisor's configuration](http://supervisord.org/logging.html).

* Process Uptime: Ensure the worker runs continuously. Set the `autorestart` parameter in [Supervisor's configuration](http://supervisord.org/configuration.html).
