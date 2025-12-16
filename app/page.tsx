import { BlogCard } from "@/components/blog-card";
import { About } from "@/components/landing/about";
import { Categories } from "@/components/landing/categories";
import { Hero } from "@/components/landing/hero";
import { TagFilter } from "@/components/tag-filter";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/urlFor"; // Import the helper we just made
import { Suspense } from "react";

// 1. Define the Interface based on Sanity response
interface SanityBlog {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  publishedAt: string;
  tags?: string[];
  thumbnail?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

// 2. Helper to format date
const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// 3. Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const selectedTag = resolvedSearchParams.tag || "All";

  // 4. GROQ Query - Fetch everything we need for the cards
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    publishedAt,
    tags,
    thumbnail
  }`;

  const posts: SanityBlog[] = await client.fetch(query);

  // 5. Logic to handle Tags (Ported from your old code)
  const allTags = [
    "All",
    ...Array.from(new Set(posts.flatMap((post) => post.tags || []))).sort(),
  ];

  // Filter posts based on tag
  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter((post) => post.tags?.includes(selectedTag));

  // Calculate tag counts
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      if (tag === "All") {
        acc[tag] = posts.length;
      } else {
        acc[tag] = posts.filter((post) => post.tags?.includes(tag)).length;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="min-h-screen bg-background relative selection:bg-foreground selection:text-background">
      <Hero />
      <About />
      <Categories />

      <section id="latest" className="py-24 border-t border-border">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">Latest Writings</h2>
                {allTags.length > 0 && (
                 <div className="w-full md:w-auto">
                    <TagFilter
                    tags={allTags}
                    selectedTag={selectedTag}
                    tagCounts={tagCounts}
                    />
                 </div>
                )}
            </div>

            <Suspense fallback={<div>Loading articles...</div>}>
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-t border-border ${
                filteredPosts.length < 4 ? "border-b" : "border-b-0"
                }`}
            >
                {filteredPosts.map((post) => (
                <BlogCard
                    key={post._id}
                    url={`/blog/${post.slug.current}`}
                    title={post.title}
                    description={post.description}
                    date={formatDate(post.publishedAt)}
                    thumbnail={post.thumbnail ? urlFor(post.thumbnail).url() : ""}
                    showRightBorder={filteredPosts.length < 3}
                />
                ))}
            </div>
            </Suspense>
          </div>
      </section>
    </div>
  );
}
