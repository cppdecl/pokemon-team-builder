import { useTeam } from "../contexts/TeamContext";
import { fallbackSprite } from "../utils/helpers";

export default function TeamView() {
  const { team, removePokemon } = useTeam();
  const slots = Array.from({ length: 6 }, (_, i) => team[i] ?? null);

  return (
    <div className="team">
      <div className="team-panel">
        <div className="team-header">
          <h4 className="team-title">Your Team</h4>
          <div className="team-count">{team.length}/6</div>
        </div>
        <div className="slots">
          {slots.map((s, idx) =>
            s ? (
              <div key={idx} className="slot" onClick={() => removePokemon(s.id)}>
                <img
                  src={s.sprite || fallbackSprite(s.id)}
                  alt={s.name}
                  onError={(e) => (e.currentTarget.src = fallbackSprite(s.id))}
                  draggable={false}
                />
                <div style={{ fontWeight: 700, marginTop: 6, textTransform: "capitalize" }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>
                  {s.types.join(" · ")}
                </div>
              </div>
            ) : (
              <div key={idx} className="slot empty">
                <div style={{ fontSize: 14, color: "var(--muted)" }}>Empty</div>
              </div>
            )
          )}
        </div>
        <div className="tip">Click a pokemon to add or remove them!</div>
      </div>
    </div>
  );
}
