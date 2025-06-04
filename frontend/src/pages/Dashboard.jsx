// import react components
import { useState } from "react";
// import grommet components
import { Box, Grid, Text } from "grommet";
// import needed components
import AppHeader from "../components/AppHeader";
import Search from "../components/Search";
import Results from "../components/Results";
import Player from "../components/Player";

// begin dashboard setup
export default function Dashboard() {
  const [view, setView] = useState(null);
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
          <Box gridArea="main" background="primaryBackground" pad="medium">
            {view === "results" && <Results setView={setView} />}
            {view === "player" && <Player />}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
