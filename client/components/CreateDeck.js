import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";

import { axios } from "../utils/utils.js";

const customStyles = {
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "50%",
    color: "grey",
    transform: "translate(-50%, -50%)",
  },
};

export default function CreateDeck(props) {
  const [name, setName] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [noEvent, setNoEvent] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onSubmit(event) {
    event.preventDefault();
    axios
      .post("/api/events", { name, noEvent })
      .then((resp) => debug("resp recieved", resp));
    closeModal();
  }

  return (
    <div className="modal">
      <button onClick={openModal}>Create New Deck</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={closeModal}
        >
          Close
        </button>

        <form
          className="border-4 border-solid rounded-sm flex flex-col justify-center items-center p-6 mb-4"
          onSubmit={onSubmit}
        >
          <div className="text-3xl font-bold">Deck Name</div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Deck Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          &nbsp;
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
}
