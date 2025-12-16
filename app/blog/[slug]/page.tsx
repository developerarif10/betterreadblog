import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Import your existing components
import { AuthorCard } from "@/components/author-card";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { MobileTableOfContents } from "@/components/mobile-toc";
import { PromoContent } from "@/components/promo-content";

// Import Author Logic
import { getAuthor, isValidAuthor } from "@/lib/authors";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  // 1. Fetch Post
  const query = `*[_type == "post" && slug.current == $slug][0] {
    ...,
    "thumbnailUrl": thumbnail.asset->url
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) {
    return notFound();
  }

  // 2. DEFINE AUTHOR DATA (This was missing or misplaced in your code)
  // We check if the Sanity 'author' string matches a key in your authors.ts file
  const authorKey = post.author;
  const authorData =
    authorKey && isValidAuthor(authorKey) ? getAuthor(authorKey) : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background relative">
      <HashScrollHandler />
      <div className="space-y-4 border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
          <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
            <Button variant="outline" asChild className="h-6 w-6">
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back to all articles</span>
              </Link>
            </Button>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 text-muted-foreground">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <time className="font-medium text-muted-foreground">
              {formattedDate}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
              {post.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10">
        <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />
        <main className="w-full p-0 overflow-hidden">
          {post.thumbnail && (
            <div className="relative w-full h-[500px] overflow-hidden object-cover border border-transparent">
              <Image
                src={urlFor(post.thumbnail).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-6 lg:p-10">
            <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:no-underline prose-lg">
              <PortableText value={post.body} />
            </div>
          </div>

          <div className="mt-10">
            {/* If ReadMoreSection crashes, comment it out temporarily. 
                 It likely expects MDX data structure. */}
            {/* <ReadMoreSection currentSlug={[slug]} currentTags={post.tags} /> */}
          </div>
        </main>

        <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
          <div className="sticky top-20 space-y-8">
            {/* THIS IS THE PART THAT WAS CRASHING - Now fixed because authorData is defined above */}
            {authorData && <AuthorCard author={authorData} />}

            {/* Fallback if author name exists but doesn't match a file key */}
            {!authorData && post.author && (
              <div className="p-4 border rounded bg-card">
                <p className="font-bold text-sm text-muted-foreground">
                  Written by {post.author}
                </p>
              </div>
            )}

            <PromoContent variant="desktop" />
          </div>
        </aside>
      </div>

      <MobileTableOfContents />
    </div>
  );
}
