import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/slices/requestSlice";
import RequestCard from "./RequestCard";

const Request = () => {

  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const getRequest = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received/",
        { withCredentials: true }
      );

      dispatch(addRequest(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  if (!requests) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (requests.length === 0) {
    return <h1 className="text-center mt-10">No requests found</h1>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 px-4">
      {requests.map((req) => {
        if (!req || !req.requestId) return null;

        return (
          <RequestCard
            key={req.requestId}
            requestId={req.requestId}   
            user={req.user}
                
          />
        );
      })}
    </div>
  );
};

export default Request;