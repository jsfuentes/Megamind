import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { axios } from "src/utils/utils.js";
import logoImg from "src/img/logo.png";
import Header from "src/components/Header";
import GoogleButton from "src/components/GoogleButton";
const debug = require("debug")("app:Landing");

export default function Landing() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center container mx-auto">
        <div className="flex flex-col justify-center items-center bg-blue-700 p-4 my-auto">
          <div className="flex flex-row justify-center items-center">
            <img src={logoImg} className="w-64 h-64" />
            <div className="mt-8" style={{ fontSize: "12rem" }}>
              Megamind
            </div>
          </div>

          <div className="text-green-200 my-4">A memory application</div>
          <GoogleButton variant="inverted-black" route="/dashboard">
            Login With Google
          </GoogleButton>
        </div>
      </div>
    </div>
  );
}
