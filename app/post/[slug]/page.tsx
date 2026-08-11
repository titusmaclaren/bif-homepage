import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostLayout } from "../../components/BlogPostLayout";
import { getAllPosts, getPostBySlug } from "../../lib/blog";
import { SITE_NAME, absoluteUrl } from "../../lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const canonicalUrl = absoluteUrl(post.urlPath);
  const thumbnailUrl = absoluteUrl(post.thumbnail);

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_AU",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [thumbnailUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = absoluteUrl(post.urlPath);
  const thumbnailUrl = absoluteUrl(post.thumbnail);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: [thumbnailUrl],
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      "@type": "Organization",
      name: post.author,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/bif-logo-icon.png"),
        width: 180,
        height: 180,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <BlogPostLayout post={post} />
    </>
  );
}
