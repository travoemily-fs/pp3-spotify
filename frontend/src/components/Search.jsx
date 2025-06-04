import { useState } from "react";
import { Box, TextInput, Button } from "grommet";
import { Search as SearchIcon } from "grommet-icons";

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <Box
      direction="row"
      gap="xsmall"
      fill="horizontal"
      justify="center"
      align="center"
      style={{
        width: "75%",
      }}>
      <TextInput
        placeholder="search for artists, albums & more..."
        pad="small"
        value={query}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        plain
        style={{
          background: "rgba(42, 42, 42, 0.12)",
          borderRadius: "12px",
          paddingLeft: "25px",
          paddingRight: "25px",
          fontWeight: "300",
          outline: "none",
          boxShadow: isFocused
            ? "0px 2px 2px rgba(0, 2, 0, 0.13), inset 0px 0px 2px rgba(0, 2, 0, 0.13), inset 0px 0px 2px rgba(255, 255, 255, 0.09), inset 1px 2px 6px rgba(0, 0, 0, 0.19)"
            : "0px 2px 2px rgba(0, 2, 0, 0.13), inset 0px 0px 2px rgba(0, 2, 0, 0.13), inset 0px 0px 2px rgba(255, 255, 255, 0.09)",
        }}
      />

      <Button icon={<SearchIcon color="highlight" />} onClick={handleSubmit} />
    </Box>
  );
}
