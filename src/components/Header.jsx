import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GiNewspaper } from "react-icons/gi";
import { FaHouseUser } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-900 text-white p-1 fixed inset-x-0 bottom-0">
      <nav className="flex justify-between">
        <div className="space-x-4 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 font-bold' : 'hover:text-gray-300'
            }
            end
          >
            News
          </NavLink>

          <NavLink
            to="/filter"
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 font-bold' : 'hover:text-gray-300'
            }
          >
            अपरिग्रह
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/data1"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-bold' : 'hover:text-gray-300'
                }
              >
                निर्देशिका
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-bold' : 'hover:text-gray-300'
                }
              >
                साधर्मिक
              </NavLink>
              <button onClick={logout} className="hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-bold' : 'hover:text-gray-300'
                }
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-bold' : 'hover:text-gray-300'
                }
              >
                Sign In
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
