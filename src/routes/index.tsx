import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { FC, useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";

import Register from "@/pages/auth/Register";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Profile from "@/pages/Profile";
import Home from "@/pages";

import { handleAuth } from "@/utils/redux/reducers/reducer";
import { ThemeContexat } from "@/utils/context";

axios.defaults.baseURL = "https://hells-kitchen.onrender.com/api/v1";

const Router: FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  const [cookie] = useCookies(["tkn", "uname"]);
  const dispatch = useDispatch();
  const getToken = cookie.tkn;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: getToken ? <Navigate to="/" /> : <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/register",
      element: getToken ? <Navigate to="/" /> : <Register />,
      errorElement: <NotFound />,
    },
    {
      path: "/profile/:username",
      element: <Profile />,
      errorElement: <NotFound />,
    },
  ]);

  useEffect(() => {
    if (getToken) {
      dispatch(
        handleAuth({ isLoggedIn: true, uname: cookie.uname, token: getToken })
      );
    } else {
      dispatch(handleAuth({ isLoggedIn: false, uname: "", token: "" }));
    }
  }, [cookie]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContexat.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContexat.Provider>
  );
};

export default Router;
