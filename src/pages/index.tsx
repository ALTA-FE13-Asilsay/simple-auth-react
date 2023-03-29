import { Component } from "react";
import axios from "axios";

import Card from "@/components/Card";
import { Spinner } from "@/components/Loading";

import Layout from "@/components/Layout"; //use default import
import { UserType } from "@/utils/types/user";

interface PropsType {}

interface StateType {
  datas: UserType[];
  loading: boolean;
}

class Home extends Component<PropsType, StateType> {
  // constructor start herea
  constructor(props: PropsType) {
    super(props);
    this.state = {
      // state: default value
      datas: [],
      loading: true,
    };
  }
  // constructor End here

  // side effect, berjalan saat refefres
  componentDidMount(): void {
    this.fetchData();
    // this.fetchAlter();
  }

  fetchData() {
    // let temp: UserType[] = [];
    // for (let i = 1; i <= 12; i++) {
    //   const obj = {
    //     id: i,
    //     first_name: "Jhon",
    //     last_name: "Oka Jhone",
    //     username: `jhon_doe${i}`,
    //     image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    //   };
    //   temp.push(obj);
    // }

    // setTimeout(() => {
    //   this.setState({
    //     datas: temp,
    //     loading: false,
    //   });
    // }, 2500);

    axios
      .get("users")
      .then((response) => {
        const { data } = response.data;
        this.setState({ datas: data });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  fetchAlter() {
    fetch("https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0/users")
      .then((result) => result.json())
      .then((response) => {
        const { data } = response;
        this.setState({ datas: data });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <Layout>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {this.state.loading ? (
            <Spinner />
          ) : (
            this.state.datas.map((data, idx) => {
              return <Card key={data.id} first_name={data.first_name} last_name={data.last_name} username={data.username} image={data.image} />;
            })
          )}
        </div>
      </Layout>
    );
  }
}

export default Home;
