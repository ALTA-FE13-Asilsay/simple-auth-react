import { FC, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import withRouter, { NavigateParam } from "@/utils/navigation";
import { Input } from "@/components/Input";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { useTitle } from "@/utils/hooks";

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
  const navigate = useNavigate();
  useTitle("Register | User Management");

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
        const { data } = response;
        alert(data.message);
        console.log(data);
        navigate(`/profile/testing`);
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
        <img src="/vite.svg" alt="image register" className="w-20 h-20" />
        <p className=" text-xl text-slate-900 font-bold tracking-wide mb-7">
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

// <Layout>
//   <form className="flex flex-col items-center justify-center gap-4 ">
//     <img src="/vite.svg" alt="image login" className="w-28 h-28" />
//     <Input placeholder="First Name" id="input-firstname" />
//     <Input placeholder="Last Name" id="input-lastname" />

//     <Input placeholder="Username" id="input-uname" />
//     <Input placeholder="Password" id="input-password" type="password" />
//     <Input placeholder="Re Type Password" id="input-password" type="password" />
//     <Button label="Login" id="button-login" />
//   </form>
// </Layout>
