import Header from "@/components/Header";
import Nav from "@/components/Nav";
import VideoList from "@/components/VideoList";
import Head from "next/head";
import { faker } from "@faker-js/faker";
import CategoryList from "@/components/CategoryList";
import { VideoType } from "@/lib/types";

function generateFillerVideo(id: number): VideoType {
  faker.seed(id);
  return {
    id: id,
    view_count: faker.datatype.number(),
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    date: faker.date.past(1).toDateString(),
    thumbnail: "",
    author: {
      id: 1,
      name: faker.name.fullName(),
      image: faker.image.unsplash.buildings(64, 64),
    },
  };
}

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

type HomeProps = {
  videos: VideoType[];
  categories: string[];
};

export default function Home({ videos, categories }: HomeProps) {
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
          <VideoList videos={videos} />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      videos: new Array(20).fill(null).map((_, i) => generateFillerVideo(i)),
      categories: generateCategories(),
    },
  };
}
