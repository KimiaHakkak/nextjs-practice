//UI Input
//Handles typing and search trigger.

"use client";
import { Box, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SearchBar({ city, setCity, onSearch }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      <TextField
        variant="outlined"
        size="small"
        value={city}
        onChange={(e) => setCity(e.target.value)} //1-onChange fires when you type inside your textfield. setCity(e.target.value) is called — but setCity is a setter from const [city, setCity] = useState("") declared in app/page.js.
        placeholder="Enter city..."
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 1,
          input: { color: theme.palette.text.primary },
        }}
      />
      <Button
        variant="contained"
        onClick={onSearch}
        disabled={!city.trim()}
        sx={{
          fontWeight: "bold",
          borderRadius: 1,
          textTransform: "none",
        }}
      >
        Get Weather
      </Button>
    </Box>
  );
}
