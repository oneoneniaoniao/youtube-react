import React, { useEffect, useContext } from "react";
import Layout from "../Components/Layout/Layout";
import { fetchPopularDate } from "../apis/index";
import { Store } from "../store/index";
import {VideoGridItem } from "../Components/VideoGridItem/VideoGridItem"
import {VideoGrid } from "../Components/VideoGrid/VideoGrid"

const Top = () => {
  const { globalState, setGlobalState } = useContext(Store);
  useEffect(() => {
    fetchPopularDate().then((res) => {
      console.log("data", res);
      setGlobalState({
        type: "SET_POPULAR",
        payload: { popular: res.data.items },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <VideoGrid>
        {globalState.popular &&
          globalState.popular.map((popular) => {
            return (
              <VideoGridItem id={popular.id} key={popular.id} src={popular.snippet.thumbnails.medium.url} title={popular.snippet.title} />
            );
          })}
      </VideoGrid>
    </Layout>
  );
};

export default Top;
