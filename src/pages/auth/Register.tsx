import { FC, FormEvent, useEffect, useState, useContext } from "react";
import withReactContent from "sweetalert2-react-content";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";

import withRouter, { NavigateParam } from "@/utils/navigation";
import { Input } from "@/components/Input";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { useTitle } from "@/utils/hooks";
import { handleAuth } from "@/utils/redux/reducers/reducer";
import Swal from "@/utils/swal";
import { ThemeContexat } from "@/utils/context";

interface PropsType extends NavigateParam {}

interface objSubmitType {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

const Register: FC = () => {
  // constructor start herea
  const [objSubmit, setObjSubmit] = useState<objSubmitType>({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const MySwal = withReactContent(Swal);
  useTitle("Register | User Management");
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
      .post("register", objSubmit)
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
            navigate("/login");
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
        <img src="/vite.svg" alt="image register" className="w-20 h-20" />
        <p className=" text-xl text-slate-900 dark:text-slate-200 font-bold tracking-wide mb-7">
          Create your account
        </p>
        <div className="flex gap-4 w-full">
          <Input
            placeholder="First Name"
            id="input-fristname"
            onChange={(event) =>
              setObjSubmit({ ...objSubmit, first_name: event.target.value })
            }
          />
          <Input
            placeholder="Last Name"
            id="input-lastname"
            onChange={(event) =>
              setObjSubmit({ ...objSubmit, last_name: event.target.value })
            }
          />
        </div>
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
        <div className="mb-7" />
        <Button
          label="SIGN UP"
          id="button-register"
          type="submit"
          disabled={isDisabled}
        />
      </form>
    </Layout>
  );
};

export default Register;
