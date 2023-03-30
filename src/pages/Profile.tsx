import { Component, FormEvent } from "react";
import axios from "axios";

import { Spinner } from "@/components/Loading";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { UserEdit } from "@/utils/types/user";
import { Input } from "@/components/Input";
import Button from "@/components/Button";

interface PropsType {}

interface StateType {
  data: Partial<UserEdit>;
  loading: boolean;
  isEdit: boolean;
  image: string;
  objSubmit: Partial<UserEdit>;
}

class Profile extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      objSubmit: {},
      image: "",
      data: {},
      loading: true,
      isEdit: false,
    };
  }

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData() {
    axios
      .get("users/testing")
      .then((response) => {
        // Akan resolve ketika server memberikan response OK ke Frontend
        const { data } = response.data;
        this.setState({ data: data, image: data.image });
        // console.log(data);
      })
      .catch((error) => {
        // Akan reject ketika server memberikan response failed ke Frontend
        console.log(error);
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  handleChange(value: string | File, key: keyof typeof this.state.objSubmit) {
    let temp = { ...this.state.objSubmit };
    temp[key] = value;
    this.setState({ objSubmit: temp });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    let key: keyof typeof this.state.objSubmit;
    for (key in this.state.objSubmit) {
      formData.append(key, this.state.objSubmit[key]);
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
        this.setState({ isEdit: false });
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => this.fetchData());
  }

  handleEditMode = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  render() {
    return (
      <Layout>
        <div className="flex flex-col items-center">
          <img
            src={this.state.image}
            alt={`${this.state.data.username}'s profile picture `}
            className="w-44 h-44 rounded-full"
          />

          {this.state.isEdit ? (
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <Input
                placeholder="Select Image"
                type="file"
                onChange={(event) => {
                  if (!event.currentTarget.files) {
                    return;
                  }
                  this.setState({
                    image: URL.createObjectURL(event.currentTarget.files[0]),
                  });
                  this.handleChange(event.currentTarget.files[0], "image");
                }}
              />

              <Input
                placeholder="First Name"
                defaultValue={this.state.data.first_name}
                onChange={(event) =>
                  this.handleChange(event.target.value, "first_name")
                }
              />
              <Input
                placeholder="Last Name"
                defaultValue={this.state.data.last_name}
                onChange={(event) =>
                  this.handleChange(event.target.value, "last_name")
                }
              />
              <Input
                placeholder="First Name"
                defaultValue={this.state.data.username}
                onChange={(event) =>
                  this.handleChange(event.target.value, "username")
                }
              />
              <Input
                placeholder="First Name"
                defaultValue={this.state.data.password}
                onChange={(event) =>
                  this.handleChange(event.target.value, "password")
                }
              />
              <Button label="Submit" id="button-submit" type="submit" />
            </form>
          ) : (
            <div>
              <p>
                {this.state.data.first_name} {this.state.data.last_name}
              </p>
              <p>{this.state.data.username}</p>
            </div>
          )}
        </div>

        <Button
          label="Edit Profile"
          id="button-edit"
          onClick={this.handleEditMode}
        />
      </Layout>
    );
  }
}

export default Profile;
