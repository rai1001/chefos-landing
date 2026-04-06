"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Iconos SVG 100% nativos para máxima seguridad y rendimiento
const IconAI = () => (
  <svg className="w-6 h-6 text-[#FF7A00]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
);

const IconShield = () => (
  <svg className="w-6 h-6 text-resto-peach" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);

const IconBox = () => (
  <svg className="w-6 h-6 text-resto-peach" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
);

export function FeaturesBento() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate Clara block
    gsap.fromTo(".bento-clara-header", 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".bento-clara-header",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".bento-clara-box", 
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".bento-clara-header",
          start: "top 80%",
        }
      }
    );

    // Animate 6 Motores block
    gsap.fromTo(".bento-motores-header", 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".bento-motores-header",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".bento-motor-card", 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".bento-motores-grid",
          start: "top 80%",
        }
      }
    );

    // Animate 360 Hub block
    gsap.fromTo(".bento-360-hub", 
      { opacity: 0, scale: 0.98, y: 60 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: ".bento-360-hub",
          start: "top 85%",
        }
      }
    );

  }, { scope: container });

  return (
    <section ref={container} className="py-24 px-4 relative z-10 w-full flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full space-y-32">
        
        {/* BLOQUE 1: Conoce a CLARA (La joya de la corona) */}
        <div className="w-full">
          <div className="bento-clara-header text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-resto-peach uppercase mb-3">Administrativa Autónoma</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              Conoce a tu Agente. <br className="hidden md:block"/>Administrativo Autónomo.
            </h3>
            <p className="mt-6 text-xl text-neutral-400 max-w-2xl mx-auto font-sans font-light">
              Dedicada 100% al trabajo administrativo. No es un OCR glorificado, es una analista incansable que gestiona tus compras usando Gemini Vision.
            </p>
          </div>

          <div className="bento-clara-box bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-resto-peach/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-resto-peach/10 transition-all duration-700"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-mono text-neutral-300">Agente Administrativo activo en background</span>
                </div>
                
                <ul className="space-y-6">
                  {Object.entries([
                    "Ingesta automática de facturas por email con validación de NIF",
                    "Reconciliación IA (Factura vs Albarán) con tolerancias personalizadas",
                    "Detección milimétrica de discrepancias en precios, cantidades y duplicados",
                    "Redacción y envío de emails profesionales de reclamación a proveedores"
                  ]).map(([i, feat]) => (
                    <li key={i} className="flex items-start space-x-4">
                      <div className="mt-1 bg-resto-peach/10 p-2 rounded-full border border-resto-peach/20">
                        <svg className="w-4 h-4 text-resto-peach" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-neutral-300 font-sans">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-neutral-400 shadow-2xl">
                <div className="flex border-b border-white/10 pb-4 mb-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="space-y-3">
                  <p><span className="text-blue-400">INFO</span>: Inbox escaneado (1 factura nueva)</p>
                  <p><span className="text-purple-400">AGENTE</span>: Extrayendo líneas con Gemini Vision...</p>
                  <p><span className="text-purple-400">AGENTE</span>: Comparando albarán #882... <span className="text-green-400">MATCH!</span></p>
                  <p><span className="text-yellow-400">WARN</span>: Discrepancia del +3% en Tomate Raf.</p>
                  <p><span className="text-purple-400">AGENTE</span>: Redactando email de reclamación automático a Frutas Pepe SL...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 2: El Cerebro (Los 6 Motores y Agentes) */}
        <div className="w-full">
          <div className="bento-motores-header text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-serif text-white">6 Motores de Predicción.</h3>
            <p className="mt-4 text-xl text-neutral-400 max-w-2xl mx-auto font-sans">
              La arquitectura de RestoOS prescinde del cálculo humano. Todo escala, todo se anticipa.
            </p>
          </div>

          <div className="bento-motores-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Demand & Forecast Engine", desc: "Predice la demanda por producto usando patrones diarios, estacionalidad, clima y reservas.", icon: <IconAI /> },
              { title: "Margin Engine", desc: "Cálculo en vivo de Food Cost, margen bruto y generación automática de la Matriz de Boston.", icon: <IconBox /> },
              { title: "Cost & Scaling Engine", desc: "Control de escandallos y sub-recetas. Escala cantidades y raciones detectando alérgenos y mermas.", icon: <IconShield /> },
              { title: "Procurement Engine", desc: "Toma el stock vivo y demanda proyectada para sugerirte exactamente qué comprar a qué proveedor.", icon: <IconBox /> },
              { title: "Agente de Escandallo", desc: "Recalcula automáticamente el coste por ración en toda la carta el micro-segundo que cambia un precio.", icon: <IconAI /> },
              { title: "Agente APPCC", desc: "Cierre diario automático. Valida firmas SHA-256 en registros de frío y dispara alertas de anomalías.", icon: <IconShield /> },
            ].map((engine, i) => (
              <div key={i} className="bento-motor-card bg-[#0A0A0A] backdrop-blur-md border border-white/5 hover:border-resto-peach/30 transition-colors duration-500 rounded-2xl p-8 group">
                <div className="mb-4 bg-white/5 inline-block p-3 rounded-xl group-hover:bg-resto-peach/10 transition-colors">
                  {engine.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2 font-sans">{engine.title}</h4>
                <p className="text-neutral-400 leading-relaxed text-sm font-sans">{engine.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BLOQUE 3: 360 Operation Hub (Módulos) */}
        <div className="bento-360-hub w-full bg-gradient-to-b from-[#0A0A0A] to-[#050505] rounded-[40px] border border-white/5 p-8 md:p-16">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-serif text-white">Un 360 Operativo Absoluto.</h3>
            <p className="mt-4 text-xl text-neutral-400 font-sans">11 módulos nativos que absorben todas tus suscripciones actuales.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
            
            <div className="space-y-12">
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-white flex items-center"><span className="text-resto-peach mr-3 font-serif italic">01.</span> Multilocal & Control</h4>
                <p className="text-neutral-400 font-sans text-sm">Dashboard con KPIs en vivo, vistas holísticas de toda tu cadena de restaurantes, alertas personalizadas y un Briefing Diario redactado por IA para los directores.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-white flex items-center"><span className="text-resto-peach mr-3 font-serif italic">02.</span> Compras & Stock FIFO</h4>
                <p className="text-neutral-400 font-sans text-sm">Validación línea a línea al recibir mercancía. Trazabilidad FIFO estricta. Movimientos de merma o traspasos con niveles de stock hiperrealistas por local.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-white flex items-center"><span className="text-resto-peach mr-3 font-serif italic">03.</span> Etiquetado Inteligente</h4>
                <p className="text-neutral-400 font-sans text-sm">Creación de lotes de producción y envasados al vacío con impresión térmica directa. Alertas de caducidad en el horizonte y mapa de alérgenos por código QR.</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="bg-[#111] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-resto-peach/10 rounded-full blur-2xl"></div>
                <h4 className="text-xl font-bold text-white mb-4">La Bóveda Legal (Inmutable)</h4>
                <p className="text-neutral-400 font-sans text-sm mb-4">
                  Archivo inmutable *Append-Only* diseñado para la máxima seguridad ante auditorías sanitarias y de Hacienda.
                </p>
                <ul className="space-y-2 text-sm text-neutral-500 font-mono">
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Facturas Legales</span> <span className="text-green-500">Retención 4 Años</span></li>
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Registros APPCC</span> <span className="text-green-500">Retención 2 Años</span></li>
                  <li className="flex justify-between"><span>Integridad de Datos</span> <span className="text-white">Hash SHA-256</span></li>
                </ul>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-white mb-4">Arquitectura Enterprise-Grade</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-white/5 rounded-lg p-3 text-center">
                    <span className="block text-2xl font-serif text-resto-peach italic">9</span>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">Roles Multi-Tenant</span>
                  </div>
                  <div className="border border-white/5 rounded-lg p-3 text-center">
                    <span className="block text-2xl font-serif text-resto-peach italic">15+</span>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">Niveles RLS (Auth)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

