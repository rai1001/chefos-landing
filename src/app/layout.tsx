import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { BackgroundPaperShaders } from "@/components/background-paper-shaders";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Marketing & SEO Metadata (G-Stack standard)
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://restoos.com"),
  title: {
    default: "RestoOs | Inteligencia Artificial para HORECA",
    template: "%s | RestoOs"
  },
  description: "Automatiza tu servicio sin perder el trato humano. RestoOs es el SaaS integral que transforma la operativa de tu restaurante u hotel con IA.",
  keywords: ["SaaS Horeca", "IA para restaurantes", "Gestión hotelera", "TPV inteligente", "Automatización Horeca"],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    title: "RestoOs | IA para la Hostelería del Futuro",
    description: "Transforma la operativa de tu restaurante u hotel. Menos fricción, más reseñas positivas y mayores ventas en automático.",
    siteName: "RestoOs",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "RestoOs Dashboard Preview"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RestoOs | IA para HORECA",
    description: "Automatiza tu servicio sin perder el trato humano.",
    creator: "@RestoOsApp",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for Rich Snippets in Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "RestoOs",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "Software integral SaaS con Inteligencia artificial para la gestión y automatización en el sector HORECA.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  };

  return (
    <html lang="es" className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        {/* Marcado JSON-LD inyectado para Marketing Estructurado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
      </head>
      <body className="h-full bg-[#050505] selection:bg-[#FF7A00] selection:text-white">
        <BackgroundPaperShaders 
          className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
          color="rgba(128, 128, 128, 0.3)" 
          sizing="cover"
          animation={{ scale: 60, speed: 40 }}
          noise={{ opacity: 0.6, scale: 1 }}
        />
        <div className="relative z-0 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
