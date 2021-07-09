import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { fetchSelectedDate } from "../../apis/index";
import { Store } from "../../store/index";
import VideoPlay from "../VideoPlay/VideoPlay";
import Style from "./VideoDetail.module.scss";
import Linkify from "react-linkify";

const VideoDetail = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const location = useLocation();
  const setSelectedVideo = async () => {
    // location.searchにはurlの？マーク以降がstringとして格納されている
    // URLSearchParamsに入れることでstringからdataを取得しやすいようにobjectに変更してくれる
    const searchParams = new URLSearchParams(location.search);
    // idはv=〜という形で格納されているので
    const id = searchParams.get("v");
    console.log("id", id);
    await fetchSelectedDate(id).then((res) => {
      const item = res.data.items.shift();
      setGlobalState({ type: "SET_SELECTED", payload: { selected: item } });
      console.log("res", res);
    });
  };
  useEffect(() => {
    setSelectedVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return globalState.selected && globalState.selected.id ? (
    <div className={Style.wrap}>
      <VideoPlay id={globalState.selected.id} />
      <p>{globalState.selected.snippet.title}</p>
      <hr />
      <Linkify>
        <pre>{globalState.selected.snippet.description}</pre>
      </Linkify>
    </div>
  ) : (
    <span>No Data</span>
  );
};

export default VideoDetail;
