import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";

import conf from "conf";
import Button from "src/components/Button.js";
const debug = require("debug")("app:CreateDeck");

const customStyles = {
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "50%",
    color: "grey",
    transform: "translate(-50%, -50%)",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
};

Modal.setAppElement(`#${conf.get("HTML_ROOT_ID")}`);

export default function MyModal(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
    >
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex justify-between">
          <div />
          <Button onClick={props.onRequestClose} variant="pink">
            Close
          </Button>
        </div>

        <div className="flex-1 w-full">{props.children}</div>
      </div>
    </Modal>
  );
}
