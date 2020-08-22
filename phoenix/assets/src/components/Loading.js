import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

Loading.propTypes = {
  full: PropTypes.bool.isRequired,
};

Loading.defaultProps = {
  full: false,
};

export default function Loading(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const cls = classNames({
    "flex justify-center items-center": true,
    "w-full h-full": props.full,
    "w-screen h-screen": !props.full,
  });

  return (
    <div className={cls}>
      {show && (
        <img
          className="heartBeat w-10 h-auto"
          src="/egg2.png"
          alt="Loading Icon"
        />
      )}
    </div>
  );
}
