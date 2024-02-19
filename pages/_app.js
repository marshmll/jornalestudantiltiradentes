import Head from "next/head";
import Layout from "@/components/infra/Layout";
import "@fontsource/rozha-one";
import "./globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>Jornal Estudantil Tiradentes</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
