import { Link } from "react-router";

const ConnectionCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, profileUrl, skills } = user

  return (
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
        <div className="mt-6 card-actions justify-center">
          <Link to={`/chat/${_id}`} className="btn btn-primary w-full">Chat</Link>
        </div>
      </div>
    </div>
  )
}




export default ConnectionCard