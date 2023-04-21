import Head from "next/head";
import VideoList from "@/components/VideoList";
import HomeLayout from "@/layouts/HomeLayout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>UTube</title>
      </Head>
      <VideoList />
    </>
  );
};

Home.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
