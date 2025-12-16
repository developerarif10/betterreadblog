
import { client } from "@/lib/sanity";
import { siteConfig } from "@/lib/site";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const query = `*[_type == "post"] { slug, publishedAt }`;
  const posts = await client.fetch(query);

  const blogRoutes = posts.map((post: any) => ({
    url: `${siteConfig.url}/blog/${post.slug.current}`,
    lastModified: post.publishedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    {
      url: siteConfig.url,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  return [...staticRoutes, ...blogRoutes];
}
