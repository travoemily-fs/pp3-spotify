// import react components
import { useState, useRef, useEffect } from "react";

// import grommet components
import { Box, Text, Image, Button } from "grommet";
import { Favorite, Add, Play, Pause } from "grommet-icons";
// import icons
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";

export default function Player({ track, setView }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // handle audio reset if track is changed
  useEffect(() => {
    if (audioRef.current && track.preview_url) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, [track]);

  // handles pausing audio if track is unmounted
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // handle toggling audio between play and pause
  const handleTogglePlay = () => {
    if (!track.preview_url) return;

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // handle favoriting the track
  const handleFavorite = async () => {
    console.log("Sending track ID to favorite:", track.id);

    try {
      console.log("Token being sent:", localStorage.getItem("token"));
      console.log("Track ID being sent:", track.id);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlist/fave`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ trackIds: [track.id] }),
        }
      );

      if (!res.ok) throw new Error("Failed to favorite track");
      alert("Track added to your Liked Songs!");
    } catch (err) {
      console.error(err);
      alert("Could not favorite track.");
    }
  };

  // failsafe guard
  if (!track) return null;

  return (
    
    <Box
      direction="column"
      justify="between"
      align="center"
      gap="medium"
      pad="medium"
      overflow="hidden"
      background="rgba(255, 255, 255, 0.01)"
      round="medium"
      style={{
        boxShadow:
          "0 0 11px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(29, 185, 84, 0.2), inset 0 0 14px rgba(153, 197, 169, 0.2)",
        maxWidth: "400px",
        width: "40%",
        border: "1px solid rgba(29, 185, 84, 0.35)",
      }}>

        
      {/* top accent bg w/ fave + add to playlist btns */}

      <Box direction="row" width="100%" justify="between" pad="small">
        <Button
          icon={<Favorite color="white" />}
          plain
          onClick={handleFavorite}
          style={{
            paddingLeft: "15px",
          }}
        />
        <Box alignSelf="start">
  <Button
    label="Go back to search"
    onClick={() => setView("search")}
    plain
    style={{
      fontSize: "14px",
      color: "#1db954",
      marginBottom: "0.5rem",
    }}
  />
</Box>

      </Box>
      {/* album art + track info */}
      <Box
        direction="row"
        pad="medium"
        gap="small"
        style={{
          paddingBottom: "10px",
        }}>
        <Image
          src={track.albumArt}
          alt={`${track.title} album art`}
          width="90px"
          elevation="small"
          style={{ borderRadius: "8px", opacity: ".9" }}
        />
        <Box
          style={{
            textAlign: "left",
            marginLeft: ".75rem",
          }}>
          <Text
            size="small"
            style={{
              color: "#3effa8",
              textShadow: "0px 0px 5px rgba(62, 255, 168, 0.53)",
            }}>
            {track.artists.join(", ")}
          </Text>
          <Text weight="bold">{track.title}</Text>
          <Text size="xsmall">{track.album}</Text>
        </Box>
      </Box>

      {/* player controls */}
      <Box width="100%" gap="small" pad={{ top: "small" }} align="center">
        <Box
          direction="row"
          gap="small"
          background="rgba(255, 255, 255, 0.04)"
          elevation="small"
          pad="small"
          round="xlarge"
          align="center"
          justify="center"
          style={{
            backdropFilter: "blur(18px)",
            paddingTop: "10px",
          }}>
          <Button
            icon={
              <RxTrackPrevious
                color="white"
                style={{
                  filter: "drop-shadow(0 0 10px rgb(0, 0, 0))",
                }}
              />
            }
            plain
            onClick={() => alert("Back")}
          />

          {/* show play button or tooltip based on preview availability */}
          {track.preview_url ? (
            <Button
              icon={
                isPlaying ? (
                  <Pause
                    color="white"
                    style={{
                      filter: "drop-shadow(0 0 10px rgb(0, 0, 0))",
                    }}
                  />
                ) : (
                  <Play color="white" />
                )
              }
              plain
              onClick={handleTogglePlay}
            />
          ) : (
            <Text size="xsmall" color="#3effa8">
              No preview available
            </Text>
          )}

          <Button
            icon={
              <RxTrackNext
                color="white"
                style={{
                  filter: "drop-shadow(0 0 10px rgb(0, 0, 0))",
                }}
              />
            }
            plain
            onClick={() => alert("Next")}
          />
        </Box>

        {/* progress bar */}
        <Box
          width="85%"
          pad={{ horizontal: "small" }}
          style={{
            paddingBottom: "25px",
            paddingTop: "15px",
          }}>
          <Box direction="row" justify="between">
            <Text size=".7rem">0:00</Text>
            <Text size=".7rem">{track.duration}</Text>
          </Box>
          <Box
            background="rgba(255, 255, 255, 0.04)"
            height="13px"
            round
            overflow="hidden"
            margin={{ top: "xsmall" }}>
            <Box width="35%" background="attnAccent" />
          </Box>
        </Box>

        {/* hidden audio element */}
        {track.preview_url && <audio ref={audioRef} src={track.preview_url} />}
      </Box>
    </Box>
  );
}
