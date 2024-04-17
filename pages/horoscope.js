import Menu from "@/components/infra/Menu";
import Spinner from "@/components/spinner";
import client from "@/utils/DatoCMSClient";
import { useState, useEffect } from "react";

export default function Horoscope() {
  const [response, setResponse] = useState(null);
  const [done, setDone] = useState(false);

  const query = `
  {
    horoscope {
      month
      previsions {
        ... on PrevisionRecord {
          sign
          image {
            url
          }
          text
        }
      }
    }
  }
  `;

  useEffect(() => {
    client.queryCMS(query).then((res) => {
      setResponse(res);
      // console.log(res);
      setDone(true);
    });
  }, [done]);

  function renderPrevisions() {
    if (response) {
      let previsions = [];

      response.horoscope.previsions.forEach((prevision) => {
        previsions.push(
          <div className="flex flex-row flex-center justify-between mb-10 max-sm:flex-col">
            <div className="w-[30%] max-sm:w-full mb-4">
              <div
                style={{ backgroundImage: `url('${prevision.image.url}')` }}
                className="border-[1px] border-black w-[15rem] h-[15rem] rounded-[100%] block m-auto bg-center bg-no-repeat bg-contain max-sm:w-[10rem] max-sm:h-[10rem]"
              ></div>
            </div>
            <div className="w-[70%] max-sm:w-full">
              <h3 className="rozha text-3xl mb-2 border-l-2 border-[#991B1B] pl-4 max-sm:block mx-auto">
                {prevision.sign}
              </h3>
              <p className="max-sm:text-justify">{prevision.text}</p>
            </div>
          </div>
        );
      });

      return previsions;
    }
    else {
      return <Spinner />
    }
  }

  return (
    <main>
      <Menu title="Horóscopo" />
      <section className="mx-20 my-10 max-sm:mx-10">
        <h1 className="rozha w-full text-center text-3xl mb-10">
          {response
            ? `Horóscopo para o mês de ${response.horoscope.month}`
            : ""}
        </h1>
        {renderPrevisions()}
      </section>
    </main>
  );
}
