import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Loading from "../components/Loading";
import UserContext from "../contexts/UserContext";
import decks from "../decks.json";
import { toast } from "react-toastify";
const debug = require("debug")("app:Dashboard");

export default function Dashboard(props) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    toast("Must login first");
    if (!user) {
      router.push("/");
    }
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="container flex flex-col justify-center">
        <h1> Hello {user.name} </h1>
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
