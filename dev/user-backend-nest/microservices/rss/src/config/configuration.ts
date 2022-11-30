export default () => ({
  rssUrl: process.env.RSS_SERVICE_FEED_URL,
  allowedHtmlTags: process.env.RSS_SERVICE_ALLOWED_HTML_TAGS
    ? process.env.RSS_SERVICE_ALLOWED_HTML_TAGS.split(',')
    : [],
});
