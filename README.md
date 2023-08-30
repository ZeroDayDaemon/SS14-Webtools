# SS14-Webtools
 Various javascript tools for Space Station 14
 I've changed them somewhat since I last tested them, if something doesn't work feel free to make an issue.

## ss14-server-rules.mjs
 Displays the server rules using https://github.com/ZeroDayDaemon/drawdown-ss14.
 Don't forget to add .mjs to your web server's accepted javascript mime.types

## ss14-server-status.js
 Displays the server name and player count using the json metrics from SS14.Watchdog status.
 I believe it currently requires the watchdog status to be reverse proxied to the domain that the script will run on due to browser security restrictions.