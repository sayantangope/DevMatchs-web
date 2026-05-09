/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { addFeed } from "../utils/slices/feedSlice"; // make sure you have this

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      // avoid refetching if already present
      if (feed && feed.length > 0) return;

      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      // Handle both { data: [...] } and direct array response shapes
      const feedData = Array.isArray(res.data) ? res.data : res.data?.data;
      dispatch(addFeed(feedData));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div>
      <UserCard user={feed[0]}/>
    </div>
  );
};

export default Feed;