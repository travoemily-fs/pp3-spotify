// import react components
import { useState } from "react";
// import grommet components
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
          background: "rgba(255, 255, 255, 0.01)",
          borderRadius: "12px",
          paddingLeft: "25px",
          border: "1px solid rgba(29, 185, 84, 0.35)",
          paddingRight: "25px",
          fontWeight: "300",
          outline: "none",
          boxShadow: isFocused
            ? "0px 2px 2px rgba(0, 2, 0, 0.13), inset 0px 0px 2px rgba(0, 2, 0, 0.13), inset 0px 0px 2px rgba(255, 255, 255, 0.09), inset 1px 2px 6px rgba(0, 0, 0, 0.19),  inset 0px -1px 16px  rgba(62, 255, 168, 0.06), 0 0 10px rgba(29, 185, 84, 0.05), inset 0 0 5px rgba(29, 185, 84, 0.2)"
            : "0px 2px 2px rgba(0, 2, 0, 0.13), inset 0px 0px 2px rgba(0, 2, 0, 0.13), inset 0px 0px 2px rgba(255, 255, 255, 0.09),  inset 0px -2px 10px  rgba(62, 255, 168, 0.04), 0 0 10px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(153, 197, 169, 0.2)",
        }}
      />

      <Button
        icon={<SearchIcon color="primaryText" />}
        onClick={handleSubmit}
        style={{
          padding: "10px 30px",
          borderRadius: "16px",
          background: "rgba(29, 185, 84, 0.06)",
          border: "1px solid rgba(29, 185, 84, 0.35)",
          color: "#F8F8F8",
          fontWeight: "600",
          letterSpacing: "0.4px",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          boxShadow:
            "0 0 10px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(29, 185, 84, 0.2),inset 0 0 5px rgba(153, 197, 169, 0.2)",
          transition: "all 0.25s ease-in-out",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(.95)";
          e.currentTarget.style.boxShadow =
            "0 0 16px rgba(29, 185, 84, 0.45), inset 0 0 10px rgba(29, 185, 84, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 0 10px rgba(29, 185, 84, 0.2), inset 0 0 5px rgba(29, 185, 84, 0.2),inset 0 0 5px rgba(153, 197, 169, 0.2)";
        }}
      />
    </Box>
  );
}
