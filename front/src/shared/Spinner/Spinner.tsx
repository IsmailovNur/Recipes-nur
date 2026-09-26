import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import type { FC } from "react";

interface SpinnerProps {
  isLoading: boolean;
}

export const Spinner: FC<SpinnerProps> = ({isLoading}) => {
  return (
    <>
      {isLoading && <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={60} />
      </Box>}

    </>
  );
};