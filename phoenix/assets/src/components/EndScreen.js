import React, { useState } from "react";
import PropTypes from "prop-types";

import HappyGif from "src/components/HappyGif";
import Button from "src/components/Button";

EndScreen.propTypes = {
  nextSession: PropTypes.func.isRequired,
};

export default function EndScreen(props) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="mx-6 my-4 p-6 border border-gray-600 border-solid bg-gray-200 flex flex-col">
        <HappyGif />
        <div className="mt-4" />
        <Button size="large" onClick={props.nextSession}>
          Next Session
        </Button>
      </div>
    </div>
  );
}
