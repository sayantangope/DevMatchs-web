import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/slices/requestSlice";

const RequestCard = ({ user, requestId}) => {
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, about, profileUrl, skills } = user;
console.log(requestId);
  const reviewRequest = async (status) => {
    
    
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}` +`/`+ requestId,
        {},
        { withCredentials: true }
        
      );
  dispatch(removeRequest(requestId));

      console.log("Request " + status);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-full max-w-sm shadow-xl">

      <figure className="w-full">
        <img
          src={profileUrl || "https://via.placeholder.com/400"}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-xl">
          {firstName} {lastName}
          {age && <span className="text-sm text-gray-400 ml-2">({age})</span>}
        </h2>

        {gender && (
          <p className="text-sm text-gray-400 capitalize">
            {gender}
          </p>
        )}

        <p className="text-sm mt-2">
          {about || "No description available"}
        </p>

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, index) => (
              <span key={index} className="badge badge-outline">
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 card-actions justify-between">
          <button 
            className="btn btn-outline btn-error"
            onClick={() => reviewRequest("rejected")}
          >
            Reject
          </button>

          <button 
            className="btn btn-primary"
            onClick={() => reviewRequest("accepted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;