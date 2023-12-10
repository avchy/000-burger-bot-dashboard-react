import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme"; // Импортируйте тему из нового файла

// const domain = process.env.REACT_APP_AUTH0_DOMAIN
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

const domain = "dev-axo1nxn2r4rtf2iq.us.auth0.com";
const clientId = "NHfpRMaT5rV9umhTrJU8DeCqkk7dByT8";

// Получаем ширину устройства
const deviceWidth = window.innerWidth;
// console.log("deviceWidth111", deviceWidth);
// Получаем ширину страницы
const pageWidth = document.documentElement.scrollWidth;
// console.log("pageWidth111", pageWidth);
// Если ширина страницы больше ширины устройства, то можно установить ширину страницы равной ширине устройства
if (pageWidth > deviceWidth) {
  document.documentElement.style.width = `${deviceWidth}px`;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
