import { useTeam } from "../contexts/TeamContext";
import { capitalize, fallbackSprite } from "../utils/helpers";

export default function PokemonCard({ pokemon }) {
  const { addPokemon, isInTeam, team } = useTeam();
  const already = isInTeam(pokemon.id);
  const teamFull = team.length >= 6;

  return (
    <div className="card">
      <div className="card-id">#{String(pokemon.id).padStart(3, "0")}</div>
      <div className="sprite-wrap">
        <img
          src={pokemon.sprite || fallbackSprite(pokemon.id)}
          alt={pokemon.name}
          className="sprite"
          onError={(e) => (e.currentTarget.src = fallbackSprite(pokemon.id))}
          draggable={false}
        />
      </div>
      <div className="card-name">{capitalize(pokemon.name)}</div>
      <div className="types">
        {pokemon.types.map((t) => (
          <div className="type-pill" key={t}>{t}</div>
        ))}
      </div>
      <button
        className={`add-btn ${already || teamFull ? "disabled" : ""}`}
        onClick={() =>
          !already && !teamFull && addPokemon({
            id: pokemon.id,
            name: pokemon.name,
            sprite: pokemon.sprite,
            types: pokemon.types,
          })
        }
        disabled={already || teamFull}
      >
        {already ? "In Team" : teamFull ? "Full" : "Add to Team"}
      </button>
    </div>
  );
}
