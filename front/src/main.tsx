import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import App from "./App.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./shared/constants.ts";

const darkTheme = createTheme({
  palette: {mode: 'dark'}
});

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <CssBaseline />

          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </GoogleOAuthProvider>
);
