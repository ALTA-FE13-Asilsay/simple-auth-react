import { Component, FormEvent } from "react";
import axios from "axios";

import Layout from "@/components/Layout";
import { Input } from "@/components/Input";
import Button from "@/components/Button";

interface PropsType {}

interface StateType {
  username: string;
  password: string;
  loading: boolean;
}

class Login extends Component<PropsType, StateType> {
  // constructor start herea
  constructor(props: PropsType) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: true,
    };
  }
  // constructor End here

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("login", body)
      .then((response) => {
        const { data } = response;
        console.log(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  render() {
    return (
      // pie carane dicentrkan?
      <Layout>
        <form
          className="flex flex-col items-center gap-4 "
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <img src="/vite.svg" alt="image login" className="w-28 h-28" />
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
          <Button label="Login" id="button-login" />
        </form>
      </Layout>
    );
  }
}

export default Login;
