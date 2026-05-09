

const ProfileCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, profileUrl, skills } = user;

  return (
    <div className="flex justify-center">
      <div className="card bg-base-200 w-full shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl overflow-hidden">

        {/* Cover + Avatar */}
        <div className="relative">
          {/* Cover Image (Top Full Width) */}
          <figure className="w-full ">
            <img
              src={profileUrl || "https://via.placeholder.com/400"}
              alt="cover"
              className="w-full h-full object-cover"
            />
          </figure>

          {/* Profile Avatar */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={profileUrl || "https://via.placeholder.com/150"}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-base-200 object-cover shadow-md"
            />
          </div>
        </div>

        {/* Body */}
        <div className="card-body items-center text-center mt-12">

          {/* Name + Age */}
          <h2 className="card-title text-xl font-semibold">
            {firstName} {lastName}
            {age && (
              <span className="text-sm text-gray-400 ml-1">
                ({age})
              </span>
            )}
          </h2>

          {/* Gender */}
          {gender && (
            <p className="text-sm text-gray-400 capitalize">
              {gender}
            </p>
          )}

          {/* About */}
          <p className="text-sm mt-2 text-gray-500 px-4">
            {about || "No description available"}
          </p>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-outline px-3 py-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;