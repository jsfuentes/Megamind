import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Modal from "src/components/Modal";
import conf from "conf";
import { axios } from "src/utils/utils.js";
import Button from "src/components/Button.js";
const debug = require("debug")("app:CreateDeck");

export default function CreateDeck() {
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const resp = await axios.post("/api/decks", { deck: { title } });
      const newDeck = resp.data.data;
      debug("newDeck: ", newDeck);
      history.push(`/deck/${newDeck.id}`);
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
        className="border border-gray-400 lg:border-gray-400 bg-green-900 hover:bg-green-200 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal text-white hover:text-black hover:border-transparent"
      >
        Create New Deck
      </button>
      <Modal isOpen={modalOpen} onRequestClose={closeModal}>
        <form
          className="rounded-sm flex flex-col justify-center items-center p-6 my-4"
          onSubmit={onSubmit}
        >
          <div className="text-3xl font-bold">Deck Name</div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3"
            id="title"
            type="text"
            placeholder="Deck Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          &nbsp;
          <Button size="large" submit={true}>
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
}
