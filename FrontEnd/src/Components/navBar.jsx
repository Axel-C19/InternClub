import React from "react";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaTrophy, FaSignOutAlt } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { CgProfile } from "react-icons/cg";

const NavButton = ({ icon, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 rounded-md flex items-center space-x-2"
  >
    {icon}
  </button>
);

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex h-screen">
      <div className="bg-[#28272f] w-10 h-full px-2 py-6 flex flex-col items-center">
        {/* Empty div for the thin color strip */}
      </div>
      <div className="bg-[#d9d9d9] text-white w-30 h-full px-4 py-6 flex flex-col justify-between items-center">
        <div className="flex items-center justify-start mt-2 mb-8">
          <Link href="/main">
            <img
              className="w-12"
              src="/src/assets/clubInternLogo.png"
              alt="ClubInternLogo"
            />
          </Link>
        </div>
        <div className="flex flex-col space-y-12 items-center justify-center flex-grow">
          <Link href="/calendary">
            <NavButton icon={<FaCalendarAlt size={28} />} />
          </Link>
          <Link href="/challenge">
            <NavButton icon={<FaTrophy size={28} />} />
          </Link>
          <Link href="/leetcode">
            <NavButton icon={<SiLeetcode size={28} />} />
          </Link>
          <Link href="/profile">
            <NavButton icon={<CgProfile size={28} />} />
          </Link>
        </div>
        <Link href="/">
          <NavButton icon={<FaSignOutAlt size={24} />} onClick={handleLogout} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
