// import react components
import { useState, useEffect } from "react";
// import grommet components
import { Box, Grid } from "grommet";
// import needed components
import AppHeader from "../components/AppHeader";
import Search from "../components/Search";
import Results from "../components/Results";
import Player from "../components/Player";

// begin dashboard setup
export default function Dashboard() {
  // 🔥 FIX: results should be an ARRAY, not null
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // create state for chosen track
  const [selectedTrack, setSelectedTrack] = useState(null);

  // set player to default for now
  const [view, setView] = useState("player");

  // fetch the token that spotify sends
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // clean up the return
      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, []);

  // define the handleSearch function here
  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/search?q=${encodeURIComponent(
          query,
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Search failed.");

      const data = await res.json();

      console.log("🔥 SEARCH RESPONSE:", data);

      // 🔥🔥🔥 THIS IS THE CRITICAL FIX
      setResults(data.tracks.items);

      setView("results");
    } catch (err) {
      console.error(err);
      setError("Search failed... please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box fill direction="column" pad="none" margin="none">
      <AppHeader />

      <Box fill="horizontal">
        <Grid
          fill
          rows={["small", "flex"]}
          columns={["flex"]}
          areas={[
            { name: "search", start: [0, 0], end: [0, 0] },
            { name: "main", start: [0, 1], end: [0, 1] },
          ]}>
          <Box gridArea="search" align="center" justify="center" pad="large">
            <Search onSearch={handleSearch} />
          </Box>

          <Box gridArea="main" pad="medium" align="center" justify="center">
            {view === "results" && (
              <Results
                results={results}
                loading={loading}
                error={error}
                setView={setView}
                onSelect={setSelectedTrack}
              />
            )}

            {view === "player" && selectedTrack && (
              <Player track={selectedTrack} setView={setView} />
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
