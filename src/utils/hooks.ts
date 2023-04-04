import { useEffect } from "react";
import { useState } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    const pervTitle = document.title;
    document.title = title;
    return () => {
      document.title = pervTitle;
    };
  });
}

export function useFetchGet(url: string) {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, [url]);

  function fetchData() {
    fetch(url)
      .then((result) => result.json())
      .then((response) => setData(response));
  }

  return [data];
}
