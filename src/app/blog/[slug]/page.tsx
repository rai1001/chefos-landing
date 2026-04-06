import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/blog"
        className="text-sm text-white/30 hover:text-resto-peach transition-colors mb-8 inline-block"
      >
        ← Volver al blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
          <span className="uppercase tracking-wider font-semibold text-resto-peach">
            {post.category}
          </span>
          <span>·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-white tracking-tight leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-white/40 text-base leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* Content */}
      <div className="prose-blog">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
            },
          }}
        />
      </div>

      {/* Share */}
      <div className="mt-12 flex items-center gap-4">
        <span className="text-sm text-white/30">Compartir:</span>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=https://chefos-landing.vercel.app/blog/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] text-sm font-medium hover:bg-[#0A66C2]/20 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=https://chefos-landing.vercel.app/blog/${slug}&text=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-white/40 text-sm font-medium hover:bg-white/[0.06] transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          X
        </a>
      </div>

      {/* CTA */}
      <div className="mt-8 p-8 rounded-2xl border border-resto-peach/20 bg-resto-peach/5 text-center">
        <p className="font-heading text-xl text-white mb-2">
          ¿Quieres automatizar la gestión de tu restaurante?
        </p>
        <p className="text-sm text-white/40 mb-6">
          RestoOs digitaliza escandallos, APPCC, inventario y compras con IA.
        </p>
        <Link
          href="/"
          className="inline-block bg-resto-peach text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Prueba RestoOs
        </Link>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-10">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-md bg-white/[0.03] text-white/30"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
