import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/navBar";

export default function Calendary() {
  return (
    <div className="flex bg-[#28272f]">
      <Navbar />
      <div className="flex bg-[#28272f] text-white">
        <h1>Proximamente...</h1>
      </div>
    </div>
  );
}
