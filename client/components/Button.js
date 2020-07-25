import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "secondary-2",
    "tertiary",
    "chameleon",
    "cta-black",
    "cta-white",
    "danger",
    "danger-2",
    "purple",
  ]).isRequired,
  size: PropTypes.oneOf([
    "xl",
    "large",
    "medium",
    "small",
    "default",
    "xsmall",
    "small-fullwidth",
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  fullWidth: PropTypes.bool,

  disabled: PropTypes.bool,
  disabledStyle: PropTypes.bool,

  iconLeft: PropTypes.bool,
  icon: PropTypes.string,

  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  variant: "primary",
  size: "default",
  disabledStyle: true,
};

export default function Button(props) {
  const style = classNames({
    "flex-none hover:shadow-none capitalize shadow-sm focus:shadow-none rounded-lg inline-flex justify-center items-center border focus:outline-none border-transparent font-medium transition ease-in-out duration-150 text-center": true,
    "w-full flex justify-center items-center py-2.5": props.fullWidth,
    "text-white bg-gray-900 hover:bg-pureBlack focus:outline-none focus:shadow-outline-black hover:shadow-none":
      props.variant === "primary",
    "text-black shadow-xs bg-gray-50 hover:bg-gray-100 border-2 border-gray-300 hover:shadow-none":
      props.variant === "secondary",
    "text-white bg-gray-800 border-none": props.variant === "tertiary",
    "text-black bg-gray-50": props.variant === "secondary-2",
    "text-black border-none border-transparent py-3 bg-neon-green":
      props.variant === "chameleon",
    "text-white bg-purple-500 border-purple-500 shadow-md hover:bg-purple-600 hover:border-purple-600":
      props.variant === "purple",
    "text-black bg-white lg:text-white lg:bg-black":
      props.variant === "cta-black",
    "text-white bg-black lg:text-black lg:bg-white":
      props.variant === "cta-white",
    "text-white bg-red-700 shadow-sm": props.variant === "danger",
    "bg-red-100  text-red-700   shadow-none": props.variant === "danger-2",
    "px-3 py-2 text-base": props.size === "default",
    "px-3 py-1 text-sm": props.size === "xsmall",
    "px-3 py-1.5 text-base": props.size === "small",
    "w-full flex justify-center items-center px-3 py-2 text-base":
      props.size === "small-fullwidth",
    "px-6 py-3 text-xl": props.size === "xl",
    "px-5 py-3 text-lg": props.size === "large",
    "sm:text-lg": props.size === "medium",
    "opacity-50 cursor-not-allowed hover:bg-inherit":
      props.disabled && props.disabledStyle === true,
    [props.className]: props.className,
  });

  const iconMainStyle = classNames({
    bx: true,
    "text-lg": props.size === "small",
    "text-xl": props.size === "default",
    "text-2xl": props.size === "large",
    "text-3xl": props.size === "xl",
    "ml-1": !props.iconLeft,
    "mr-2": props.iconLeft,
    "ml-1": !props.iconLeft && props.size === "large",
    "mr-3": props.iconLeft && props.size === "large",
    [props.icon]: props.icon,
  });

  return (
    <button
      type={props.type || "button"}
      className={style}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.iconLeft && props.icon && (
        <i className={iconMainStyle} style={props.iconStyle}></i>
      )}
      {props.children}
      {!props.iconLeft && props.icon && (
        <i className={iconMainStyle} style={props.iconStyle}></i>
      )}
    </button>
  );
}
