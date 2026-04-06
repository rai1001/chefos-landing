import type { Metadata } from "next";
import Link from "next/link";
import { FoodCostCalculator } from "@/components/food-cost-calculator";

export const metadata: Metadata = {
  title: "Calculadora de Food Cost Gratis | RestoOs",
  description:
    "Calcula el food cost de cualquier plato al instante. Añade ingredientes, introduce el precio de venta y obtén tu food cost, margen bruto y rentabilidad. Gratis, sin registro.",
  openGraph: {
    title: "Calculadora de Food Cost Gratis | RestoOs",
    description: "Calcula el food cost de cualquier plato al instante. Gratis, sin registro.",
    type: "website",
  },
};

export default function CalculatorPage() {
  return (
    <>
      <Link
        href="/blog"
        className="text-sm text-white/30 hover:text-resto-peach transition-colors mb-8 inline-block"
      >
        ← Volver al blog
      </Link>

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-resto-peach mb-3">
          Herramienta gratuita
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-white tracking-tight mb-3">
          Calculadora de Food Cost
        </h1>
        <p className="text-white/40 text-base leading-relaxed max-w-xl">
          Añade los ingredientes de tu plato, introduce el precio de venta y
          obtén tu food cost, margen bruto y rentabilidad al instante. Sin
          registro, sin límites.
        </p>
      </div>

      <FoodCostCalculator />

      {/* SEO content */}
      <div className="mt-16 prose-blog">
        <h2>¿Qué es el food cost?</h2>
        <p>
          El food cost es el <strong>porcentaje del precio de venta</strong> que
          se destina a la materia prima del plato. Es el indicador más
          importante para la rentabilidad de cualquier restaurante.
        </p>
        <p>
          <strong>Fórmula:</strong> Food Cost (%) = (Coste ingredientes / Precio
          de venta) × 100
        </p>

        <h2>¿Cuál es un buen food cost?</h2>
        <table>
          <thead>
            <tr>
              <th>Tipo de restaurante</th>
              <th>Food cost objetivo</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Fast casual</td><td>25-30%</td></tr>
            <tr><td>Casual dining</td><td>28-35%</td></tr>
            <tr><td>Fine dining</td><td>30-38%</td></tr>
            <tr><td>Dark kitchen</td><td>22-28%</td></tr>
          </tbody>
        </table>

        <h2>¿Necesitas automatizar tus escandallos?</h2>
        <p>
          Esta calculadora es un buen punto de partida, pero para gestionar
          decenas de recetas con precios que cambian cada semana, necesitas un
          sistema que actualice los costes automáticamente desde tus facturas.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 p-8 rounded-2xl border border-resto-peach/20 bg-resto-peach/5 text-center">
        <p className="font-heading text-xl text-white mb-2">
          ¿Quieres escandallos que se actualicen solos?
        </p>
        <p className="text-sm text-white/40 mb-6">
          RestoOs conecta tus facturas con tus recetas. El food cost se calcula en tiempo real.
        </p>
        <Link
          href="/"
          className="inline-block bg-resto-peach text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Prueba RestoOs
        </Link>
      </div>
    </>
  );
}
