import { createContext, useContext, useEffect, useState } from "react";

const TeamContext = createContext(null);

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(() => {
    try {
      const raw = localStorage.getItem("current_team");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("current_team", JSON.stringify(team));
    } catch {}
  }, [team]);

  const addPokemon = (p) =>
    setTeam((t) => {
      if (t.length >= 6) return t;
      if (t.some((x) => x.id === p.id)) return t;
      return [...t, p];
    });

  const removePokemon = (id) =>
    setTeam((t) => t.filter((p) => p.id !== id));

  const isInTeam = (id) => team.some((p) => p.id === id);

  return (
    <TeamContext.Provider value={{ team, addPokemon, removePokemon, isInTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

export const useTeam = () => useContext(TeamContext);
