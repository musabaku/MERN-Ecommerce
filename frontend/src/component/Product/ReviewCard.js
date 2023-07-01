import React from 'react'
import ReactStars from "react-rating-stars-component";
import profilePic from "../../images/Profile.png"
const ReviewCard = ({reviews}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 21,
        value:reviews.rating,
        isHalf: true,
      };
  return (
    <div className='reviewcard'>
        <img src={profilePic} alt='pic' />
        <p>{reviews.name}</p>
        <ReactStars {...options} />
        <span>{reviews.comment}</span>
    </div>
  )
}

export default ReviewCard