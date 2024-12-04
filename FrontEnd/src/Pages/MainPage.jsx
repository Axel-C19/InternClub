import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/navBar";

export default function LandingPage() {
  return (
    <div className="flex bg-[#28272f]">
      <Navbar />
      <div className="flex bg-[#28272f] text-white">
        <h1>Bienvenido</h1>
      </div>
    </div>
  );
}
