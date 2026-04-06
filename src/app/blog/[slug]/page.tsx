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

      {/* CTA */}
      <div className="mt-16 p-8 rounded-2xl border border-resto-peach/20 bg-resto-peach/5 text-center">
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
