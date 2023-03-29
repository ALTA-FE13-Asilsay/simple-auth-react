import { Component } from "react";

import Layout from "@/components/Layout";
import { Input } from "@/components/Input";
import Button from "@/components/Button";

class Register extends Component {
  render() {
    return (
      // pie carane dicentrkan?
      <Layout>
        <form className="flex flex-col items-center justify-center gap-4 ">
          <img src="/vite.svg" alt="image login" className="w-28 h-28" />
          <Input placeholder="First Name" id="input-firstname" />
          <Input placeholder="Last Name" id="input-lastname" />

          <Input placeholder="Username" id="input-uname" />
          <Input placeholder="Password" id="input-password" type="password" />
          <Input placeholder="Re Type Password" id="input-password" type="password" />
          <Button label="Login" id="button-login" />
        </form>
      </Layout>
    );
  }
}

export default Register;
