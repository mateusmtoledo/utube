import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>UTube</title>
        <meta name="description" content="UTube" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="p-6">
        <Nav />
      </main>
    </>
  );
}
