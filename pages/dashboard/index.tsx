import AppContainer from "@/components/AppContainer/AppContainer";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <AppContainer>
      <Box
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>Hello Dashboard!</Typography>
      </Box>
    </AppContainer>
  );
}
