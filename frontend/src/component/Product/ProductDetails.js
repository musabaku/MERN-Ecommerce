import React, { Fragment, useEffect } from "react";
import "./ProductDetails.css";
import { clearErrors, getProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData"
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    
    dispatch(getProductDetails(id));
  }, [dispatch, id]);


  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 21,
    value: product.ratings,
    isHalf: true,
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  options.value = product.ratings;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} - Ecommerce`} />
          <div className="ProductDetails">
            <div className="abcd">
              {product.images &&
                product.images.map((item, i) => (
                  <div key={i}>
                    <img
                      className="ProductImages"
                      src={item.url}
                      alt={`${i}`}
                    />
                  </div>
                ))}
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #id {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews}Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>${product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add To Cart</button>
                </div>

                <p>
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h2 className="reviewsHeading">REVIEWS</h2>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((reviews) => (
                <ReviewCard reviews={reviews} />
              ))}
            </div>
          ) : (
            <div className="noReviews">
              <p>No Reviews Yet</p>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
