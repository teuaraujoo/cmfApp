import type { MetadataRoute } from "next";

const appOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: appOrigin,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${appOrigin}/legal/termos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${appOrigin}/legal/politica-privacidade`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
