import { createContext } from "react";

const SidebarModalContext = createContext({
  toggleSidebarModal: () => {},
});

export default SidebarModalContext;
