import { BlogCard } from "@/components/blog-card";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
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
    <div className="min-h-screen bg-background relative">
      {/* Background Grid - Kept exactly as is */}
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      <div className="p-6 border-b border-border flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              SqaureBlog
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Latest news and updates!
            </p>
          </div>
        </div>
        {allTags.length > 0 && (
          <div className="max-w-7xl mx-auto w-full">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        <Suspense fallback={<div>Loading articles...</div>}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
              filteredPosts.length < 4 ? "border-b" : "border-b-0"
            }`}
          >
            {filteredPosts.map((post) => (
              <BlogCard
                key={post._id}
                // Construct the URL structure your app expects
                url={`/blog/${post.slug.current}`}
                title={post.title}
                description={post.description}
                date={formatDate(post.publishedAt)}
                // Convert Sanity Image Object to String URL
                thumbnail={post.thumbnail ? urlFor(post.thumbnail).url() : ""}
                showRightBorder={filteredPosts.length < 3}
              />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
