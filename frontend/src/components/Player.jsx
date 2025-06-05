// import react components
import { useState } from "react";

// import grommet components
import { Box, Text, Image, Button } from "grommet";
import { Favorite, Add, Play, Pause, Next, Previous } from "grommet-icons";
import mockAlbumArt from "../assets/TheGuessRemix.png";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  // mock track data
  const mockTrack = {
    title: "Guess",
    artists: ["Charli XCX", "Billie Eilish"],
    album: "CRASH (Deluxe)",
    duration: "3:30",
    albumArt: mockAlbumArt,
  };

  return (
    <Box
      direction="column"
      justify="between"
      align="center"
      gap="medium"
      background="rgba(42, 42, 42, 0.12)"
      round="small"
      style={{
        boxShadow:
          "0px 2px 2px rgba(0, 2, 0, 0.13), inset 0px 0px 2px rgba(0, 2, 0, 0.13), inset 0px 0px 2px rgba(255, 255, 255, 0.09), inset 0px 2px 16px  rgba(62, 255, 168, 0.06)",
        paddingBottom: "35px",
        maxWidth: "450px",
        width: "35%",
      }}>
      {/* top accent bg w/ fave + add to playlist btns */}
      <Box
        background="blue"
        width="100%"
        height="175px"
        round={{ corner: "top", size: "small" }}
        pad="small"
        direction="row"
        justify="between"
        align="start">
        <Button
          icon={<Favorite color="white" />}
          plain
          onClick={() => alert("Fave")}
        />
        <Button
          icon={<Add color="white" />}
          plain
          onClick={() => alert("Add to playlist")}
        />
      </Box>

      {/* album art + track info */}
      <Box
        direction="row"
        align="center"
        gap="xsmall"
        margin={{ top: "-80px" }}>
        <Image
          src={mockTrack.albumArt}
          alt={`${mockTrack.title} album art`}
          width="90px"
          style={{ borderRadius: "8px" }}
        />
        <Box
          style={{
            textAlign: "left",
            marginLeft: ".75rem",
          }}>
          <Text size="small" color="highlight">
            {mockTrack.artists.join(", ")}
          </Text>
          <Text weight="bold">{mockTrack.title}</Text>
          <Text size="xsmall">{mockTrack.album}</Text>
        </Box>
      </Box>

      {/* player controls */}
      <Box width="100%" gap="small" pad={{ top: "small" }} align="center">
        <Box
          direction="row"
          gap="medium"
          background="rgba(255,255,255,0.05)"
          pad="small"
          round="xlarge"
          align="center"
          justify="center">
          <Button
            icon={<Previous color="white" />}
            plain
            onClick={() => alert("Back")}
          />
          <Button
            icon={isPlaying ? <Pause color="white" /> : <Play color="white" />}
            plain
            onClick={() => setIsPlaying(!isPlaying)}
          />
          <Button
            icon={<Next color="white" />}
            plain
            onClick={() => alert("Next")}
          />
        </Box>

        {/* progress bar */}
        <Box width="85%" pad={{ horizontal: "small" }}>
          <Box direction="row" justify="between">
            <Text size="xsmall">0:00</Text>
            <Text size="xsmall">{mockTrack.duration}</Text>
          </Box>
          <Box
            background="dark-3"
            height="4px"
            round
            overflow="hidden"
            margin={{ top: "xsmall" }}>
            <Box width="35%" background="attnAccent" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
