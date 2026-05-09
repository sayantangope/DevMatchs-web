/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      if (userData) {
        setIsLoading(false);
        return;
      }
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401 || error.status === 401) {
        // Not authenticated — let Home.jsx render the LandingPage instead of hard-redirecting
        return;
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div>
        {userData && <NavBar />}
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {userData && <NavBar />}
      <Outlet />
    </div>
  );
};

export default Body;
