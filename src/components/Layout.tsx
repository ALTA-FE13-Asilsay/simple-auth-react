import { Component, ReactNode } from "react";

import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

class Layout extends Component<Props> {
  render() {
    return (
      <div className="w-full h-screen overflow-auto flex flex-col bg-slate-300 ">
        <Navbar />
        <div className="h-full w-full py-3 px-3 flex  flex-col items-center ">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
