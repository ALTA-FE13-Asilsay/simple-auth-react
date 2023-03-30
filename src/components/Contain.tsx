import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

class Contain extends Component<Props> {
  render() {
    return (
      <div className="w-[40%] h-[60%] flex flex-col justify-center items-center bg-stone-200 rounded-2xl ">
        {this.props.children}
      </div>
    );
  }
}

export default Contain;
