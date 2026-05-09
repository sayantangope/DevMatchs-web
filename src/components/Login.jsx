import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../constants/constants";

const Login = () => {
  const [emailId, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && /\d/.test(password);
  };


  const validateFields = () => {
    if (!emailId || !password) {
      return "Email and Password are required";
    }

    if (!validateEmail(emailId)) {
      return "Invalid email format";
    }

    if (!isLogin) {
      if (!firstName || !lastName || !age || !gender) {
        return "All fields are required for signup";
      }

      if (!validatePassword(password)) {
        return "Password must be at least 6 characters and include a number";
      }
    }

    return null;
  };


  const HandleLogin = async () => {
    const validationError = validateFields();
    if (validationError) {
      return setError(validationError);
    }

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Login failed");
      console.log(err?.response?.data || err.message);
    }
  };

 
  const handleSignup = async () => {
    const validationError = validateFields();
    if (validationError) {
      return setError(validationError);
    }

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age,
          gender,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Signup failed");
      console.log(err?.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-start pt-24 bg-base-100 min-h-screen px-4">
      <div className="card bg-base-300 w-full max-w-sm shadow-xl">
        <div className="card-body gap-4">
          <h2 className="card-title justify-center text-2xl mb-2">
            {isLogin ? "Login" : "Signup"}
          </h2>

          {/* Signup fields */}
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full"
              />

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full"
              />

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="mail@site.com"
            value={emailId}
            onChange={(e) => setEmailID(e.target.value)}
            className="input input-bordered w-full"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            className="btn btn-primary w-full mt-2"
            onClick={isLogin ? HandleLogin : handleSignup}
          >
            {isLogin ? "Login" : "Signup"}
          </button>

          {/* Toggle */}
          <p
            className="text-center text-sm mt-2 cursor-pointer text-blue-500"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(""); 
            }}
          >
            {isLogin
              ? "New here? Signup"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;