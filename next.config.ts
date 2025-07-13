import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  htmlLimitedBots: /Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview/i,

  metadata: {
    enableStreaming: false,
  },
};

export default nextConfig;
