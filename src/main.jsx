// Entry point, sets up Thirdweb provider and routing

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BinanceTestnet } from "@thirdweb-dev/chains";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThirdwebProvider activeChain={BinanceTestnet} clientId="b602f4768b43d962c6d5b0d3b37a2097">
      <App />
    </ThirdwebProvider>
  </BrowserRouter>
);