import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
const product = {
  name: "Green Tshirt",
  images: [{ url:"https://i.ibb.co/fdDd4gr/muj-540-x-718.jpg" }],
  price: "$3000",
  _id: "Musab",
};
const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome To Ecommerce Website</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">

      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />

      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />

      </div>
    </Fragment>
  );
};

export default Home;
