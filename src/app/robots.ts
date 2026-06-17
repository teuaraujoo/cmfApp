import type { MetadataRoute } from "next";

const appOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/legal/termos", "/legal/politica-privacidade"],
      disallow: [
        "/api/",
        "/dashboard/",
        "/login",
        "/choose-login",
        "/change-password",
        "/portal",
      ],
    },
    sitemap: `${appOrigin}/sitemap.xml`,
    host: appOrigin,
  };
}
