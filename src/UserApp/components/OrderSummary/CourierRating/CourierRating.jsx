import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetMenuState } from '../../../../slices/menuSlice';
import { resetRestaurantState } from '../../../../slices/restaurantSlice';

import { updateDriverRatingByUser } from "../../../../services/cartService";
import { getDriverProfile } from '../../../../services/driverService';

import likeIcon from '../../../../icons/like-svgrepo-com.svg';
import dislikeIcon from '../../../../icons/dislike-svgrepo-com.svg';
import restphoto from '../../../../img/restaurantPhoto.jpeg';

import classes from './courierRating.module.scss';

const CourierRating = ({ activeDriver, setActiveDriver, cartId, userId, driverId, driverRating }) => {

  console.log("lala", getDriverProfile);

  const dispatch = useDispatch();
  const [courierRating, setCourierRating] = useState(null);

  const handleLikeClick = () => {
    setCourierRating(5);
  };

  const handleDislikeClick = () => {
    setCourierRating(0);
  };

  const submitCourierRating = async () => {
    if (courierRating !== null) {
      try {
        const data = {
          cartId: cartId,
          userId: userId,
          driverId: driverId,
          driverRating: courierRating,
        };
        const response = await updateDriverRatingByUser(data);

        // Handle response as needed
        if (response.ok) {
          // Handle success (e.g., show a success message)
        } else {
          // Handle failure (e.g., show an error message)
        }
      } catch (error) {
        console.error("Error submitting rating:", error);
      }
      dispatch(resetMenuState());
      dispatch(resetRestaurantState());
      //setActive(false);
    } else {
      // Handle if the user hasn't selected a rating (optional)
    }
  };

  return (
    <div className={classes.courierRating__active}>
      {/* <div
    className={active ? classes.restaurantRating__active : classes.confirmModal}
    /> */}
      <div className={classes.__wrapper}>
        <div className={classes.__image}>
          <img src={restphoto} alt="restaurant" />
          <h3>Courier Feedback</h3>
          <p>How did your courier <span>(name)</span> do?</p>
        </div>
        <div className={classes.__icons}>
          <button onClick={handleDislikeClick}>
            <img src={dislikeIcon} alt="dislike" />
          </button>
          <button onClick={handleLikeClick}>
            <img src={likeIcon} alt="like" />
          </button>
        </div>
        <div className={classes.__text}>
          <p>Couriers are responsible for your order's transportation and handling.</p>
        </div>

        <Link to="../main">
          <div className={classes.__backButton} onClick={submitCourierRating}>
            <h4>Submit and Back to Menu</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourierRating;
