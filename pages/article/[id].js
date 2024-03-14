import Menu from "@/components/infra/Menu";
import client from "@/utils/DatoCMSClient";
import DateFormatter from "@/utils/DateFormatter";
import JSXBuilder from "@/utils/JSXBuilder";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Article() {
  const router = useRouter();

  const articleId = router.query.id;

  const [response, setResponse] = useState(null);
  const [done, setDone] = useState(false);

  const query = `
    {
      allArticles(
        filter: {
          id: { eq: "${articleId}" }
        }
      )
      {
        subject
        title
        description
        authors
        references
        content {
          ... on Heading2Record {
            __typename
            id
            text
          }
          ... on ParagraphRecord {
            __typename
            id
            text
          }
          ... on ImageRecord {
            __typename
            id
            source {
              url
            }
            alt
            span
          }
          ... on VideoRecord {
            __typename
            id
            title
            source {
              provider
              url
            }
          }
          ... on BlockquoteRecord {
            __typename
            id
            text
            author
          }
        }
        _createdAt
        _updatedAt
      }
    }
  `;

  useEffect(() => {
    client.queryCMS(query).then((res) => {
      setResponse(res);
      console.log(response);
      setDone(true);
    });
  }, [done]);

  return (
    <>
      <Menu title={response ? response.allArticles[0].subject : false} />
      <article className="px-36 max-md:px-20 max-sm:px-12">
        <div className="border-gray-600 border-y py-6 mt-8 mb-8">
          <h1 className="text-5xl font-bold block w-full mb-4 max-md:text-4xl">
            {response ? response.allArticles[0].title : ""}
          </h1>
          <p className="text-2xl leading-6 mb-2 max-md:text-[1.2rem]">
            {response ? response.allArticles[0].description : ""}
          </p>
          <span className="font-bold block mb-1">
            Por: {response ? response.allArticles[0].authors : ""}
          </span>
          <span className="block mb-1">
            {response ? response.allArticles[0].references : ""}
          </span>
          <span className="block mb-0 p-0 italic">
            {response
              ? `Criado em ${DateFormatter.format(
                  response.allArticles[0]._createdAt
                )}`
              : ""}
          </span>
          <span className="block italic">
            {response
              ? `Atualizado em ${DateFormatter.format(
                  response.allArticles[0]._updatedAt
                )}`
              : ""}
          </span>
        </div>
        <main>
          {response
            ? JSXBuilder.buildFromRecordContent(response.allArticles[0].content)
            : ""}
        </main>
      </article>
    </>
  );
}
