import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { FC } from "react";
import axios from "axios";

import Home from "@/pages";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0";

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <NotFound />,
    },
    {
      path: "/profile/:username",
      element: <Profile />,
      errorElement: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
