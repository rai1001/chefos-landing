import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | Blog RestoOs",
    default: "Blog — RestoOs",
  },
  description:
    "Artículos sobre gestión de restaurantes, food cost, APPCC, digitalización y tecnología para hostelería.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Navbar */}
      <header className="border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="font-heading text-2xl text-white">
            Resto<span className="text-resto-peach">Os</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/blog"
              className="text-resto-peach font-medium"
            >
              Blog
            </Link>
            <Link
              href="/"
              className="text-white/50 hover:text-white transition-colors"
            >
              Producto
            </Link>
            <Link
              href="/#pricing"
              className="bg-resto-peach text-black px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Prueba RestoOs
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-16">
        <div className="mx-auto max-w-5xl px-6 py-8 flex items-center justify-between text-sm text-white/30">
          <span>© 2026 RestoOs. Todos los derechos reservados.</span>
          <Link href="/" className="hover:text-resto-peach transition-colors">
            restoos.com
          </Link>
        </div>
      </footer>
    </div>
  );
}
