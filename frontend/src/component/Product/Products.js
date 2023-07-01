import React, { Fragment, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { clearErrors, getProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "../Home/ProductCard.js";
import { useParams } from "react-router-dom";
import "./Product.css";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";

const categories = [
  "Footwear",
  "Laptop",
  "SmartPhones",
  "Pants",
  "Shirts",
  "Camera",
];

const Products = () => {
  const [ratings,setRatings] = useState(0)
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
 
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount,
    error,
  } = useSelector((state) => state.products);
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearErrors())
    }
  },[dispatch,error])
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getProduct(keyword, currentPage, price,category,ratings));
  }, [keyword, dispatch, currentPage, price,category,ratings]);
  let count = filteredProductCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products - Ecommerce" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component= "legend">Ratings</Typography>
              <Slider
               value={ratings}
               onChange={(e,newRatings)=>setRatings(newRatings)}
               min={0}
               max={5}
               aria-labelledby="continous-slider"
               valueLabelDisplay="auto"
               />
            </fieldset>
          </div>

          <div className="paginationBox">
            {/* If the number of results per page is less than the total number of products, then render the Pagination component". */}
            {resultPerPage < count && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
