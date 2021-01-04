import React from "react";

const Home = (props) => {
  return (
    <div className="home">
      <h1>Home</h1>
      <h2>{props.title}</h2>
    </div>
  );
};

export default Home;
