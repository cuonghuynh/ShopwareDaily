---
title: "Frosh Tools: A Must-Have for Shopware 6 Administrators"
description: "Frosh Tools simplifies Shopware 6 administration with system checks, cache management, and log viewers. A valuable plugin for any Shopware 6 admin."
keywords: ['Shopware 6 Plugin', 'Frosh Tools', 'Shopware 6 Management', 'Shopware 6 Administration Tools']
categories: [shopware6, shopware6-plugin]
---

Running a Shopware 6 store requires constant attention. From system health to background tasks and logs, there's a lot to keep an eye on. That's where [Frosh Tools](https://github.com/FriendsOfShopware/FroshTools) comes in - a free plugin offering a suite of essential functionalities to manage your Shopware 6 shop with ease:

- **System Status**: Gain a quick overview of your Shopware 6 environment. Frosh Tools checks your PHP version, MySQL health, and even the queue system's functionality. It also identifies potential performance optimizations and provides helpful documentation links to address them.

{% include "postImage.html" src: "./images/system_status.png", alt: "Settings > Extensions > Frosh Tools > System Status", caption: "Settings > Extensions > Frosh Tools > System Status" %}

- **Cache Management**: Frosh Tools takes the reins on your Shopware 6 cache. View details of the App and Http caches, along with all folders within the var/cache directory. Need to clear specific caches? Frosh Tools lets you do that with a click. Additionally, compiling your theme is a breeze with this plugin.

{% include "postImage.html" src: "./images/cache.png", alt: "Settings > Extensions > Frosh Tools > Cache", caption: "Settings > Extensions > Frosh Tools > Cache" %}

- **Scheduled Task Management**:  Ever wondered what background tasks are running in your Shopware 6 store? Frosh Tools provides a complete view of all scheduled tasks. You can even execute a specific task, edit its execution interval, and register entirely new tasks.

{% include "postImage.html" src: "./images/scheduled_task_manager.png", alt: "Settings > Extensions > Frosh Tools > Scheduled Task Manager", caption: "Settings > Extensions > Frosh Tools > Scheduled Task Manager" %}

- **Queue Management**:  Frosh Tools keeps you informed about the queue system, displaying the number of messages waiting to be processed. Need a fresh start? The reset queue function lets you clear the backlog and ensure smooth operation.

{% include "postImage.html" src: "./images/queue_manager.png", alt: "Settings > Extensions > Frosh Tools > Queue Manager", caption: "Settings > Extensions > Frosh Tools > Queue Manager" %}

- **Log Viewer**:  Troubleshooting issues often involves digging through logs. Frosh Tools simplifies this by displaying entries from all log files within the /var/log/*.log directory.

{% include "postImage.html" src: "./images/log_viewer.png", alt: "Settings > Extensions > Frosh Tools > Log Viewer", caption: "Settings > Extensions > Frosh Tools > Log Viewer" %}

- **Task Logging**:  Gain deeper insights into scheduled task execution with task logging. Enable it by setting the FROSH_TOOLS_TASK_LOGGING=1 environment variable. You can even configure it to log all tasks by setting FROSH_TOOLS_TASK_LOGGING_INFO=1.

- **Shopware File Checker**:  Maintaining core Shopware 6 files is crucial. Frosh Tools acts as a watchdog, checking for any modifications to these core files, ensuring your installation's integrity.

{% include "postImage.html" src: "./images/file_checker.png", alt: "Settings > Extensions > Frosh Tools > Shopware File Checker", caption: "Settings > Extensions > Frosh Tools > Shopware File Checker" %}

- **State Machine Visualization**:  Understanding the order processing workflow, transactions, and deliveries can be complex. Frosh Tools offers a basic visualization of these state machines, providing a clearer picture of these crucial processes.

{% include "postImage.html" src: "./images/state_machine_viewer.png", alt: "Settings > Extensions > Frosh Tools > State Machine Viewer", caption: "Settings > Extensions > Frosh Tools > State Machine Viewer" %}

### Plugin commands

- Listing of all environment variables
```bash
bin/console frosh:env:list
```

- Set environment variables
```bash
bin/console frosh:env:set VARIABLE VALUE
```

- Get environment variables
```bash
bin/console frosh:env:get APP_URL
http://localhost
```

- Monitor your scheduled tasks and queue with this command and get notified via email.
```bash
bin/console frosh:monitor <sales-channel-id>
```

You can learn more about this package, get full installation instructions, and view the [source code](https://github.com/FriendsOfShopware/FroshTools) on GitHub.



