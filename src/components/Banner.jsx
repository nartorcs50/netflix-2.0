import axios from "../axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";

function Banner() {
  const [moive, setMoive] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNeflixOriginals);
      setMoive(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(moive);

  function truncate(string, num) {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https:/image.tmdb.org/t/p/original/${moive?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {moive?.title || moive?.name || moive?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <p className="banner__description">{truncate(moive?.overview, 150)}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
