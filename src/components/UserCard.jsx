import axios from "axios"
import { BASE_URL } from "../constants/constants"
import { useDispatch } from "react-redux"
import { removeFeed } from "../utils/slices/feedSlice";



const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const {_id, firstName, lastName, age, gender, about, profileUrl, skills } = user
  const handleSentRequest = async(status,userId)=> {
    try {
         const res = await axios.post(BASE_URL + "/request/send/" + status + "/" +userId,
          {},
          {withCredentials : true},
         )
         dispatch(removeFeed(userId))
         
    } catch (error) {
      console.log(error.message);
      
    }
 

  }
  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="card bg-base-300 w-full max-w-sm shadow-xl">

        {/* Profile Image */}
        <div className="relative">
          {/* Cover Image */}
          <figure className="w-full ">
            <img
              src={profileUrl || "https://via.placeholder.com/400"}
              alt="cover"
              className="w-full h-full object-cover"
            />
          </figure>

          {/* Profile Avatar */}
     
        </div>

        <div className="card-body">

          {/* Name + Age */}
          <h2 className="card-title text-xl">
            {firstName} {lastName}
            {age && <span className="text-sm text-gray-400 ml-2">({age})</span>}
          </h2>

          {/* Gender */}
          {gender && (
            <p className="text-sm text-gray-400 capitalize">
              {gender}
            </p>
          )}

          {/* About */}
          <p className="text-sm mt-2">
            {about || "No description available"}
          </p>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-outline"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 card-actions justify-between">
            <button className="btn btn-outline btn-error " onClick={()=> handleSentRequest("ignored",_id) }>
              Ignore
            </button>
            <button className="btn btn-primary" onClick={()=> handleSentRequest("interested",_id) }>
              Interested
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}


export default UserCard