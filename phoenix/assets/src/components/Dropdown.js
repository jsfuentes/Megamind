import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import * as Sentry from "@sentry/browser";

const debug = require("debug")("app:Dropdown");
Dropdown.propTypes = {
  hoverElement: PropTypes.node.isRequired,
  hoverSize: PropTypes.oneOf(["full", "medium"]).isRequired,
  hoverPlace: PropTypes.oneOf(["bottom", "top"]).isRequired,
  children: PropTypes.node.isRequired,
  outerCls: PropTypes.string,
};

Dropdown.defaultProps = {
  hoverSize: "medium",
  hoverPlace: "bottom",
};

export default function Dropdown(props) {
  const [active, setActive] = useState(false);
  const dropDownR = useRef(null);

  const outerDropContainerCls = classNames({
    "absolute right-0 overflow-hidden": true,
    "h-0": !active,
    "h-64": active,
    "w-full": props.hoverSize === "full",
    "w-56": props.hoverSize === "medium",
    "bottom-0": props.hoverPlace === "top",
  });

  const innerContainerCls = classNames({
    "rounded shadow-sm bg-white": true,
  });

  return (
    <div
      className={`${props.outerCls ? props.outerCls : ""} relative text-left`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        className={`${outerDropContainerCls}`}
        ref={dropDownR}
        onClick={() => setActive(false)}
      >
        <div className={`${innerContainerCls}`}>{props.hoverElement}</div>
      </div>
      <div className="w-full h-full">{props.children}</div>
    </div>
  );
}
