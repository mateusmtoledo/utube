import Header from "@/components/Header";
import Nav from "@/components/Nav";
import VideoList, { VideoType } from "@/components/VideoList";
import Head from "next/head";
import { faker } from "@faker-js/faker";

function generateFillerVideo(id: number) {
  faker.seed(id);
  return {
    id: id,
    viewCount: faker.datatype.number(),
    title: faker.lorem.sentence(),
    date: faker.date.past(1).getTime(),
    author: {
      name: faker.name.fullName(),
      avatar: faker.image.unsplash.buildings(64, 64),
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

// TODO handle overflow
function CategoryList({ categories }: { categories: string[] }) {
  return (
    <ul className="flex gap-3 overflow-hidden">
      {categories.map((category, i) => (
        <CategoryTag key={i}>{category}</CategoryTag>
      ))}
    </ul>
  );
}

function CategoryTag({ children }: { children: string }) {
  return (
    <li className="px-4 p-2 overflow-ellipsis whitespace-nowrap bg-slate-900 rounded-lg text-sm leading-tight hover:bg-slate-800">
      {children}
    </li>
  );
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
      <main className="flex p-6">
        <Nav />
        <div className="min-w-0 w-full space-y-8">
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
