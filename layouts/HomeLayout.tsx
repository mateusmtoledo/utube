import Header from "@/components/Header";
import Sidebar, { SidebarModal } from "@/components/Sidebar";
import SidebarModalContext from "@/contexts/SidebarModalContext";
import { ReactNode, useContext, useState } from "react";

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  function toggleSidebarExpanded() {
    setSidebarExpanded((prev) => !prev);
  }

  const { toggleSidebarModal } = useContext(SidebarModalContext);
  function handleToggleSidebar() {
    if (window.innerWidth < 768) {
      toggleSidebarModal();
    } else {
      toggleSidebarExpanded();
    }
  }

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <main className="flex mt-3 items-start">
        <Sidebar sidebarExpanded={sidebarExpanded} />
        <div className="flex-1 min-w-0 p-4">{children}</div>
      </main>
    </>
  );
}
