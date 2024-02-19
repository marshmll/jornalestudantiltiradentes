import Menu from "@/components/infra/Menu";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import client from "@/utils/DatoCMSClient";
import Link from "next/link";

export default function Articles() {
  const router = useRouter();
  let subject = router.query.subject;

  const [response, setResponse] = useState(null);
  const [done, setDone] = useState(false);

  const query = `
  {
    allArticles(
      filter: { subject: { eq: "${subject}" } }
    )
    {
      id
      subject
      title
      description
      authors
      thumbnail {
        url
      }
      _createdAt
      _updatedAt
    }
  }
  `;

  useEffect(() => {
    client.queryCMS(query).then((res) => {
      setResponse(res);
      console.log(res);
      setDone(true);
    });
  }, [done]);

  function renderArticlesListing() {
    if (response) {
      let articles = [];
      response.allArticles.forEach((article) => {
        articles.push(
          <Link
            className="border-[1px] border-gray-400 rounded-lg bg-white h-[25rem] flex flex-row"
            key={article.id}
            href={`/article/${article.id}`}
          >
            <div
              style={{ backgroundImage: `url(${article.thumbnail.url})` }}
              className="block w-2/4 h-full border-[1px] rounded-lg bg-center bg-no-repeat bg-cover"
            ></div>
            <div className="relative block w-2/4">
              <span className="font-bold absolute m-4">{article.subject}</span>
              <h2 className="font-bold text-3xl text-red-800 absolute top-[10%] m-4">
                {article.title}
              </h2>
              <p className="absolute bottom-[30%] m-4">{article.description}</p>
              <span className="absolute bottom-0 right-0 m-4">
                Atualizado em {new Date(article._updatedAt).toLocaleString()}
              </span>
            </div>
          </Link>
        );
      });
      return articles;
    }
  }

  return (
    <>
      <Menu title={subject} />
      <main className="py-4 px-32 bg-gray-200">{renderArticlesListing()}</main>
    </>
  );
}
