"use client";

import { useState } from "react";

interface Ingredient {
  name: string;
  cost: string;
  quantity: string;
}

export function FoodCostCalculator() {
  const [salePrice, setSalePrice] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", cost: "", quantity: "1" },
  ]);

  const totalCost = ingredients.reduce((sum, ing) => {
    const cost = parseFloat(ing.cost) || 0;
    const qty = parseFloat(ing.quantity) || 0;
    return sum + cost * qty;
  }, 0);

  const price = parseFloat(salePrice) || 0;
  const foodCostPct = price > 0 ? (totalCost / price) * 100 : 0;
  const margin = price - totalCost;
  const marginPct = price > 0 ? (margin / price) * 100 : 0;

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", cost: "", quantity: "1" }]);
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const getHealthColor = () => {
    if (foodCostPct === 0) return "text-white/30";
    if (foodCostPct <= 30) return "text-emerald-400";
    if (foodCostPct <= 35) return "text-amber-400";
    return "text-red-400";
  };

  const getHealthLabel = () => {
    if (foodCostPct === 0) return "Introduce datos";
    if (foodCostPct <= 25) return "Excelente";
    if (foodCostPct <= 30) return "Saludable";
    if (foodCostPct <= 35) return "Ajustado";
    if (foodCostPct <= 40) return "Peligroso";
    return "Insostenible";
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8">
      <h3 className="font-heading text-xl text-white mb-1">
        Calculadora de Food Cost
      </h3>
      <p className="text-sm text-white/30 mb-6">
        Añade los ingredientes de tu plato y calcula el food cost al instante.
      </p>

      {/* Ingredients */}
      <div className="space-y-3 mb-6">
        <div className="grid grid-cols-[1fr_100px_80px_32px] gap-2 text-xs text-white/30 uppercase tracking-wider font-semibold px-1">
          <span>Ingrediente</span>
          <span>Coste (€)</span>
          <span>Cantidad</span>
          <span />
        </div>
        {ingredients.map((ing, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_100px_80px_32px] gap-2"
          >
            <input
              type="text"
              placeholder="Ej: Pulpo"
              value={ing.name}
              onChange={(e) => updateIngredient(i, "name", e.target.value)}
              className="rounded-lg bg-white/[0.04] border border-white/5 px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-resto-peach/50 focus:outline-none transition-colors"
            />
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={ing.cost}
              onChange={(e) => updateIngredient(i, "cost", e.target.value)}
              className="rounded-lg bg-white/[0.04] border border-white/5 px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-resto-peach/50 focus:outline-none transition-colors tabular-nums"
            />
            <input
              type="number"
              step="0.1"
              placeholder="1"
              value={ing.quantity}
              onChange={(e) => updateIngredient(i, "quantity", e.target.value)}
              className="rounded-lg bg-white/[0.04] border border-white/5 px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-resto-peach/50 focus:outline-none transition-colors tabular-nums"
            />
            <button
              onClick={() => removeIngredient(i)}
              className="rounded-lg bg-white/[0.02] border border-white/5 text-white/20 hover:text-red-400 hover:border-red-400/20 transition-colors text-sm"
              aria-label="Eliminar ingrediente"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={addIngredient}
          className="text-sm text-resto-peach hover:text-resto-peach/80 transition-colors"
        >
          + Añadir ingrediente
        </button>
      </div>

      {/* Sale price */}
      <div className="mb-8">
        <label className="text-xs text-white/30 uppercase tracking-wider font-semibold block mb-2">
          Precio de venta (€)
        </label>
        <input
          type="number"
          step="0.01"
          placeholder="Ej: 16.00"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          className="w-48 rounded-lg bg-white/[0.04] border border-white/5 px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-resto-peach/50 focus:outline-none transition-colors tabular-nums"
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white/[0.03] p-4">
          <div className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-1">
            Coste total
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            €{totalCost.toFixed(2)}
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.03] p-4">
          <div className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-1">
            Food Cost
          </div>
          <div className={`text-2xl font-bold tabular-nums ${getHealthColor()}`}>
            {foodCostPct.toFixed(1)}%
          </div>
          <div className={`text-xs mt-1 ${getHealthColor()}`}>
            {getHealthLabel()}
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.03] p-4">
          <div className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-1">
            Margen bruto
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            €{margin.toFixed(2)}
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.03] p-4">
          <div className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-1">
            % Margen
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            {marginPct.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}
