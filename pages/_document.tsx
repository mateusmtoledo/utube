import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="UTube" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-slate-950 text-white">
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
}
