// import react components
import { useState } from "react";
// import grommet components
import { Box, Grid, Text, Collapsible, Button } from "grommet";
// import needed components
import AppHeader from "../components/AppHeader";
import Search from "../components/Search";
import Results from "../components/Results";
import Player from "../components/Player";
// import icons
import { FormUp, FormDown } from "grommet-icons";

// begin dashboard setup
export default function Dashboard() {
  const [view, setView] = useState(null);
  const [searchVisible, setSearchVisible] = useState(true);
  return (
    <Box fill direction="column" width="100vw" pad="none" margin="none">
      <AppHeader />
      <Box fill="horizontal">
        <Button
          icon={searchVisible ? <FormUp /> : <FormDown />}
          label={searchVisible ? "hide searchbar" : "show searchbar"}
          onClick={() => setSearchVisible(!searchVisible)}
          alignSelf="start"
        />
        <Grid
          fill
          rows={["xsmall", "flex"]}
          columns={["flex"]}
          areas={[
            { name: "search", start: [0, 0], end: [0, 0] },
            { name: "main", start: [0, 1], end: [0, 1] },
          ]}>
          <Collapsible open={searchVisible} direction="vertical">
            <Box gridArea="search" background="primaryBackground">
              <Search />
            </Box>
          </Collapsible>
          <Box gridArea="main" background="primaryBackground" pad="medium">
            {view === "results" && <Results setView={setView} />}
            {view === "player" && <Player />}
            {!view && <Text>start ur search</Text>}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
