// import react components
import { useState } from "react";
import { useEffect } from "react";
// import grommet components
import { Box, Grid, Text } from "grommet";
// import needed components
import AppHeader from "../components/AppHeader";
import Search from "../components/Search";
import Results from "../components/Results";
import Player from "../components/Player";

// begin dashboard setup
export default function Dashboard() {
  // useState for search results
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // create state for chosen track
  const [selectedTrack, setSelectedTrack] = useState(null);

  // fetch the token that spotify sends
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    // check for tokens and assignments them
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

    // bring in token saved in local storage
    const token = localStorage.getItem("token");

    // begin try/catch block for error handling
    try {
      // create a dynamic url that encodes search results by pulling in .env variables
      console.log(
        "Requesting:",
        `${import.meta.env.VITE_BACKEND_URL}/api/search?q=${encodeURIComponent(
          query
        )}`
      );
      console.log("Token in use:", token);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/search?q=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include", // make sure u include ur headers
        }
      );

      // check for errors
      if (!res.ok) throw new Error("Search failed.");
      // print search results
      const data = await res.json();
      setResults(data);
      setView("results");
    } catch (err) {
      // log console error
      console.error(err);
      // display error for user
      setError("Search failed... please try again!");
    } finally {
      setLoading(false);
    }
  };

  // set player to default for now
  const [view, setView] = useState("player");

  return (
    <Box fill direction="column" width="100vw" pad="none" margin="none">
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
          <Box
            gridArea="main"
            background="primaryBackground"
            pad="medium"
            align="center"
            justify="center">
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
              <Player track={selectedTrack} />
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
