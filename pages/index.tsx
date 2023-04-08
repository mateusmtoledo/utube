import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Head from "next/head";
import { faker } from "@faker-js/faker";
import VideoList from "@/components/VideoList";
import CategoryList from "@/components/CategoryList";

function generateCategories() {
  return new Array(12).fill(null).map((_, i) => {
    faker.seed(i);
    const words = faker.lorem.words((i % 2) + 1);
    return words
      .split(" ")
      .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join(" ");
  });
}

export default function Home() {
  const categories = generateCategories();

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
        <Nav />
        <div className="flex-1 space-y-4">
          <CategoryList categories={categories} />
          <VideoList />
        </div>
      </main>
    </>
  );
}
