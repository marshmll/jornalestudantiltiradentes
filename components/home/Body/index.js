import Link from "next/link";
import client from "@/utils/DatoCMSClient";
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
  }, [done]);

  function renderArticles() {
    if (response) {
      let articles = [];

      response.allArticles.forEach((article) => {
        articles.push(
          <article key={article.id} className="block w-full p-4">
            <Link
              href={`/article/${article.id}`}
              className="block w-full h-[23rem] border-[1px] border-gray-400 rounded-lg bg-white flex flex-row items-start"
            >
              <div
                style={{ backgroundImage: `url(${article.thumbnail.url})` }}
                className="block border-2 h-full w-[60%] bg-center bg-no-repeat bg-cover"
              ></div>
              <div className="block h-full w-[40%] relative">
                <span className="absolute top-0 m-2 font-bold">
                  {article.subject}
                </span>
                <h3 className="absolute top-10 text-[20px] text-red-800 m-2 font-bold">
                  {article.title}
                </h3>
                <p className="absolute bottom-10 m-2 text-[15px]">
                  {article.description}
                </p>
                <span className="absolute bottom-5 right-0 m-2 text-[13px]">
                  {article.authors}
                </span>
                <span className="absolute bottom-0 right-0 m-2 text-[13px]">
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

  return (
    <section className="bg-gray-100 flex flex-row items-start">
      <div className="inline-block w-[65%]">{renderArticles()}</div>
      <aside className="inline-block w-4/12 p-4">
        <div className="border-[1px] border-gray-400 rounded-lg"></div>
      </aside>
    </section>
  );
}
