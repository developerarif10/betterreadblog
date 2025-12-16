import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/urlFor";
import Link from "next/link";

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface SanityPost {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
  publishedAt: string;
  tags?: string[];
  thumbnail?: object;
  author?: { name: string };
}

interface ReadMoreSectionProps {
  currentSlug: string;
  currentTags?: string[];
}

export async function ReadMoreSection({
  currentSlug,
  currentTags = [],
}: ReadMoreSectionProps) {
  // Fetch related posts from Sanity
  const query = `*[_type == "post" && slug.current != $currentSlug][0...3]{
    _id,
    title,
    description,
    slug,
    publishedAt,
    tags,
    thumbnail,
    author->{name}
  }`;

  const relatedPosts = await client.fetch<SanityPost[]>(query, {
    currentSlug,
  });

  // Filter and sort by relevance
  const sortedPosts = relatedPosts
    .map((post) => {
      const tagOverlap = currentTags.filter((tag) =>
        post.tags?.includes(tag)
      ).length;

      return {
        ...post,
        relevanceScore: tagOverlap,
        date: new Date(post.publishedAt),
      };
    })
    .sort((a, b) => {
      if (a.relevanceScore !== b.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return b.date.getTime() - a.date.getTime();
    })
    .slice(0, 3);

  if (sortedPosts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border p-0">
      <div className="p-6 lg:p-10">
        <h2 className="text-2xl font-medium mb-8">Read more</h2>

        <div className="flex flex-col gap-8">
          {sortedPosts.map((post) => {
            const formattedDate = formatDate(post.publishedAt);
            const thumbnailUrl = post.thumbnail
              ? urlFor(post.thumbnail).url()
              : null;

            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group grid grid-cols-1 lg:grid-cols-12 items-center gap-4 cursor-pointer"
              >
                {thumbnailUrl && (
                  <div className="flex-shrink-0 col-span-1 lg:col-span-4">
                    <div className="relative w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbnailUrl}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2 flex-1 col-span-1 lg:col-span-8">
                  <h3 className="text-lg group-hover:underline underline-offset-4 font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 group-hover:underline underline-offset-4">
                    {post.description}
                  </p>
                  <time className="block text-xs font-medium text-muted-foreground">
                    {formattedDate}
                  </time>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
