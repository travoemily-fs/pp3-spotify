// import react assets
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import grommet assets
import { Grommet } from "grommet";
// import routes
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

// define custom theme
const theme = {
  global: {
    colors: {
      text: "primaryText",
      primaryBackground: "#121212",
      secondaryBackground: "#2A2A2A",
      primaryText: "#F8F8F8",
      attnAccent: "#1DB954",
      attnAccentLight: "rgba(29, 185, 84, 0.19)",
      attnAccentShadow: "rgba(29, 185, 84, 0.08)",
      highlight: "#3EFFA8",
      innerHighlight: "#3EFFA8",
      secondaryAccent: "#65FFC9",
    },
    font: {
      family: "quasimoda",
      size: "16px",
    },
    elevation: {
      dark: {
        small: `inset 0px 0px 5px .5px var(--color-inner-highlight),
        inset 0px 0px 20px 1px var(--color-attn-accent-light),
        0px 0px 1px var(--color-attn-accent),
        0px 2px 10px var(--color-attn-accent-shadow)`,
        medium: `inset 0px 0px 10px .75px var(--color-inner-highlight),
        inset 0px 0px 20px 1px var(--color-attn-accent-light),
        0px 0px 2px var(--color-attn-accent),
        0px 2px 10px var(--color-attn-accent-shadow)`,
        large: `inset 0px 0px 15px 1px var(--color-inner-highlight),
        inset 0px 0px 20px 1px var(--color-attn-accent-light),
        0px 0px 4px var(--color-attn-accent),
        0px 2px 15px var(--color-attn-accent-shadow)`,
      },
    },
    button: {
      primary: {},
    },
  },
};

// begin app shell wrapped in grommet
export default function App() {
  return (
    <Grommet full theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Grommet>
  );
}
