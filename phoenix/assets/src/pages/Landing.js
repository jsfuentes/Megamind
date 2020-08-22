import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { axios } from "src/utils/utils.js";
import Header from "src/components/Header";
import GoogleButton from "src/components/GoogleButton";
const debug = require("debug")("app:Landing");

export default function Landing() {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center container">
          <main>
            <h1 className="text-green-900">Megamind</h1>
            <p className="text-green-200">A memory application</p>
            <GoogleButton variant="inverted-black" route="/dashboard">
              Google Login with Popup
            </GoogleButton>
          </main>
        </div>
      </div>
    </div>
  );
}
