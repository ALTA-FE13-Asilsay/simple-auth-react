import { Component, FormEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Layout from "@/components/Layout";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import withRouter, { NavigateParam } from "@/utils/navigation";

interface PropsType extends NavigateParam {}

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
      loading: false,
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
        alert(data.message);
        this.props.navigate("/");
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
          className="flex flex-col items-center content-center gap-4 w-[70%] "
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <img src="/vite.svg" alt="image login" className="w-20 h-20" />
          <p className=" text-xl text-slate-900 font-bold tracking-wide mb-7">
            Hello Again!
          </p>
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

          <p className="text-slate-900 text-sm mb-7">
            Already have and account? Login{" "}
            <Link className="font-semibold" to="/register">
              here!
            </Link>
          </p>

          <Button
            label="LOGIN"
            id="button-login"
            type="submit"
            disabled={this.state.username === "" || this.state.password === ""}
          />
        </form>
      </Layout>
    );
  }
}

export default withRouter(Login);
