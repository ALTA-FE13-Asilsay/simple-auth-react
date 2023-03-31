import { FC, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "@/components/Input";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { useTitle } from "@/utils/hooks";

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
  const navigate = useNavigate();
  useTitle("Login | User Management");

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
        const { data } = response;
        console.log(data);
        alert(data.message);
        navigate("/");
      })
      .catch((error) => {
        alert(error.toString());
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
        <p className=" text-xl text-slate-900 font-bold tracking-wide mb-7">
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

        <p className="text-slate-900 text-sm mb-7">
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
