import Link from "next/link";
import client from "@/utils/DatoCMSClient";
import DateFormatter from "@/utils/DateFormatter";
import { useEffect, useState } from "react";

export default function Headline() {
  const [response, setResponse] = useState(null);
  const [done, setDone] = useState(false);

  const query = `
  {
    heading {
      principal {
        id
        subject
        title
        description
        authors
        _createdAt
      }
      secondary1 {
        id
        thumbnail {
          url
        }
        subject
        title
        description
        authors
        _createdAt
      }
      secondary2 {
        id
        thumbnail {
          url
        }
        subject
        title
        description
        authors
        _createdAt
      }
    }
  }
  `;

  useEffect(() => {
    client.queryCMS(query).then((res) => {
      setResponse(res);
      setDone(true);
    });
  }, [done]);

  return (
    <main className="w-full flex p-6 box-border justify-between h-[35rem] bg-gray-100 max-md:flex-col max-md:w-full max-md:h-full">
      <Link
        href={response ? `/article/${response.heading.principal.id}` : ""}
        className={`border-[1px] border-gray-400 rounded-lg w-6/12 block p-2 box-border relative bg-white cursor-pointer hover:scale-[1.01] transition duration-150 ease-in-out max-md:w-full max-md:h-[30rem] max-md:mb-4 ${
          !response ? "animate-pulse" : ""
        }`}
      >
        <span className="absolute top-0 left-0 m-4 font-bold">
          {response ? response.heading.principal.subject : ""}
        </span>
        <h2 className="text-red-800 font-bold text-3xl absolute top-10 m-4 pr-4 max-sm:text-[1.6rem]">
          {response ? response.heading.principal.title : ""}
        </h2>
        <p className="absolute bottom-32 m-4 pr-4 text-lg">
          {response ? response.heading.principal.description : ""}
        </p>
        <span className="absolute bottom-0 right-0 m-4 max-sm:text-[.8rem]">
          {response
            ? `Por "${
                response.heading.principal.authors
              }" às ${DateFormatter.format(
                response.heading.principal._createdAt
              )}`
            : ""}
        </span>
      </Link>
      <div className="w-[48%] flex flex-col justify-between max-md:w-full max-md:max-h-full">
        <Link
          style={{
            backgroundImage: `${
              response
                ? `url("${response.heading.secondary1.thumbnail.url}")`
                : ""
            }`,
          }}
          href={response ? `/article/${response.heading.secondary1.id}` : ""}
          className={`block relative border-[1px] border-gray-400 rounded-lg p-2 box-border h-[48%] hover:scale-[1.01] transition duration-150 ease-in-out bg-center bg-cover bg-no-repeat max-md:h-60 max-md:mb-4 ${
            !response ? "animate-pulse" : ""
          }`}
        >
          <span className="absolute top-0 left-0 font-bold text-white drop-shadow-lg p-2 w-full left-0 bg-[#00000022]">
            {response ? response.heading.secondary1.subject : ""}
          </span>
          <h2 className="absolute bottom-0 left-0 p-2 w-full text-2xl font-bold text-white drop-shadow-lg bg-[#00000022] max-md:text-[1.2rem]">
            {response ? response.heading.secondary1.title : ""}
          </h2>
        </Link>
        <Link
          style={{
            backgroundImage: `${
              response
                ? `url("${response.heading.secondary2.thumbnail.url}")`
                : ""
            }`,
          }}
          href={response ? `/article/${response.heading.secondary2.id}` : ""}
          className={`block relative border-[1px] border-gray-400 rounded-lg p-2 box-border h-[48%] hover:scale-[1.01] transition duration-150 ease-in-out bg-center bg-cover bg-no-repeat max-md:h-60 ${
            !response ? "animate-pulse" : ""
          }`}
        >
          <span className="absolute top-0 left-0 font-bold text-white drop-shadow-lg p-2 w-full left-0 bg-[#00000022]">
            {response ? response.heading.secondary2.subject : ""}
          </span>
          <h2 className="absolute bottom-0 left-0 p-2 w-full text-2xl font-bold text-white drop-shadow-lg bg-[#00000022] max-md:text-[1.2rem]">
            {response ? response.heading.secondary2.title : ""}
          </h2>
        </Link>
      </div>
    </main>
  );
}
