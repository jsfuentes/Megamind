import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function Button(props) {
  const style = classNames({
    "rounded w-auto cursor-pointer outline-none flex items-center justify-center relative": true,
    "font-medium px-5 py-1.5 text-lg": !props.size,
    "font-semibold py-2 px-7 text-xl": props.size === "large",
    "text-white bg-pink-800 font-semibold": props.variant === "pink",
    "text-pink-800 bg-pink-100 hover:bg-pink-150  border-pink-800 border-3":
      props.variant === "inverted-pink",
    "text-white bg-black hover:bg-black-2": props.variant === "black",
    "text-black bg-gray-100 hover:bg-gray-250 border-black border-3 ":
      props.variant === "inverted-black",
    "w-full": props.fullWidth,
  });
  return (
    <button className={style} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  variant: "black",
  disabled: false,
};
