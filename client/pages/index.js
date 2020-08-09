import Head from "next/head";
import Link from "next/link";

import Header from "../components/Header"
import GoogleButton from "../components/GoogleButton";

export default function Home() {
  return (
    <>
    <div><Header /></div>
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center container">
        <main>
          <h1 className="text-green-900">Megamind</h1>
          <p className="text-green-200">A memory application</p>
          <GoogleButton variant="inverted-black" route="/dashboard">
            Google Login with Popup
          </GoogleButton>
        </main>
      </div>
    </div>
    </>
  );
}
