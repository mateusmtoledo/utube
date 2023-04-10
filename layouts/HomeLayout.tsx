import Header from "@/components/Header";
import Sidebar, { SidebarModal } from "@/components/Sidebar";
import { ReactNode, useState } from "react";

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  function toggleSidebar() {
    setSidebarExpanded((prev) => !prev);
  }

  const [sidebarModalVisible, setSidebarModalVisible] = useState(false);
  function toggleSidebarModal() {
    setSidebarModalVisible((prev) => !prev);
  }

  return (
    <>
      {sidebarModalVisible && (
        <SidebarModal toggleSidebarModal={toggleSidebarModal} />
      )}
      <Header
        toggleSidebar={toggleSidebar}
        toggleSidebarModal={toggleSidebarModal}
      />
      <main className="flex mt-3">
        <Sidebar sidebarExpanded={sidebarExpanded} />
        <div className="flex-1 min-w-0 p-4">{children}</div>
      </main>
    </>
  );
}
