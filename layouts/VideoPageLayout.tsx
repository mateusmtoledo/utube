import Header from "@/components/Header";
import { ReactNode } from "react";

type VideoPageLayoutProps = {
  children: ReactNode;
};

export default function VideoPageLayout({ children }: VideoPageLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
