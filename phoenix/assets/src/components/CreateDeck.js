import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

import conf from "conf";
import { axios } from "src/utils/utils.js";
const debug = require("debug")("app:CreateDeck");

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

Modal.setAppElement(`#${conf.get("HTML_ROOT_ID")}`);

export default function CreateDeck(props) {
  const [title, setTitle] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const resp = await axios.post("/api/decks", { deck: { title } });
      const newDeck = resp.data.data;
      debug("newDeck: ", newDeck);
      toast("Created deck");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        debug("Unauthorized user");
        toast("You must be logged in to create a deck");
      } else {
        debug(err);
        toast("Problem creating deck, contact support");
      }
    }

    closeModal();
  }

  return (
    <div className="modal">
      <button
        onClick={openModal}
        className="border-r border-b border-t border-gray-400 lg:border-l-0 lg:border-gray-400 bg-green-900 hover:bg-green-200 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal text-white hover:text-black hover:border-transparent"
      >
        Create New Deck
      </button>
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
            id="title"
            type="text"
            placeholder="Deck Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
