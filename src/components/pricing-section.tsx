"use client";

import React, { useState } from 'react';

const CheckIcon = () => (
  <svg className="w-4 h-4 text-[#FF7A00] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-4 h-4 text-white/20 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  target: string;
  badge?: string;
  highlighted?: boolean;
  features: PlanFeature[];
  cta: string;
  ctaNote?: string;
}

const plans: Plan[] = [
  {
    id: 'control',
    name: 'Control',
    tagline: 'Orden y control operativo real.',
    monthlyPrice: 99,
    annualPrice: 89,
    target: 'Restaurante independiente, 1 local',
    features: [
      { text: 'Dashboard con KPIs en tiempo real', included: true },
      { text: 'Recetas, escandallos automáticos y merma', included: true },
      { text: 'Catálogo de productos y proveedores', included: true },
      { text: 'Pedidos a proveedor y recepción de mercancía', included: true },
      { text: 'Inventario y movimientos de stock', included: true },
      { text: 'Alertas básicas configurables', included: true },
      { text: 'Soporte estándar', included: true },
      { text: 'Multi-local', included: false },
      { text: 'Forecast y Demand Engine', included: false },
      { text: 'Ingeniería de Menú (Matriz Boston)', included: false },
      { text: 'CLARA (Agente IA de Facturación)', included: false },
      { text: 'APPCC y Bóveda Legal', included: false },
    ],
    cta: 'Empezar con Control',
    ctaNote: 'Onboarding desde 300 €',
  },
  {
    id: 'operaciones',
    name: 'Operaciones',
    tagline: 'No solo control. Margen real.',
    monthlyPrice: 149,
    annualPrice: 129,
    target: 'Operadores Premium / Grupos pequeños',
    badge: 'MOST POPULAR',
    highlighted: true,
    features: [
      { text: 'Todo lo incluido en Control', included: true },
      { text: 'Ingeniería de Menú y Matriz de Boston', included: true },
      { text: 'Demand Engine + Forecast Engine', included: true },
      { text: 'Procurement Engine (sugerencias de compra IA)', included: true },
      { text: 'Alertas avanzadas y aprobaciones', included: true },
      { text: 'Bóveda documental básica', included: true },
      { text: 'CLARA Lite — 50 docs OCR/mes', included: true },
      { text: 'Hasta 3 integraciones', included: true },
      { text: 'Onboarding asistido', included: true },
      { text: 'Vista multi-local corporativa', included: false },
      { text: 'Compliance Pack (APPCC, Lotes, Etiquetado)', included: false },
      { text: 'API + SSO / 2FA', included: false },
    ],
    cta: 'Empezar con Operaciones',
    ctaNote: 'Onboarding desde 600 €',
  },
  {
    id: 'grupo',
    name: 'Grupo',
    tagline: 'Control central. Trazabilidad total.',
    monthlyPrice: 249,
    annualPrice: 219,
    target: 'Multi-local 3+ / Cadenas en crecimiento',
    features: [
      { text: 'Todo lo incluido en Operaciones', included: true },
      { text: 'Vista multi-local con benchmarking', included: true },
      { text: 'Catálogos y precios por ubicación', included: true },
      { text: 'Permisos y gobierno avanzados (9 roles)', included: true },
      { text: 'Compliance Pack incluido (APPCC, Lotes, Etiquetado)', included: true },
      { text: 'Bóveda legal inmutable — Hash SHA-256', included: true },
      { text: 'Retención legal automática (4 años facturas)', included: true },
      { text: 'CLARA Pro — 300 docs OCR/mes', included: true },
      { text: 'API abierta + SSO / 2FA', included: true },
      { text: 'Soporte prioritario', included: true },
    ],
    cta: 'Empezar con Grupo',
    ctaNote: 'Onboarding desde 1.500 €',
  },
];

const addons = [
  {
    name: 'Compliance Pack',
    price: '59 €',
    unit: '/local/mes',
    desc: 'APPCC completo, lotes, etiquetado, alertas de alérgenos, bóveda legal inmutable. Disponible para los planes Control y Operaciones. Incluido en Grupo.',
    icon: '🛡️',
  },
  {
    name: 'Pack Reservas & Clientes',
    price: '79 €',
    unit: '/local/mes',
    desc: 'Calendario de reservas, base de datos de clientes, mesas, turnos y tracking de ventas por reserva.',
    icon: '📅',
  },
  {
    name: 'Producción Central',
    price: '149 €',
    unit: '/central/mes',
    desc: 'Para obradores y dark kitchens. Planificación central, lotes de producción, escalado avanzado y trazabilidad compleja.',
    icon: '🏭',
  },
  {
    name: 'AutoChef',
    price: '79 €',
    unit: '/mes',
    desc: 'Agente de comunicación IA. Gestión de no-shows por WhatsApp, confirmaciones automáticas y rescate de sala en tiempo real.',
    icon: '🤖',
  },
  {
    name: 'Docs OCR Extra',
    price: '25 €',
    unit: '/100 docs',
    desc: 'Para cuentas con alto volumen de facturas. Amplía tu cuota mensual de documentos procesados por CLARA sin cambiar de plan.',
    icon: '📄',
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="precios" className="py-32 px-4 relative z-10 w-full flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full space-y-24">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-[#FF7A00] uppercase mb-4">Precios Transparentes</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
            Sin trampas. Sin letra pequeña.<br className="hidden md:block" />
            Sin sorpresas.
          </h2>
          <p className="mt-6 text-xl text-neutral-400 max-w-2xl mx-auto font-sans font-light">
            Precio por local, no por usuario. Cuanto más creces, más rentable es.
          </p>

          {/* Toggle mensual / anual */}
          <div className="mt-10 inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-full p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${!annual ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${annual ? 'bg-[#FF7A00] text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              Anual <span className="ml-1 opacity-80">— 10% dto.</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl border flex flex-col overflow-hidden transition-all duration-300 
                ${plan.highlighted
                  ? 'border-[#FF7A00]/60 bg-[#FF7A00]/5 shadow-[0_0_80px_rgba(255,122,0,0.12)] scale-[1.02]'
                  : 'border-white/5 bg-[#111111]/60 hover:border-white/10'
                } backdrop-blur-xl`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                  <span className="inline-block bg-[#FF7A00] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-b-xl">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white font-sans">{plan.name}</h3>
                  <p className="text-[#FF7A00] font-medium text-sm mt-1">{plan.tagline}</p>
                  <p className="text-neutral-500 text-xs mt-1 font-sans">{plan.target}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold text-white font-sans">
                      {annual ? plan.annualPrice : plan.monthlyPrice}€
                    </span>
                    <span className="text-neutral-400 text-sm mb-2 font-sans">/local/mes</span>
                  </div>
                  {annual && (
                    <p className="text-green-500 text-xs mt-1 font-sans">Facturado anualmente · Ahorras {((plan.monthlyPrice! - plan.annualPrice!) * 12)}€/año</p>
                  )}
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feat.included ? <CheckIcon /> : <CrossIcon />}
                      <span className={`text-sm font-sans ${feat.included ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <button
                    className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all duration-200
                      ${plan.highlighted
                        ? 'bg-[#FF7A00] hover:bg-[#e86e00] text-white shadow-[0_0_30px_rgba(255,122,0,0.25)] hover:shadow-[0_0_40px_rgba(255,122,0,0.4)]'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                      }`}
                  >
                    {plan.cta}
                  </button>
                  {plan.ctaNote && (
                    <p className="text-center text-neutral-500 text-xs font-sans">{plan.ctaNote}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Banner */}
        <div className="w-full border border-white/10 rounded-3xl bg-white/[0.02] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral-500 mb-3">
              <span className="block w-4 h-px bg-neutral-500"></span> Enterprise
            </div>
            <h3 className="text-3xl font-serif text-white mb-2">Para cadenas, central kitchens y despliegues complejos.</h3>
            <p className="text-neutral-400 font-sans max-w-xl">Integraciones custom, migración de datos, SLA dedicado, CSM asignado y condiciones de volumen. Precio adaptado a la operativa real de tu negocio.</p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="mailto:hola@restoOS.app"
              className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-neutral-100 transition-colors text-sm whitespace-nowrap"
            >
              Habla con ventas
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>

        {/* 🚨 FOUNDING PARTNER BLOCK */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-[#FF7A00]/40">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/10 via-transparent to-[#FF3300]/5 pointer-events-none" />
          <div className="absolute top-4 right-4">
            <span className="inline-block bg-[#FF7A00]/20 text-[#FF7A00] text-[11px] font-bold tracking-widest uppercase border border-[#FF7A00]/30 px-3 py-1 rounded-full">
              Plazas Limitadas
            </span>
          </div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse"></div>
                <span className="text-[#FF7A00] text-sm font-bold tracking-wider uppercase font-sans">Founding Partner — Solo 10 Plazas</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">
                Plan Operaciones a <span className="text-[#FF7A00]">119€</span>/local/mes.
              </h3>
              <p className="text-neutral-400 font-sans mb-4">
                Para los 10 primeros restaurantes que confíen en RestoOS. Precio bloqueado durante 12 meses. Acceso anticipado a nuevas funcionalidades. Tu feedback construirá el producto.
              </p>
              <ul className="space-y-2 text-sm text-neutral-300 font-sans">
                <li className="flex items-center gap-2"><CheckIcon /><span>Plan Operaciones completo (valor 149 €/mes)</span></li>
                <li className="flex items-center gap-2"><CheckIcon /><span>Precio bloqueado 12 meses — sin sorpresas</span></li>
                <li className="flex items-center gap-2"><CheckIcon /><span>Onboarding personal con el equipo fundador</span></li>
                <li className="flex items-center gap-2"><CheckIcon /><span>Acceso beta a CLARA y nuevos módulos</span></li>
              </ul>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="text-5xl font-bold text-white mb-1 font-sans">119€</div>
              <div className="text-neutral-500 text-sm mb-6 font-sans">/local/mes · x12 meses</div>
              <a
                href="mailto:hola@restoOS.app?subject=Founding Partner RestoOS"
                className="inline-block bg-[#FF7A00] hover:bg-[#e86e00] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-[0_0_40px_rgba(255,122,0,0.3)] hover:shadow-[0_0_60px_rgba(255,122,0,0.5)] text-sm"
              >
                Reservar Plaza →
              </a>
              <p className="text-neutral-500 text-xs mt-3 font-sans">Sin permanencia forzada</p>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-serif text-white">Amplía cuando lo necesites.</h3>
            <p className="mt-3 text-neutral-400 font-sans">Add-ons opcionales. No pagas por lo que no usas.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((addon, i) => (
              <div key={i} className="bg-[#111]/60 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-colors duration-300 backdrop-blur-sm">
                <div className="text-2xl mb-3">{addon.icon}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-white font-sans">{addon.price}</span>
                  <span className="text-neutral-500 text-xs font-sans">{addon.unit}</span>
                </div>
                <h4 className="text-white font-bold mb-2 font-sans">{addon.name}</h4>
                <p className="text-neutral-500 text-sm font-sans leading-relaxed">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Onboarding visible */}
        <div className="w-full border border-white/5 rounded-3xl bg-white/[0.01] p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">Onboarding de pago. Sin letra pequeña.</h3>
            <p className="text-neutral-400 font-sans max-w-xl mx-auto text-sm">
              RestoOS requiere configuración, carga de datos, formación y adopción operativa. El onboarding garantiza que tu equipo arranca con el máximo rendimiento desde el primer día.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { plan: 'Control', price: '300€', desc: 'Configuración guiada y formación básica.' },
              { plan: 'Operaciones', price: '600€', desc: 'Carga de datos, recetas e integración de proveedores.' },
              { plan: 'Grupo', price: 'Desde 1.500€', desc: 'Rollout multi-local, roles y migración de datos.' },
              { plan: 'Enterprise', price: 'Custom', desc: 'Proyecto de implantación a medida con CSM.' },
            ].map((item, i) => (
              <div key={i} className="border border-white/5 rounded-2xl p-5 text-center bg-white/[0.02]">
                <p className="text-[#FF7A00] text-xs font-bold uppercase tracking-wider mb-2 font-sans">{item.plan}</p>
                <p className="text-2xl font-bold text-white mb-2 font-sans">{item.price}</p>
                <p className="text-neutral-500 text-xs font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
