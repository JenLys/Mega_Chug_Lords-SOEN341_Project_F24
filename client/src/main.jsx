import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import HelloWorld from "./components/HelloWorld";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <HelloWorld /> }],
  },

  // Example pathing:
  // {
  //   path: "/",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <RecordList />,
  //     },
  //   ],
  // },
  // {
  //   path: "/edit/:id",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/edit/:id",
  //       element: <Record />,
  //     },
  //   ],
  // },
  // {
  //   path: "/create",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/create",
  //       element: <Record />,
  //     },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
