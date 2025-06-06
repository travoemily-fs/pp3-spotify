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
  // fetch the token that spotify sends
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    // check for tokens and assignments them
    if(token) {
      localStorage.setItem("token", token);
      // clean up the return
      window.history.replaceState({}, document.title, "/dashboard")
    } 
  }, []);
  // set player to default for now
  const [view, setView] = useState("player");
  // mock data
  const mockTrack = {
    id: "1",
    name: "Guess",
    artist: "Charli XCX, Billie Eilish",
    album: {
      cover: "https://i.scdn.co/image/ab67616d00001e02d06d6b32cd3082e8aa8e8c4f",
      name: "CRASH (Deluxe)",
    },
    duration_ms: 192000,
  };
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
            <Search />
          </Box>
          <Box
            gridArea="main"
            background="primaryBackground"
            pad="medium"
            align="center"
            justify="center">
            {view === "results" && <Results setView={setView} />}
            {view === "player" && <Player track={mockTrack} />}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
