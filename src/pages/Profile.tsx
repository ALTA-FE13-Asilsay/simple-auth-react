import { FC, FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "@/utils/types/redux";
import { UserEdit } from "@/utils/types/user";
import { Input } from "@/components/Input";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { useTitle } from "@/utils/hooks";
import Swal from "@/utils/swal";

interface StateType {
  data: Partial<UserEdit>;
  loading: boolean;
  isEdit: boolean;
  image: string;
  objSubmit: Partial<UserEdit>;
}

const Profile: FC = () => {
  const { token, uname } = useSelector((state: RootState) => state.data);

  const [objSubmit, setObjSubmit] = useState<Partial<UserEdit>>({});
  const [data, setData] = useState<Partial<UserEdit>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const params = useParams();
  const MySwal = withReactContent(Swal);
  const [, , removeCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const { username: uname } = params;

    axios
      .get(`users/${uname}`)
      .then((response) => {
        const { data } = response.data;
        document.title = `${data.username} | User Management`;
        setData(data);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  function handleChange(value: string | File, key: keyof typeof objSubmit) {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    axios
      .put("users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          icon: "success",
          showCancelButton: false,
        });
        setObjSubmit({});
        setIsEdit(false);
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
          icon: "error",
        });
      })
      .finally(() => fetchData());
  }

  const handleDeleteAccount = () => {
    axios
      .delete("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          title: "Delete Account",
          text: "Are you sure?",
          icon: "warning",
        }).then((result) => {
          if (result.isConfirmed) {
            removeCookie("tkn");
            removeCookie("uname");
            navigate("/");
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
          icon: "error",
        });
      });
  };

  return (
    <Layout>
      <div className="w-[70%]">
        <div className="flex flex-col items-center gap-4 mb-7">
          <img
            src={data.image}
            alt={`${data.username}'s profile picture `}
            className="w-40 h-40 rounded-full"
            id="image-profile"
          />

          {isEdit ? (
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="flex flex-col gap-3 w-full h-full">
                <Input
                  placeholder="Select Image"
                  type="file"
                  id="input-fileimage"
                  onChange={(event) => {
                    if (!event.currentTarget.files) {
                      return;
                    }
                    setImage(URL.createObjectURL(event.currentTarget.files[0]));

                    handleChange(event.currentTarget.files[0], "image");
                  }}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="First Name"
                    id="input-firstname"
                    defaultValue={data.first_name}
                    onChange={(event) =>
                      handleChange(event.target.value, "first_name")
                    }
                  />
                  <Input
                    placeholder="Last Name"
                    id="input-lastname"
                    defaultValue={data.last_name}
                    onChange={(event) =>
                      handleChange(event.target.value, "last_name")
                    }
                  />
                </div>
                <Input
                  placeholder="Password"
                  id="input-password"
                  defaultValue={data.password}
                  onChange={(event) =>
                    handleChange(event.target.value, "password")
                  }
                />
                <Button label="Submit" id="button-submit" type="submit" />
              </div>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-slate-900 dark:text-slate-200 font-semibold tracking-wider">
                {data.first_name} {data.last_name}
              </p>
              <p className="text-slate-900 dark:text-slate-200 tracking-wide">
                {data.username}
              </p>
            </div>
          )}
        </div>

        {uname === params.username && (
          <>
            <Button
              label="Edit Profile"
              id="button-edit"
              onClick={() => setIsEdit(!isEdit)}
            />
            <Button
              label="Delete Account"
              id="button-delete"
              onClick={() => handleDeleteAccount()}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
