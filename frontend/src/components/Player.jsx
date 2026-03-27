// import react components
import { useState, useRef, useEffect } from "react";
// import grommet components
import { Box, Text, Image, Button } from "grommet";
import { Favorite, Add, Play, Pause } from "grommet-icons";
// import icons
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";

export default function Player({ track, setView }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]); 
  const [showPlaylists, setShowPlaylists] = useState(false); 
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && track.preview_url) {
      audio.pause();
      audio.currentTime = 0;
    }

    setIsPlaying(false);
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

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

  const handleFavorite = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlist/fave`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ trackIds: [track.id] }),
        },
      );

      if (!res.ok) throw new Error("Failed to favorite track");
      setIsLiked(true);
    } catch (err) {
      console.error(err);
      alert("Could not favorite track.");
    }
  };

  // fetch playlists
  const handleFetchPlaylists = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlist`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch playlists");

      const data = await res.json();
      console.log("PLAYLISTS:", data);

      setPlaylists(data.items || []);
      setShowPlaylists(true);
    } catch (err) {
      console.error(err);
      alert("Could not fetch playlists.");
    }
  };

  const addTrackToPlaylist = async (playlistId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlist/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            playlistId,
            trackUri: `spotify:track:${track.id}`,
          }),
        },
      );

      if (!res.ok) throw new Error("Failed to add track");

      alert("Track added to playlist!");
    } catch (err) {
      console.error(err);
      alert("Could not add track.");
    }
  };

  const handleNext = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playback/next`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!res.ok) throw new Error("Next failed");
    } catch (err) {
      console.error(err);
      alert("Failed to skip track.");
    }
  };

  const handlePrevious = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playback/previous`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!res.ok) throw new Error("Previous failed");
    } catch (err) {
      console.error(err);
      alert("Failed to go back.");
    }
  };

  if (!track) return null;

  const hasPreview = !!track.preview_url;

return (
  <Box direction="column" align="center" gap="medium" pad="medium">
    {/* top bar */}
    <Box direction="row" width="100%" justify="between">
      <Button
        icon={<Favorite color={isLiked ? "#1db954" : "white"} />}
        onClick={handleFavorite}
        style={{
          filter: isLiked ? "drop-shadow(0 0 6px #1db954)" : "none",
        }}
      />

      {/* add to playlists */}
      <Button icon={<Add />} onClick={handleFetchPlaylists} />

      <Button
        label="Back"
        onClick={() => setView("results")}
        plain
        style={{
          color: "#3effa8",
          fontWeight: "600",
          padding: "8px 16px",
          borderRadius: "12px",
          border: "1px solid rgba(62, 255, 168, 0.4)",
          background: "rgba(255, 255, 255, 0.02)",
          textShadow: "0 0 6px rgba(62, 255, 168, 0.5)",
          backdropFilter: "blur(6px)",
        }}
      />
    </Box>

    {/* track info */}
    <Box direction="row" gap="small">
      <Image src={track.albumArt} width="90px" />
      <Box>
        <Text>{track.title}</Text>
        <Text size="small">{track.artists.join(", ")}</Text>
      </Box>
    </Box>

    {/* controls */}
    <Box direction="row" gap="small">
      <Button onClick={handlePrevious} icon={<RxTrackPrevious />} />
      <Button
        onClick={handleTogglePlay}
        icon={isPlaying ? <Pause /> : <Play />}
        disabled={!hasPreview}
      />
      <Button onClick={handleNext} icon={<RxTrackNext />} />
    </Box>

    {!hasPreview && <Text size="small">No preview available</Text>}

    {hasPreview && <audio ref={audioRef} src={track.preview_url} />}

    {/* playlist list */}
    {showPlaylists && (
      <Box margin={{ top: "medium" }} width="100%" align="center" gap="small">
        <Text
          weight="bold"
          size="medium"
          style={{
            textShadow: "0 0 6px rgba(255,255,255,0.2)",
          }}>
          Your Playlists
        </Text>

        <Box
          width="100%"
          gap="xsmall"
          style={{
            maxHeight: "240px",
            overflowY: "auto",
            padding: "10px",
            paddingBottom: "20px",
          }}>
          {playlists.map((playlist) => (
            <Box
              key={playlist.id}
              pad="small"
              round="small"
              direction="row"
              justify="between"
              margin={{ bottom: "6px" }}
              align="center"
              style={{
                border: "1px solid rgba(62, 255, 168, 0.25)",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(6px)",
                transition: "all 0.2s ease",
                minHeight: "42px",
                flexShrink: 0,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(62,255,168,0.4)";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}>
              {/* playlist name */}
              <Text size="small">{playlist.name}</Text>

              {/* actions */}
              <Box direction="row" gap="xsmall">
                {/* view */}
                <Button
                  label="View"
                  plain
                  style={{
                    fontSize: "12px",
                    color: "#3effa8",
                  }}
                  onClick={() =>
                    window.open(playlist.external_urls?.spotify, "_blank")
                  }
                />

                {/* add */}
                <Button
                  label="Add"
                  plain
                  style={{
                    fontSize: "12px",
                    color: "#3effa8",
                  }}
                  onClick={() => addTrackToPlaylist(playlist.id)}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )}
  </Box>
);
}
