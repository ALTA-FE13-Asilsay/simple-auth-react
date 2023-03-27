import { Component } from "react";

import Layout from "../components/Layout";

class Home extends Component {
  render() {
    return (
      <Layout>
        <p className="text-3xl font-bold">THIS HOMEPAGE</p>
        <button>Akses</button>
      </Layout>
    );
  }
}

export default Home;
