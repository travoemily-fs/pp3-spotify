import { Box } from "grommet";

export default function Results({ setView }) {
  return (
    <Box>
      <Button
        label="Play"
        onClick={() => setView("player")}
      />
    </Box>
  );
}
