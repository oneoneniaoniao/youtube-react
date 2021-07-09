import React, { useEffect, useContext } from "react";
import { Store } from "../../store/index";
import { fetchRelatedDate } from "../../apis/index";
import SideListItem from "../SideListItem/SideListItem";
import Style from "./SideList.module.scss";

const SideList = () => {
  const { globalState, setGlobalState } = useContext(Store)
  const setRelatedVideo = async (id) => {
    await fetchRelatedDate(id).then((res) => {
      setGlobalState({
        type: "SET_RELATED",
        payload: { related: res.data.items },
      });
    });
  };
  useEffect(() => {
    setRelatedVideo(globalState.selected.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState.selected]);
  return (
    <div className={Style.sidenav}>
      {console.log("data:", globalState.related) }
      {
      globalState.related ? globalState.related.map((video) => {
          return (
            <SideListItem
              id={video.id.videoId}
              key={video.id.videoId}
              src={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}
            />
          );
        }) : (
        <span>No Data</span>
      )}
    </div>
  );
};

export default SideList;
