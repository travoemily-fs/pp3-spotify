// import grommet components
import { Box, Text, Button, Image } from "grommet";

export default function Results({
  results,
  loading,
  error,
  setView,
  onSelect,
}) {
  // handle loading and error states
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;
  if (!results || !results.tracks || results.tracks.length === 0) {
    return <Text>No results found.</Text>;
  }

  // define click handler for track selection
  const handleSelect = (track) => {
    // convert durations
    const fullLength = track.duration_ms;
    const minutes = Math.floor(fullLength / 60000);
    const seconds = Math.floor((fullLength % 60000) / 1000)
      .toString()
      .padStart(2, "0");

    console.log("SELECTED TRACK:", track);

    onSelect({
      id: track.id,
      title: track.name,
      artists: track.artists.map((artist) => artist.name),
      album: track.album.name,
      albumArt: track.album.images[0]?.url || "",
      duration: `${minutes}:${seconds}`,
      preview_url: track.preview_url,
    });

    setView("player");
  };

  // define search result styling carried over from search input
  const baseResultStyle = {
    padding: "30px 30px",
    borderRadius: "35px",
    border: "1px solid rgba(29, 185, 84, 0.35)",
    color: "#F8F8F8",
    fontWeight: "600",
    background: "rgba(255, 255, 255, 0.01)",
    letterSpacing: "0.4px",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    boxShadow:
      "0 0 8px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(29, 185, 84, 0.2), inset 0 0 14px rgba(153, 197, 169, 0.2)",
    transition: "all 0.25s ease-in-out",
    cursor: "pointer",
    maxWidth: "500px",
    minWidth: "400px",
    marginTop: "5px",
    marginBottom: "5px",
  };

  return (
    <Box
      gap="medium"
      overflow="auto"
      align="center"
      pad="medium"
      width="100%"
      height="100%">
      {results.tracks.map((track) => (
        <Button key={track.id} onClick={() => handleSelect(track)} plain>
          <Box
            direction="row"
            align="center"
            justify="center"
            gap="medium"
            pad="small"
            style={baseResultStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 0 16px rgba(29, 185, 84, 0.45), inset 0 0 10px rgba(29, 185, 84, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 0 10px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(153, 197, 169, 0.2)";
            }}>
            <Image
              src={track.album.images[2]?.url || track.album.images[0]?.url}
              alt={`${track.name} cover`}
              width="68"
              height="68"
              style={{ borderRadius: "8px" }}
            />
            <Box align="center" justify="center">
              <Text weight="bold" style={{ 
                letterSpacing:"0px",
                textShadow: "0 0 1px #ffff" }}>
                {track.name}
              </Text>
              <Text
                size="small"
                color="#3effa8"
                style={{ textShadow: "0 0 4px rgba(62, 255, 168, 0.3)",
                  letterSpacing:"0px"
                 }}>
                {track.artists.map((artist) => artist.name).join(", ")}
              </Text>
            </Box>
          </Box>
        </Button>
      ))}
    </Box>
  );
}
