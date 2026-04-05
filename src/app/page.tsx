import { FeaturesBento } from "@/components/features-bento";
import { PricingSection } from "@/components/pricing-section";
import { LeadCaptureMultiStep } from "@/components/lead-capture-multi-step";
import { VideoDemoCard } from "@/components/video-demo-card";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-white flex flex-col font-sans selection:bg-[#FF7A00] selection:text-white">
      
      <div className="relative w-full min-h-screen flex flex-col">
        {/* Navbar Overlay */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF7A00] to-[#FF3300]" />
            <span className="text-2xl font-bold tracking-tight text-white">RestoOs</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-300">
            <Link href="#" className="hover:text-white transition-colors">Producto</Link>
            <Link href="#" className="hover:text-white transition-colors">Funcionalidades</Link>
            <Link href="#precios" className="hover:text-white transition-colors">Precios</Link>
          </div>
          <button className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-sm font-semibold shadow-xl transition-all text-white">
            Iniciar Sesión
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-20 px-4 pb-24">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-sm font-semibold mb-8 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[#FF7A00] animate-pulse"></span>
            Inteligencia Artificial para HORECA
          </div>

          {/* Headlines */}
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-center tracking-tight max-w-4xl leading-[1.1] mb-6 text-white drop-shadow-2xl">
            Automatiza tu servicio sin perder <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF3300]">el trato humano</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 font-medium text-center max-w-2xl mb-10 drop-shadow-md">
            El SaaS integral que elimina el caos operativo de tu restaurante. Control total de costes, compras, stock y cumplimiento normativo, todo en un único lugar.
          </p>

          {/* Lead Capture Form Sector */}
          <div className="w-full max-w-lg mb-20 z-20">
            <LeadCaptureMultiStep />
          </div>

          {/* Video Demos Grid (Placeholder until URLs are ready) */}
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 z-20">
            <VideoDemoCard 
              title="Demo de la Plataforma RestoOs" 
              description="Mira el interior del ecosistema RestoOs, el módulo de operaciones, compras e inteligencia de negocio."
            />
            <VideoDemoCard 
              title="Demo de Agente CLARA" 
              description="Aprende cómo CLARA atiende el teléfono, chatea por WhatsApp y gestiona el libro de reservas digital de forma autónoma."
            />
          </div>
        </div>
      </div>

      <FeaturesBento />
      <PricingSection />

    </main>
  );
}
