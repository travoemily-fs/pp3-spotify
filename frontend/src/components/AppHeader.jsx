// import grommet components
import { Header, Box, Text, Avatar } from "grommet";



export default function AppHeader() {
  return (
    <Header
      background="attnAccent"
      justify="between"
      align="center"
      pad={{
        horizontal: "medium",
        vertical: "small",
      }}
      fill="horizontal"
      height={{ min: "60px" }} >
        <Box
        direction="row"
        gap="small"
        align="center">
            <Avatar background="highlight" size="small">hi</Avatar>
            <Text>
                title
            </Text>
        </Box>
  

      </Header>
  );
}
