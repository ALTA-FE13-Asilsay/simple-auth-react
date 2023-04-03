import { FC, FormEvent, useEffect, useState, useContext } from "react";
import withReactContent from "sweetalert2-react-content";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";

import { Input } from "@/components/Input";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { useTitle } from "@/utils/hooks";
import { handleAuth } from "@/utils/redux/reducers/reducer";
import Swal from "@/utils/swal";
import { ThemeContexat } from "@/utils/context";

interface objSubmitType {
  username: string;
  password: string;
}

const Login: FC = () => {
  const [objSubmit, setObjSubmit] = useState<objSubmitType>({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const MySwal = withReactContent(Swal);
  useTitle("Login | User Management");
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  const { theme, setTheme } = useContext(ThemeContexat);

  useEffect(() => {
    const isEmpty = Object.values(objSubmit).every((val) => val !== "");
    setIsDisabled(!isEmpty);
  }, [objSubmit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(true);
    axios
      .post("login", objSubmit)
      .then((response) => {
        const { data, message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          icon: "success",
          background: theme === "dark" ? "#475569" : "#f1f5f9",
          color: theme === "dark" ? "#e2e8f0" : "#0f172a",
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setCookie("tkn", data.token);
            setCookie("uname", data.username);
            navigate("/");
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
          icon: "error",
          background: theme === "dark" ? "#475569" : "#f1f5f9",
          color: theme === "dark" ? "#e2e8f0" : "#0f172a",
        });
      })
      .finally(() => setIsDisabled(false));
  }

  return (
    <Layout>
      <form
        className="flex flex-col items-center content-center gap-4 w-[70%] "
        onSubmit={(event) => handleSubmit(event)}
      >
        <img src="/vite.svg" alt="image login" className="w-20 h-20" />
        <p className=" text-xl text-slate-900 dark:text-slate-200 font-bold tracking-wide mb-7">
          Hello Again!
        </p>
        <Input
          placeholder="Username"
          id="input-uname"
          onChange={(event) =>
            setObjSubmit({ ...objSubmit, username: event.target.value })
          }
        />
        <Input
          placeholder="Password"
          id="input-password"
          type="password"
          onChange={(event) =>
            setObjSubmit({ ...objSubmit, password: event.target.value })
          }
        />

        <p className="text-slate-900 dark:text-slate-200 text-sm mb-7">
          Already have and account? Login{" "}
          <Link className="font-semibold" id="nav-register" to="/register">
            here!
          </Link>
        </p>

        <Button
          label="LOGIN"
          id="button-login"
          type="submit"
          disabled={isDisabled}
        />
      </form>
    </Layout>
  );
};

export default Login;

// !objSubmit.username || !objSubmit.password
