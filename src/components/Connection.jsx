/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import { addFeed } from "../utils/slices/feedSlice";
import { showConnection } from "../utils/slices/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connection = () => {
    const connectionData = useSelector(store => store.connection)
    const dispatch = useDispatch()
  const getConnection = async () => {
    try {
     const res = await axios.get(BASE_URL + "/user/connections", {
  withCredentials: true,
})
    dispatch(showConnection(res.data.data))
    
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getConnection();
  }, []);


  if (connectionData === null) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (connectionData.length === 0) {
    return <h1 className="text-center mt-10">No connections found</h1>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 px-4">
      {connectionData.map((user) => {
        if (!user || !user._id) return null;
        return <ConnectionCard key={user._id} user={user} />;
      })}
    </div>
  );
};

export default Connection;
