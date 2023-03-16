import { Box } from "@mui/material";
import { HashLoader } from "react-spinners";
import { loadingBox } from "./Loading.module";

const Loading = () => {
  return (
    <Box sx={loadingBox}>
      <HashLoader />
    </Box>
  );
};

export default Loading;
