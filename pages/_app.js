import Head from "next/head";
import Layout from "@/components/infra/Layout";
import "@fontsource/rozha-one";
import "./globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {/* Primary Meta Tags */}
        <title>Jornal Estudantil Tiradentes</title>
        <meta charSet="UTF-8" />
        <meta name="title" content="Jornal Estudantil Tiradentes" />
        <meta
          name="description"
          content="O Jornal do Estudante Bem-informado. Tenha acesso à informações produzidas pela comunidade escolar do Colégio Estadual Tiradentes."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://jornalestudantiltiradentes.vercel.app"
        />
        <meta property="og:title" content="Jornal Estudantil Tiradentes" />
        <meta
          property="og:description"
          content="O Jornal do Estudante Bem-informado. Tenha acesso à informações produzidas pela comunidade escolar do Colégio Estadual Tiradentes."
        />
        <meta
          property="og:image"
          content="https://www.datocms-assets.com/119746/1716037665-captura-de-tela-de-2024-05-15-20-16-23.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://jornalestudantiltiradentes.vercel.app"
        />
        <meta property="twitter:title" content="Jornal Estudantil Tiradentes" />
        <meta
          property="twitter:description"
          content="O Jornal do Estudante Bem-informado. Tenha acesso à informações produzidas pela comunidade escolar do Colégio Estadual Tiradentes."
        />
        <meta
          property="twitter:image"
          content="https://www.datocms-assets.com/119746/1716037665-captura-de-tela-de-2024-05-15-20-16-23.png"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
