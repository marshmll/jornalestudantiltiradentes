import Link from "next/link";
import client from "@/utils/DatoCMSClient";
import openWeatherClient from "@/utils/OpenWeatherClient";
import DateFormatter from "@/utils/DateFormatter";
import { useEffect, useState } from "react";

export default function Body() {
  const [response, setResponse] = useState(null);
  const [done, setDone] = useState(false);

  const query = `
  {
    allArticles {
      id
      subject
      title
      description
      authors
      _updatedAt
      thumbnail {
        url
        alt
      }
    }
  }
  `;

  useEffect(() => {
    client.queryCMS(query).then((res) => {
      setResponse(res);
      setDone(true);
    });

    openWeatherClient.getCurrentWeatherData().then((res) => {
      console.log(res);
    });
  }, [done]);

  function renderArticles() {
    if (response) {
      let articles = [];

      response.allArticles.forEach((article) => {
        articles.push(
          <article
            key={article.id}
            className="block w-full h-full p-4 hover:scale-[1.01]"
          >
            <Link
              href={`/article/${article.id}`}
              className="block w-full h-[23rem] border-[1px] border-gray-400 rounded-lg bg-white flex flex-row items-start max-sm:block max-sm:h-full"
            >
              <div
                style={{ backgroundImage: `url(${article.thumbnail.url})` }}
                className="block border-2 h-full w-[60%] bg-center bg-no-repeat bg-cover max-sm:w-full max-sm:h-60"
              ></div>
              <div className="block h-full w-[40%] relative max-sm:w-full max-sm:h-[18rem]">
                <span className="absolute top-0 m-2 font-bold">
                  {article.subject}
                </span>
                <h3 className="absolute top-10 max-h-50 overflow-y-hidden text-[20px] text-red-800 m-2 font-bold max-md:max-h-44 max-sm:max-h-24">
                  {article.title}
                </h3>
                <p className="absolute max-h-30 overflow-y-hidden text-ellipsis bottom-14 m-2 text-[15px] max-md:text-[13px] max-md:bottom-20 max-md:max-h-20 max-sm:bottom-12">
                  {article.description}
                </p>
                <span className="absolute bottom-5 right-0 m-2 text-[11px]">
                  {article.authors}
                </span>
                <span className="absolute bottom-0 right-0 m-2 text-[11px]">
                  Atualizado em {DateFormatter.format(article._updatedAt)}
                </span>
              </div>
            </Link>
          </article>
        );
      });
      return articles;
    }
  }

  function renderWeatherData() {
    return (
      <div className="border-[1px] border-gray-400 rounded-lg">
      </div>
    );
  }

  return (
    <section className="bg-gray-100 flex flex-row items-start max-md:flex-col-reverse">
      <div className="inline-block w-[65%] max-md:w-full">
        {renderArticles()}
      </div>
      <aside className="inline-block w-4/12 p-4 max-md:w-full">
        {renderWeatherData()}
      </aside>
    </section>
  );
}
