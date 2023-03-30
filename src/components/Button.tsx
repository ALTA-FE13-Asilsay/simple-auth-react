import { Component, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

class Button extends Component<Props> {
  render() {
    return (
      <button
        className="bg-sky-700 text-slate-200 font-bold py-2 px-8 w-full
    rounded-lg border border-white hover:bg-sky-600 active:bg-sky-800 disabled:bg-sky-900"
        {...this.props}
      >
        {this.props.label}
      </button>
    );
  }
}

export default Button;
