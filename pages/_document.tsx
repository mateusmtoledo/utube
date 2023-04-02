import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-slate-950 text-white">
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
}