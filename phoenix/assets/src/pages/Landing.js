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
        <div className="flex flex-col justify-center items-center bg-blue-800 p-8 my-auto">
          <div className="flex flex-row justify-center items-center animate-pulse">
            <img src={logoImg} className="w-64 h-64 animate-pulse" />
            <div className="mt-8 animate-pulse" style={{ fontSize: "12rem" }}>
              Megamind
            </div>
          </div>

          <div className="text-black my-4 text-lg">A memory application</div>
          <GoogleButton route="/dashboard">Login With Google</GoogleButton>
        </div>
      </div>
    </div>
  );
}
