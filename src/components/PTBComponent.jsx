import { useEffect, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import PokemonCard from "./CardComponent";

export default function Pokedex() {
  const LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const { data, loading, error } = useFetch(LIST_URL);
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    let alive = true;
    if (!data?.results) return;

    async function fetchDetailsBatched() {
      setLoadingDetails(true);
      try {
        const urls = data.results.map((r) => r.url);
        const batchSize = 20;
        const out = [];
        for (let i = 0; i < urls.length; i += batchSize) {
          const batch = urls.slice(i, i + batchSize);
          const results = await Promise.all(
            batch.map((u) =>
              fetch(u).then((r) => (r.ok ? r.json() : null)).catch(() => null)
            )
          );
          out.push(...results.filter(Boolean));
          if (!alive) break;
        }
        if (!alive) return;
        const normalized = out.map((d) => ({
          id: d.id,
          name: d.name,
          sprite:
            d.sprites?.other?.["official-artwork"]?.front_default ||
            d.sprites?.front_default ||
            null,
          types: d.types.map((t) => t.type.name),
        }));
        setDetails(normalized);
      } catch (e) {
        console.error("detail fetch error", e);
      } finally {
        if (alive) setLoadingDetails(false);
      }
    }

    fetchDetailsBatched();
    return () => {
      alive = false;
    };
  }, [data]);

  const q = search.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return details;
    return details.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.types.some((t) => t.toLowerCase().includes(q))
    );
  }, [q, details]);

  return (
    <div className="pokedex">
      <div className="pokedex-top">
        <h3 className="pokedex-title">Available Pokemons (1–151)</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            className="search"
            placeholder="Search by name or type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={{ color: "var(--muted)", fontSize: 13 }}>
            {details.length ? `${filtered.length} shown` : ""}
          </div>
        </div>
      </div>

      <div className="pokedex-scroll">
        {(loading || loadingDetails) && (
          <div style={{ padding: 22, color: "var(--muted)" }}>Pwease wait :3</div>
        )}
        {error && <div style={{ padding: 22, color: "crimson" }}>Error: {String(error)}</div>}

        {!loading && !loadingDetails && !error && (
          <div className="grid">
            {filtered.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
