import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/FrontPage/Layout";
import Login from "./Components/FrontPage/Login";
import Signup from "./Components/FrontPage/Signup";
import "./index.css";
import DashLayout from "./Components/Dashboard/DashLayout";
import Plant, {loader as recordsLoader} from "./Components/Dashboard/Plant";
import CreateRecord from "./Components/Dashboard/CreateRecord";
import AI, {loader as recordLoader} from "./Components/Dashboard/AI";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,

      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashLayout />,
    children: [
      {
        path: "plants/:plantId/*",
        element: <Plant />,
        loader:({params})=> recordsLoader(params.plantId),
        children: [
          {
            path: "ai/:recordId",
            element: <AI />,
            loader: ({params}) => recordLoader(params.plantId, params.recordId),
          },
        ],
      },
      {
        path: "recordform/:plantId",
        element: <CreateRecord />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);