import client from "@/utils/DatoCMSClient";
import openWeatherClient from "@/utils/OpenWeatherClient";
import DateFormatter from "@/utils/DateFormatter";
import Link from "next/link";
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";

export default function Body() {
  const [CMSData, setCMSData] = useState(null);
  const [hasLoadedCMSData, setHasLoadedCMSData] = useState(false);

  const [weatherData, setWeatherData] = useState(null);
  const [hasLoadedWeatherData, setHasLoadedWeatherData] = useState(false);

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
      setCMSData(res);
      setHasLoadedCMSData(true);
    });

    openWeatherClient.getCurrentWeatherData().then((data) => {
      // console.log(data);
      setWeatherData(data);
      setHasLoadedWeatherData(true);
    });
  }, [hasLoadedCMSData, hasLoadedWeatherData]);

  function renderArticles() {
    if (CMSData) {
      let articles = [];

      CMSData.allArticles.forEach((article) => {
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
                className="block h-full w-[60%] bg-center bg-no-repeat bg-cover rounded-lg max-sm:w-full max-sm:h-60"
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
    } else {
      return <Spinner />;
    }
  }

  function renderWeatherData() {
    if (weatherData)
      return (
        <div className="border-[1px] border-gray-400 rounded-lg bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-3xl font-bold">{weatherData.name}</h3>
            <div className="flex items-center flex-col">
              <div
                className="bg-center bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url("https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png")`,
                  width: "5rem",
                  height: "5rem",
                }}
              ></div>
              <p className="mb-2 italic">
                {weatherData.weather[0].description.charAt(0).toUpperCase() +
                  weatherData.weather[0].description.slice(1)}
              </p>
            </div>
            <p className="font-bold text-2xl">
              {Math.round(weatherData.main.temp)}ºC
            </p>
          </div>
          <div>
            <p className="mb-1">
              <b>Sensação térmica</b> {weatherData.main.feels_like}ºC
            </p>
            <p className="mb-1">
              <b>Máxima</b> {weatherData.main.temp_max}ºC
            </p>
            <p className="mb-1">
              <b>Mínima</b> {weatherData.main.temp_min}ºC
            </p>
            <p className="mb-1">
              <b>Pressão</b> {weatherData.main.pressure} hPa
            </p>
            <p className="mb-1">
              <b>Vento</b> {weatherData.wind.speed} km/h
            </p>
          </div>
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
