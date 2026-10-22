"use client";

import { useMemo, useState } from "react";
import type { Vehicle, VehicleBodyType } from "@/content/types";
import { VehicleCard } from "./VehicleCard";

/**
 * Vehicle browser.
 *
 * The full list is rendered server-side and passed in, so every vehicle is
 * present in the HTML for search engines and for users without JS. The filters
 * narrow that same set client-side; with JS disabled the complete list simply
 * remains visible, which is the correct fallback.
 */
export function VehicleBrowser({ vehicles }: { vehicles: Vehicle[] }) {
  const [body, setBody] = useState<VehicleBodyType | "all">("all");
  const [query, setQuery] = useState("");

  const bodyTypes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.bodyType))).sort(),
    [vehicles],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vehicles.filter((v) => {
      if (body !== "all" && v.bodyType !== body) return false;
      if (q && !`${v.name} ${v.family} ${v.bodyType}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [vehicles, body, query]);

  const isFiltered = body !== "all" || query.trim() !== "";

  return (
    <div className="browser">
      <form
        className="browser__controls"
        role="search"
        aria-label="Filter vehicles"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="field browser__search">
          <label htmlFor="vq">Search models</label>
          <input
            id="vq"
            className="input"
            type="search"
            value={query}
            placeholder="e.g. Prado, Hilux"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="field browser__bodytype">
          <label htmlFor="vbody">Body type</label>
          <select
            id="vbody"
            className="select"
            value={body}
            onChange={(e) => setBody(e.target.value as VehicleBodyType | "all")}
          >
            <option value="all">All body types</option>
            {bodyTypes.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="btn btn--quiet browser__reset"
          onClick={() => {
            setBody("all");
            setQuery("");
          }}
          disabled={!isFiltered}
        >
          Reset
        </button>
      </form>

      <h2 className="visually-hidden">Model results</h2>
      <p className="browser__count" aria-live="polite">
        {results.length} {results.length === 1 ? "model" : "models"} shown
        {isFiltered ? " (filtered)" : ""}
      </p>

      {results.length === 0 ? (
        <div className="browser__empty">
          <p className="display-4">No models match those filters.</p>
          <p className="prose-body">
            Try a different body type, or reset the filters to see the full
            evidenced set.
          </p>
        </div>
      ) : (
        <ul className="browser__grid">
          {results.map((v, i) => (
            <li key={v.slug}>
              <VehicleCard
                vehicle={v}
                priority={i < 2}
                variant={i === 0 && !isFiltered ? "feature" : "standard"}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
