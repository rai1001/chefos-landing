import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — RestoOs",
  description:
    "Artículos sobre gestión de restaurantes, food cost, APPCC digital y tecnología para hostelería en España.",
  openGraph: {
    title: "Blog — RestoOs",
    description: "Food cost, escandallos, APPCC y todo lo que necesitas para gestionar mejor tu restaurante.",
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-resto-peach mb-3">
          Blog
        </p>
        <h1 className="font-heading text-4xl text-white tracking-tight mb-3">
          Gestión inteligente de restaurantes
        </h1>
        <p className="text-white/40 text-base leading-relaxed max-w-xl">
          Food cost, escandallos, APPCC, digitalización y todo lo que un jefe de
          cocina necesita saber para gestionar mejor su negocio.
        </p>
      </div>

      {/* Post grid */}
      {posts.length === 0 ? (
        <p className="text-white/30">Próximamente: primeros artículos en camino.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-3 text-xs text-white/30 mb-3">
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
              <h2 className="font-heading text-xl text-white group-hover:text-resto-peach transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-white/40 leading-relaxed">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/[0.03] text-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
