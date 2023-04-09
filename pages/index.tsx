import Header from "@/components/Header";
import Head from "next/head";
import VideoList from "@/components/VideoList";
import Sidebar from "@/components/Sidebar";

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
      <main className="flex mt-3">
        <Sidebar />
        <div className="flex-1 min-w-0 p-4">
          <VideoList />
        </div>
      </main>
    </>
  );
}
