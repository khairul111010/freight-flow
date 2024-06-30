import ReactDOM from "react-dom/client";
import React from "react";
import AllRoutes from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AllRoutes />
            <Toaster position="top-center" />
        </Provider>
    </React.StrictMode>
);
