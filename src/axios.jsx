import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  base_url: "http://image.tmdb.org/t/p/",
});

export default instance;
