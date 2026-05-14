import type { MetadataRoute } from "next";

const siteUrl = "https://jacksonandcoil.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: Array<{
    path: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/the-team", changeFrequency: "monthly", priority: 0.8 },
    { path: "/the-method", changeFrequency: "monthly", priority: 0.7 },
    { path: "/portfolio", changeFrequency: "weekly", priority: 0.8 },
    { path: "/cuts-and-services", changeFrequency: "monthly", priority: 0.8 },
    { path: "/shop", changeFrequency: "weekly", priority: 0.7 },
    { path: "/journal", changeFrequency: "weekly", priority: 0.6 },
    { path: "/visit", changeFrequency: "yearly", priority: 0.7 },
    { path: "/booking", changeFrequency: "weekly", priority: 0.9 },
  ];

  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
