import Head from "next/head";
import VideoList from "@/components/VideoList";
import HomeLayout from "@/layouts/HomeLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>UTube</title>
      </Head>
      <HomeLayout>
        <VideoList />
      </HomeLayout>
    </>
  );
}
