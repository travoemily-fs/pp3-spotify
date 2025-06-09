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
              textShadow:"0px 0px 5px rgba(248, 248, 248, 0.33)",
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
              fontStyle:"italic",
              textShadow:"0px 0px 5px rgba(62, 255, 168, 0.53)"
            }}>
              find, create, and share your spotify playlists.
            </Text>
        </Box>
  

      </Header>
  );
}
