import React, { Component } from "react";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  username: string;
  first_name: string;
  last_name: string;
}

class Card extends Component<Props> {
  render() {
    const { image, username, first_name, last_name } = this.props;
    /*
    const image = this.props.image
    const username = this.props.username
    const first_name = this.props.first_name
    const last_name = this.props.last_name
    */

    return (
      <div className="flex flex-col items-center border-2 border-slate-50 rounded-lg p-2">
        <img
          src={image}
          alt={`${username}'s picture`}
          className="rounded-full w-20 aspect-square mb-3"
        />
        <Link
          className="font-semibold tracking-wide text-slate-900"
          to={`profile/${username}`}
        >
          {first_name} {last_name}
        </Link>
        <p className="text-sm text-slate-900">{username}</p>
      </div>
    );
  }
}

export default Card;
