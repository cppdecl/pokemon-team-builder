import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { TeamProvider } from "./contexts/TeamContext";
import Pokedex from "./components/PTBComponent";
import TeamView from "./components/TeamComponent";
import "./App.css";

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      const raw = localStorage.getItem("dark_mode");
      return raw ? JSON.parse(raw) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("dark_mode", JSON.stringify(dark));
    } catch {}
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <TeamProvider>
      <Helmet>
        <title>PeeTeaBee 🐝 - Pokemon Team Builder</title>
        <meta
          name="description"
          content="Build and customize your Pokemon team with PeeTeaBee 🐝, a React + NodeJS team builder app."
        />
        <meta property="og:title" content="PeeTeaBee 🐝 - Pokemon Team Builder" />
        <meta
          property="og:description"
          content="Easily build and customize your Pokemon team in React."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Helmet>

      <div className="app">
        <div className="header">
          <div className="brand">
            <h1 className="title">PeeTeaBee 🐝</h1>
            <div className="subtitle">
              A Pokemon Team Builder - built using React and NodeJS.
            </div>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            className="theme-btn-static"
          >
            <img
              src={
                dark
                  ? "https://img.icons8.com/?size=100&id=SyBDr18WdUcD&format=png&color=ffffff"
                  : "https://img.icons8.com/?size=100&id=ttz0LmEuAD6m&format=png&color=000000"
              }
              alt="theme toggle"
              className={`theme-icon ${dark ? "icon-dark" : "icon-light"}`}
            />
          </button>
        </div>
        <div className="main">
          <Pokedex />
          <TeamView />
        </div>
      </div>
    </TeamProvider>
  );
}
