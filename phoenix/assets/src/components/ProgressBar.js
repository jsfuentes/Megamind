import React, { useState } from "react";
import PropTypes from "prop-types";

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default function ProgressBar(props) {
  let { current, total } = props;
  if (total == 0) {
    current = 0;
    total = 1;
  }
  return (
    <div className="flex-1 ml-20 mr-20">
      <div
        className="text-black text-right font-bold pb-2"
        style={{ width: Math.round(current / total * 100) + "%" }}
      > 
      </div>
      <div
        className="block duration-150 border-l border-r border-b border-t border-blue-200 text-right font-bold rounded pl-2 pt-2 pb-2 pr-2 bg-blue-500 text-black shadow"
        style={{ width: current / total * 100 + "%" }}
      >{Math.round((current / total) * 100)}%</div>
    </div>
  );
}
