// import grommet components
import { Header, Box, Text } from "grommet";

export default function AppHeader() {
  return (
    <Header

      justify="between"
      align="center"
      pad={{
        horizontal: "medium",
        vertical: "medium",
      }}
      fill="horizontal"
      height={{ min: "100px" }}
     >
        <Box
        direction="row"
        gap="small"
        align="center"
        style={{
          paddingTop:"6px",
        }}>

            <Text
            style={{
              fontWeight:"800",
              textShadow:".5px .5px 0px rgba(42, 42, 42, 0.29)",
              letterSpacing:"-.5px",
              fontSize:"1.4rem"
            }}>
                playlister.
            </Text>
            <Text
            style={{
              fontSize:".9rem",
              marginLeft:"4rem",
              marginTop:".5rem",
              color:"#3effa8",
              fontStyle:"italic"
            }}>
              find, create, and share your spotify playlists.
            </Text>
        </Box>
  

      </Header>
  );
}
