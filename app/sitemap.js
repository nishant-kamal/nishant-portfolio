export default function sitemap() {
  const baseUrl = "https://nishantkamal.com";

  const routes = ["", "/projects", "/about", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
