import axios from "axios";

const KEY = "AIzaSyDMKUBWckBcy-s22M-AIKeWxJ0FzMH_nQ0";

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

const params = {
  part: "snippet",
  maxResults: 10,
  key: KEY,
  regionCode: "JP",
  type: "video",
};

export const fetchPopularDate = async () => {
  return await youtube.get("/videos", {
    params: {
      ...params,
      chart: "mostPopular",
    },
  });
};

export const fetchSelectedDate = async (id) => {
  return await youtube.get("/videos", {
    params: {
      ...params,
      id
    }
  });
};

export const fetchRelatedDate = async (id) => {
  return await youtube.get("/search", {
    params: {
      ...params, 
      relatedToVideoId: id
    }
  })
}
