import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  username: string;
  first_name: string;
  last_name: string;
}

const Card: FC<Props> = (props) => {
  const { image, username, first_name, last_name } = props;

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
        id="nav-profile"
      >
        {first_name} {last_name}
      </Link>
      <p className="text-sm text-slate-900">{username}</p>
    </div>
  );
};

export default Card;
