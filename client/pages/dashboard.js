import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Header from "../components/Header"
import Loading from "../components/Loading";
import UserContext from "../contexts/UserContext";
import decks from "../decks.json";
import CreateDeck from "../components/CreateDeck";
import { toast } from "react-toastify";
const debug = require("debug")("app:Dashboard");

export default function Dashboard(props) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  // useEffect(() => {
  //   toast("Must login first");
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, []);

  // if (!user) {
  //   return <Loading />;
  // }

  useEffect(() => {
    if (user) {
      toast(`Hello ${user && user.name}`);
    } else {
      toast("Not logged in");
    }
  }, []);

  return (
    <>
    <div><Header /></div>
      <div className="flex flex-col justify-center items-center font-sans">
        <div className="flex flex-col justify-center container">
          <h1> Hello {user && user.name} </h1>
          <h3>Decks</h3>
          <div className="grid grid-cols-3">
              {Object.entries(decks).map((value, index) => {
                return (
                  <Link href="/StudyApp/[id]" as={"/StudyApp/" + value[0]}><a><div class="flex p-6">
                    <div className="h-48 w-48 flex-none bg-cover border-t border-b border-l border-gray-400 rounded-l text-center overflow-hidden" style={{"backgroundImage": "url('/img/mm.png')"}} title="Megamind holding a mug"></div>
                    <div className="border-r border-b border-t border-gray-400 lg:border-l-0 lg:border-gray-400 bg-green-900 hover:bg-green-200 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal text-white hover:text-black hover:border-transparent">
                      <div className="mb-8">
                        <div className="font-bold text-xl mb-2">
                          <div key={value.id}>
                            {value[1].title}
                          </div>
                        </div>
                        <p className="text-base">
                          {value[1].subtitle}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src="/img/tighten.png" alt="Tighten"></img>
                        <div className="text-sm">
                          <p className="leading-none">{value[1].author}</p>
                          <p className="">Aug 18</p>
                        </div>
                      </div>
                    </div>
                  </div></a></Link>
                );
              })}
            </div>
          </div>
      </div>
    </>
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
