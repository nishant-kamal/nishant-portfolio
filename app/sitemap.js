export default function sitemap() {
  const baseUrl = "https://nishantkamal.com";

  // This is a single-page application — all sections are anchor-scrolled
  // on the root page. Only the root URL is a real route.
  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
