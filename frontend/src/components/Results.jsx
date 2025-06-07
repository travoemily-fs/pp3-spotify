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
    onSelect({
      id: track.id,
      name: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      album: {
        name: track.album.name,
        cover: track.album.images[0]?.url || "",
      },
      duration_ms: track.duration_ms,
    });
    setView("player");
  };

  return (
    <Box gap="small" overflow="auto" pad="medium" height="medium" width="large">
      console.log("results.tracks:", results.tracks);
      {results.tracks.map((track) => (
        <Button key={track.id} onClick={() => handleSelect(track)} plain>
          <Box
            direction="row"
            align="center"
            gap="medium"
            pad="small"
            background="secondaryBackground"
            round="small"
            hoverIndicator>
            <Image
              src={track.album.images[2]?.url || track.album.images[0]?.url}
              alt={`${track.name} cover`}
              width="48"
              height="48"
              style={{ borderRadius: "4px" }}
            />
            <Box>
              <Text weight="bold">{track.name}</Text>
              <Text size="small" color="highlight">
                {track.artists.map((artist) => artist.name).join(", ")}
              </Text>
            </Box>
          </Box>
        </Button>
      ))}
    </Box>
  );
}
