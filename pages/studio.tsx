import HomeLayout from "@/layouts/HomeLayout";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";

const StudioPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Studio - UTube</title>
      </Head>
      <div>
        <h2>Channel Content</h2>
      </div>
    </>
  );
};

StudioPage.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export default StudioPage;
