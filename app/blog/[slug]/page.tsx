import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Import your existing components
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { MobileTableOfContents } from "@/components/mobile-toc";

// Import Author Logic
import { getAuthor, isValidAuthor } from "@/lib/authors";

import { siteConfig } from "@/lib/site";
import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    description,
    thumbnail,
    publishedAt
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = post.thumbnail
    ? urlFor(post.thumbnail).width(1200).height(630).url()
    : null;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${siteConfig.url}/blog/${slug}`,
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.thumbnail ? urlFor(post.thumbnail).url() : undefined,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: authorData?.name || post.author || "Squareblog Team",
    },
    url: `${siteConfig.url}/blog/${slug}`,
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-foreground selection:text-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HashScrollHandler />
      
      {/* Header Section */}
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                 <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-muted">
                    <Link href="/">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <time className="font-mono">{formattedDate}</time>
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string) => (
                        <Link 
                            key={tag} 
                            href={`/?tag=${tag}`}
                            className="h-8 flex items-center px-3 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                        >
                            {tag}
                        </Link>
                        ))}
                    </div>
                )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-pretty">
                {post.title}
            </h1>

            {post.description && (
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                {post.description}
                </p>
            )}

            {/* Author Section - Minimal */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                {authorData ? (
                    <div className="flex items-center gap-3">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={authorData.avatar} alt={authorData.name} className="w-10 h-10 rounded-full object-cover border border-border" />
                        <div>
                            <p className="font-semibold text-sm">{authorData.name}</p>
                            <p className="text-xs text-muted-foreground">{authorData.position}</p>
                        </div>
                    </div>
                ) : post.author ? (
                    <p className="font-mono text-sm">Written by <span className="font-bold">{post.author}</span></p>
                ) : null}
            </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
          {post.thumbnail && (
            <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden border border-border bg-muted">
              <Image
                src={urlFor(post.thumbnail).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <article className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-p:leading-loose prose-p:text-muted-foreground 
            prose-strong:text-foreground 
            prose-a:text-foreground prose-a:underline prose-a:decoration-1 prose-a:underline-offset-4 hover:prose-a:decoration-2
            prose-blockquote:border-l-4 prose-blockquote:border-foreground prose-blockquote:pl-6 prose-blockquote:italic
            prose-img:rounded-lg prose-img:border prose-img:border-border">
              <PortableText value={post.body} />
          </article>
      </main>
      
      <MobileTableOfContents />
    </div>
  );
}
