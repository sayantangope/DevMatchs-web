/* eslint-disable no-unused-vars */
/* import React from 'react' */

import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import { Link, useNavigate } from "react-router";
import LandingPage from "./LandingPage";
import { removeUser } from "../utils/slices/userSlice";
import { BASE_URL } from "../constants/constants";

import axios from "axios";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

      dispatch(removeUser());
      navigate("/"); // go to landing page
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="relative z-50">
      <div className="navbar bg-base-300 shadow-sm px-4">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            DevMatch
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              {/* Welcome text */}
              <p className="text-sm font-medium hidden md:block">
                Welcome, <span className="font-semibold">{user.firstName}</span>
              </p>

              {/* Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img alt="User Avatar" src={user.profileUrl} />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile">
                      Profile
                   
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections</Link>
                  </li>
                  <li>
                    <Link to="/requests">Requests</Link>
                  </li>
                   <li>
                    <Link to="/premium">Premium
                       <span className="badge">New</span>
                    </Link>
                  </li>
                  <li onClick={handleLogout}>
                    <Link to={LandingPage}>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
