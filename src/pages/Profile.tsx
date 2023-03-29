import { Component } from "react";
import axios from "axios";

import { Spinner } from "@/components/Loading";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { UserType } from "@/utils/types/user";

interface PropsType {}

interface StateType {
  data: Partial<UserType>;
  loading: boolean;
}

class Profile extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      data: {},
      loading: true,
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
        this.setState({ data });
        // console.log(data);
      })
      .catch((error) => {
        // Akan reject ketika server memberikan response failed ke Frontend
        console.log(error);
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { id, image, username, first_name, last_name } = this.state.data;

    // tulis destructuring dari state data agar penulisan code jadi lebih ringkas
    return (
      <Layout>
        <div>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <Card
              key={id} // <~~ wajib ada sebagai pengenal satu sama lain
              first_name={first_name}
              last_name={last_name}
              username={username}
              image={image}
            />
          )}
        </div>
      </Layout>
    );
  }
}

export default Profile;
