import { FC, FormEvent, useEffect, useState } from "react";
import axios from "axios";

import { UserEdit } from "@/utils/types/user";
import { useParams } from "react-router-dom";
import { Input } from "@/components/Input";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { useTitle } from "@/utils/hooks";

interface StateType {
  data: Partial<UserEdit>;
  loading: boolean;
  isEdit: boolean;
  image: string;
  objSubmit: Partial<UserEdit>;
}

const Profile: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<UserEdit>>({});
  const [data, setData] = useState<Partial<UserEdit>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");
  const [isEdit, setisEdit] = useState<boolean>(false);
  const params = useParams();
  useTitle("profile: testing | User Management");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const { username: uname } = params;

    axios
      .get(`users/${uname}`)
      .then((response) => {
        const { data } = response.data;

        setData(data);
        // console.log(data);
      })
      .catch((error) => {
        // Akan reject ketika server memberikan response failed ke Frontend
        console.log(error);
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
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        setisEdit(false);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => fetchData());
  }

  const handleEditMode = () => {
    setisEdit(!isEdit);
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
              <div className="flex flex-col gap-4 w-full">
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
                <div className="flex gap-3">
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
                  placeholder="Username"
                  id="input-username"
                  defaultValue={data.username}
                  onChange={(event) =>
                    handleChange(event.target.value, "username")
                  }
                />
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
              <p className="text-slate-900 font-semibold tracking-wider">
                {data.first_name} {data.last_name}
              </p>
              <p className="text-slate-900 tracking-wide">{data.username}</p>
            </div>
          )}
        </div>

        <Button
          label="Edit Profile"
          id="button-edit"
          onClick={handleEditMode}
        />
      </div>
    </Layout>
  );
};

export default Profile;
