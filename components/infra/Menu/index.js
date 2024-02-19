import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Menu({ title }) {
  const [visibility, setVisibility] = useState(false);
  return (
    <>
      <header className="bg-red-800 text-white pt-4 pb-4 pl-10 pr-10 flex justify-around">
        <button
          className="navbar-burguer flex items-center text-white"
          onClick={(e) => {
            e.preventDefault();
            setVisibility(!visibility);
          }}
        >
          <svg
            className="block h-6 w-6 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
        <h2 className="rozha text-4xl">
          {title ? title.toUpperCase() : "JORNAL ESTUDANTIL TIRADENTES"}
        </h2>
        <Link href="/">
          <Image
            height={25}
            width={40}
            src="/favicon.ico"
            alt="Logotipo Jornal Estudantil Tiradentes"
          />
        </Link>
      </header>
      <nav
        className={`absolute h-full z-50 w-52 bg-red-700 top-0 transition-all ${
          visibility ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="text-4xl text-white"
          onClick={(e) => {
            e.preventDefault();
            setVisibility(!visibility);
          }}
        >
          ×
        </button>
      </nav>
    </>
  );
}