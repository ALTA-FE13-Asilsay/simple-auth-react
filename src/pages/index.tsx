import { FC, useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "@/components/Loading";
import { UserType } from "@/utils/types/user";
import Layout from "@/components/Layout";
import { useTitle } from "@/utils/hooks";
import Card from "@/components/Card";

const Home: FC = () => {
  // constructor start herea

  const [datas, setDatas] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useTitle("Homepage | User Management");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("users")
      .then((response) => {
        const { data } = response.data;
        setDatas(data);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  function fetchAlter() {
    fetch(
      "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0/users"
    )
      .then((result) => result.json())
      .then((response) => {
        const { data } = response;
        setDatas(data);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 w-[85%] w-lg-[80%] h-[90%] overflow-auto">
        <p className=" text-xl text-slate-900 font-bold tracking-wider mb-5">
          PROFILES:
        </p>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 w-full">
          {loading ? (
            <Spinner />
          ) : (
            datas.map((data, idx) => {
              return (
                <Card
                  key={data.id}
                  first_name={data.first_name}
                  last_name={data.last_name}
                  username={data.username}
                  image={data.image}
                />
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
