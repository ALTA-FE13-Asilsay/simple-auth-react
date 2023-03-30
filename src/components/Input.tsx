import { Component, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export class Input extends Component<InputHTMLAttributes<HTMLInputElement>> {
  render() {
    return (
      <input
        className="border rounded-lg bg-slate-300 text-slate-900 p-2 focus:outline-none focus:border-sky-800 focus:ring-1 focus:ring-sky-800 w-full transition ease-in-out duration-300 "
        {...this.props}
      />
    );
  }
}

export class TextArea extends Component<
  TextareaHTMLAttributes<HTMLTextAreaElement>
> {
  render() {
    return (
      <textarea
        className="border rounded-lg bg-slate-300 text-slate-900 p-2 focus:outline-none focus:border-sky-800 focus:ring-1 focus:ring-sky-800 w-full transition ease-in-out duration-300 "
        {...this.props}
      />
    );
  }
}
