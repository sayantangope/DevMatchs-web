import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../constants/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

const EditProfile = ({ user = {}, onUpdate }) => {
 
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [profileUrl, setProfileUrl] = useState(user?.profileUrl || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const handleSave = async () => {
    try {
      setError("");

     
      if (!firstName || !lastName) {
        return setError("First name and last name are required");
      }

      if (age && (age < 18 || age > 70)) {
        return setError("Age must be between 18 and 70");
      }

      setLoading(true);

      const formattedSkills = skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const payload = {
        firstName,
        lastName,
        age,
        gender,
        about,
        profileUrl,
        skills: formattedSkills,
      };

      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));

      alert("Profile updated successfully 🎉");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-200 w-full shadow-2xl hover:shadow-xl transition duration-300">
      <div className="card-body p-8 gap-5">

        {/* Heading */}
        <h2 className="card-title justify-center text-2xl font-bold mb-2">
          Edit Profile
        </h2>

        {/* First Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              onUpdate?.({ firstName: e.target.value, lastName, age, gender, about, profileUrl, skills: skills.split(",").map(s => s.trim()).filter(s => s) });
            }}
          />
        </div>

        {/* Last Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              onUpdate?.({ firstName, lastName: e.target.value, age, gender, about, profileUrl, skills: skills.split(",").map(s => s.trim()).filter(s => s) });
            }}
          />
        </div>

        {/* Age */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              onUpdate?.({ firstName, lastName, age: e.target.value, gender, about, profileUrl, skills: skills.split(",").map(s => s.trim()).filter(s => s) });
            }}
            min="18"
            max="70"
          />
        </div>

        {/* Gender */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select
            className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value.toLowerCase());
              onUpdate?.({ firstName, lastName, age, gender: e.target.value.toLowerCase(), about, profileUrl, skills: skills.split(",").map(s => s.trim()).filter(s => s) });
            }}
          >
            <option value="" disabled>Choose gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Profile URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile Image URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            value={profileUrl}
            onChange={(e) => {
              setProfileUrl(e.target.value);
              onUpdate?.({ firstName, lastName, age, gender, about, profileUrl: e.target.value, skills: skills.split(",").map(s => s.trim()).filter(s => s) });
            }}
          />

          {/* Live Preview */}
          {profileUrl && (
            <div className="flex justify-center mt-3">
              <img
                src={profileUrl}
                alt="preview"
                className="w-16 h-16 rounded-full object-cover border"
              />
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Skills</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            value={skills}
            onChange={(e) => {
              setSkills(e.target.value);
              onUpdate?.({ firstName, lastName, age, gender, about, profileUrl, skills: e.target.value.split(",").map(s => s.trim()).filter(s => s) });
            }}
            placeholder="e.g. React, Node.js, MongoDB"
          />
        </div>

        {/* About */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">About</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
              onUpdate?.({ firstName, lastName, age, gender, about: e.target.value, profileUrl, skills: skills.split(",").map(s => s.trim()).filter(s => s) });
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-error text-sm text-center">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="btn btn-primary w-full mt-2 hover:scale-[1.02] transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
};

export default EditProfile;