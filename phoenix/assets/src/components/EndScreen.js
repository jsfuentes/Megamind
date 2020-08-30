import React, { useState } from "react";
import ProgressBar from './ProgressBar'

export default function EndScreen() {
    return (
      <div>
        <ProgressBar />
        <div className="w-full flex items-center justify-center">
          <img src="https://media.tenor.com/images/3439dd41fd856d66abd1ee4cd42e7670/tenor.gif" />
        </div>
      </div>
    );
  }
  
