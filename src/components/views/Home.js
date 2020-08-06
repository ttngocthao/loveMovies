import React from "react";

const Home = (props) => {
  return (
    <div>
      <h1>This is home page</h1>

      <h2>List of movies here</h2>
      <ul>
        <li>
          <h4>Reign - @Netflix</h4>
          <h5>Genres: Drama series, history</h5>
          <h5>4seasons</h5>
          <h5>Finished</h5>
          <img
            style={{ maxWidth: "200px" }}
            src="https://m.media-amazon.com/images/M/MV5BMjEwMDgzNjA1Ml5BMl5BanBnXkFtZTgwNjYyNDUzMTI@._V1_.jpg"
            alt=""
          />
          <h6>Post by Thao</h6>
          <div>
            Thao's view about this: Commodo incididunt irure dolore mollit. Do
            consectetur consectetur magna reprehenderit. Culpa consequat in est
            commodo minim in qui dolore mollit amet. Velit deserunt mollit in
            velit anim ipsum voluptate Lorem ut do exercitation in id mollit.
          </div>
        </li>
      </ul>
    </div>
  );
};

Home.propTypes = {};

export default Home;
