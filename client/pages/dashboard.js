import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Loading from "../components/Loading";
import UserContext from "../contexts/UserContext";
import decks from "../decks.json";
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from "react-toastify";
const debug = require("debug")("app:Dashboard");

export default function Dashboard(props) {
  const [name, setName] = useState("");
  const [noEvent, setNoEvent] = useState(true);
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const { user } = useContext(UserContext);
  const router = useRouter();

  function openModal() {
    setIsOpen(true);
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  function onSubmit(event) {
      event.preventDefault();
      axios
      .post("/api/events", { name, noEvent })
      .then((resp) => debug("resp recieved", resp));
      closeModal()
  }

  const customStyles = {
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: '50%',
      color: 'grey',
      transform: 'translate(-50%, -50%)',
    },
  };



  // useEffect(() => {
  //   toast("Must login first");
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, []);

  // if (!user) {
  //   return <Loading />;
  // }

  return (    
    <div className="flex flex-col justify-center items-center">
      <div className="container flex flex-col justify-center">
        <h1> Hello {user && user.name} </h1>
        <h3>Decks</h3>
        <div className="flex flex-row w-full mt-4">
          {Object.entries(decks).map((value, index) => {
            return (
              <div className="deck" key={value.id}>
                <Link href="/StudyApp/[id]" as={"/StudyApp/" + value[0]}>
                  <a>{value[1].title}</a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={openModal}>Create New Deck</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        > 
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={closeModal}>Close</button>
          
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

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    FrontTitle: "Question",
    FrontText: "What is Abdominal Aortic Aneurysm",
    BackTitle: "Answer",
    BackText:
      "An abdominal aortic aneurysm (AAA) is a swelling (aneurysm) of the aorta – the main blood vessel that leads away from the heart, down through the abdomen to the rest of the body.",
  },
  {
    id: 2,
    FrontTitle: "Question",
    FrontText: "What is ACNE",
    BackTitle: "Answer",
    BackText:
      "Acne is a common skin condition that affects most people at some point. It causes spots, oily skin and sometimes skin that's hot or painful to touch.",
  },
  {
    id: 3,
    FrontTitle: "Question",
    FrontText: "What is Acute Cholecystitis",
    BackTitle: "Answer",
    BackText:
      "Acute cholecystitis is swelling (inflammation) of the gallbladder. It is a potentially serious condition that usually needs to be treated in hospital.",
  },
  {
    id: 4,
    FrontTitle: "Question",
    FrontText: "What is Acute lymphoblastic leukaemia",
    BackTitle: "Answer",
    BackText:
      "Leukaemia is cancer of the white blood cells. Acute leukaemia means the condition progresses rapidly and aggressively and requires immediate treatment.",
  },
];

export { SAMPLE_FLASHCARDS };
