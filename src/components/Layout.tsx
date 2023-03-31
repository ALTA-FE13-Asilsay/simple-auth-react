import { FC, ReactNode } from "react";

import Navbar from "./Navbar";
import Contain from "./Contain";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="w-full h-screen overflow-auto flex flex-col bg-gradient-to-r from-[#f0c27b] to-[#4b1248]">
      <Navbar />
      <div className="h-full w-full py-3 px-3 flex flex-col items-center justify-center ">
        <Contain>{props.children}</Contain>
      </div>
    </div>
  );
};

export default Layout;
