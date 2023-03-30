import { Component, FormEvent } from "react";
import axios from "axios";

import withRouter, { NavigateParam } from "@/utils/navigation";
import Layout from "@/components/Layout";
import { Input } from "@/components/Input";
import Button from "@/components/Button";

interface PropsType extends NavigateParam {}

interface StateType {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  loading: boolean;
}

class Register extends Component<PropsType, StateType> {
  // constructor start herea
  constructor(props: PropsType) {
    super(props);
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      loading: false,
    };
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    };
    axios
      .post("register", body)
      .then((response) => {
        const { data } = response;
        alert(data.message);
        console.log(data);
        this.props.navigate(`/profile/testing`);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  render() {
    return (
      <Layout>
        <form
          className="flex flex-col items-center content-center gap-4 w-[70%] "
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <img src="/vite.svg" alt="image register" className="w-20 h-20" />
          <p className=" text-xl text-slate-900 font-bold tracking-wide mb-7">
            Create your account
          </p>
          <div className="flex gap-4">
            <Input
              placeholder="First Name"
              id="input-fristname"
              onChange={(event) =>
                this.setState({ first_name: event.target.value })
              }
            />
            <Input
              placeholder="Last Name"
              id="input-lastname"
              onChange={(event) =>
                this.setState({ last_name: event.target.value })
              }
            />
          </div>
          <Input
            placeholder="Username"
            id="input-uname"
            onChange={(event) =>
              this.setState({ username: event.target.value })
            }
          />
          <Input
            placeholder="Password"
            id="input-password"
            type="password"
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
          <div className="mb-7" />
          <Button
            label="SIGN UP"
            id="button-register"
            type="submit"
            disabled={
              this.state.username === "" ||
              this.state.password === "" ||
              this.state.first_name === "" ||
              this.state.last_name === ""
            }
          />
        </form>
      </Layout>
    );
  }
}

export default withRouter(Register);

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
