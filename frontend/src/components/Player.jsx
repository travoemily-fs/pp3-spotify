// import react components
import { useState, useRef, useEffect } from "react";
// import grommet components
import { Box, Text, Image, Button } from "grommet";
import { Favorite, Add, Play, Pause } from "grommet-icons";
// import icons
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";

export default function Player({ track, setView }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]); // 🔥 NEW
  const [showPlaylists, setShowPlaylists] = useState(false); // 🔥 NEW
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
      alert("Track added to your Liked Songs!");
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
        <Button icon={<Favorite />} onClick={handleFavorite} />

        {/* add to playlists */}
        <Button icon={<Add />} onClick={handleFetchPlaylists} />

        <Button label="Back" onClick={() => setView("search")} />
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
        <Box gap="small" margin={{ top: "medium" }}>
          <Text weight="bold">Your Playlists</Text>

          {playlists.map((playlist) => (
            <Box key={playlist.id}>
              <Text>{playlist.name}</Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
