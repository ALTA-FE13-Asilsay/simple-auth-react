import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

class Contain extends Component<Props> {
  render() {
    return (
      <div className="w-[80%] h-[90%] md:w-[60%] md:h-[70%] lg:w-[40%] lg:h-[90%] flex flex-col justify-center items-center bg-slate-200 rounded-2xl">
        {this.props.children}
      </div>
    );
  }
}

export default Contain;
