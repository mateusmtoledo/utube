import Head from "next/head";
import VideoList from "@/components/VideoList";
import HomeLayout from "@/layouts/HomeLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>UTube</title>
        <meta name="description" content="UTube" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout>
        <VideoList />
      </HomeLayout>
    </>
  );
}
