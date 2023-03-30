import { Component, ReactNode } from "react";

import Navbar from "./Navbar";
import Contain from "./Contain";

interface Props {
  children: ReactNode;
}

class Layout extends Component<Props> {
  render() {
    return (
      <div className="w-full h-screen overflow-auto flex flex-col bg-gradient-to-r from-sky-500 to-indigo-500">
        <Navbar />
        <div className="h-full w-full py-3 px-3 flex flex-col items-center justify-center ">
          <Contain>{this.props.children}</Contain>
        </div>
      </div>
    );
  }
}

export default Layout;
