# New MuMaLab Website

Based on [Clean Blog](http://startbootstrap.com/template-overviews/clean-blog/) by [Start Bootstrap](http://startbootstrap.com/), which was released under [Apache 2.0](https://github.com/IronSummitMedia/startbootstrap-clean-blog/blob/gh-pages/LICENSE) license.

## Additional libraries
* [tumblr-rss.js](https://github.com/calvinbushor/Tumblr-RSS-Client-Side-JS-Plugin)
** heavily modified to work with our template
* [ResponsiveSlides.js](https://github.com/viljamis/ResponsiveSlides.js)
* [jquery.ics](http://bitfish.eu/projects/jquery-ics/)
** fixed for multiline values in .ics files
* [FullCalendar](http://fullcalendar.io/)

## Webserver
Even though this is a static page, we have some weird-ish quirks in here that could be fixed eventually
* We proxy the tumblr json via a PHP script (``/static/blog.php``), which gets redirected via mod_redirect from ``/api/read/json`` (via ``.htaccess``)
  * This is used by the frontpage blog, and iirc did this to ensure all content is loaded via HTTPS, which it otherwise would not.
* We proxy our calendar, which comes in via google, via mod_proxy
  * Not sure if this is actually still being used.

All this requires this to be served via an Apache webserver at the moment, with PHP and the proxy, proxy_http, ssl and redirect modules enabled. The blog.php script uses the PHP extension APCu.