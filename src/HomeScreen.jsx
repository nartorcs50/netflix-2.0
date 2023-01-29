import React from "react";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import Row from "./components/Row";
import requests from "./Requests";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />

      <Banner />

      <Row title="NETFLIX ORIGINALS"  />
    </div>
  );
}

export default HomeScreen;
