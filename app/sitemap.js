export default function sitemap() {
  const baseUrl = "https://nishantkamal.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      // Change frequency "monthly" is often better for a portfolio to 
      // reduce unnecessary crawl budget usage unless you update weekly.
      changeFrequency: "monthly", 
      priority: 1,
    },
  ];
}
