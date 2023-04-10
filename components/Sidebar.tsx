import { ReactNode, createContext, useContext } from "react";
import { IconType } from "react-icons";
import { BsCollectionPlay } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { VscHistory } from "react-icons/vsc";
import { RxClock } from "react-icons/rx";
import { AiOutlineLike, AiOutlineHome } from "react-icons/ai";
import { SlSettings } from "react-icons/sl";
import { FiGithub } from "react-icons/fi";
import Modal from "./Modal";
import Logo from "./Logo";
import { CgMenu } from "react-icons/cg";

// TODO remove this when users have actual icons
export function UserIcon({
  name,
  bgColor,
  large,
}: {
  name: string;
  bgColor: string;
  large?: boolean;
}) {
  return (
    <div
      className={`flex justify-center items-center font-medium text-md ${bgColor} ${
        large ? "w-8 h-8" : "w-6 h-6"
      } rounded-full`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

type ToggleSidebarButtonProps = {
  toggleSidebar: () => void;
};

export function ToggleSidebarButton({
  toggleSidebar,
}: ToggleSidebarButtonProps) {
  return (
    <button onClick={toggleSidebar}>
      <CgMenu size={24} />
    </button>
  );
}

type SidebarModalProps = {
  toggleSidebarModal: () => void;
};

export function SidebarModal({ toggleSidebarModal }: SidebarModalProps) {
  return (
    <Modal closeModal={toggleSidebarModal}>
      <div className="fixed top-0 left-0 bg-slate-950 h-screen">
        <div className="flex items-center gap-6 px-6 py-3 mb-3">
          <ToggleSidebarButton toggleSidebar={toggleSidebarModal} />
          <Logo />
        </div>
        <Sidebar forceExpand={true} />
      </div>
    </Modal>
  );
}

type SidebarItemProps = {
  Icon: IconType;
  children: ReactNode;
};

function SidebarItem({ Icon, children }: SidebarItemProps) {
  const { sidebarExpanded, forceExpand } = useContext(SidebarContext);
  return (
    <li className="flex items-center gap-6 h-12 px-3 bg-white rounded-lg bg-opacity-0 hover:bg-opacity-10">
      <Icon size={24} />
      <p
        className={`text-sm ${(() => {
          if (forceExpand) return "";
          else if (sidebarExpanded) {
            return "hidden md:block";
          } else {
            return "hidden";
          }
        })()}`}
      >
        {children}
      </p>
    </li>
  );
}

const SidebarContext = createContext({
  sidebarExpanded: true,
  forceExpand: false,
});

type SidebarProps = {
  sidebarExpanded?: boolean;
  forceExpand?: boolean;
};

export default function Sidebar({
  sidebarExpanded,
  forceExpand,
}: SidebarProps) {
  return (
    <SidebarContext.Provider
      value={{ sidebarExpanded: !!sidebarExpanded, forceExpand: !!forceExpand }}
    >
      <nav
        className={`${(() => {
          if (forceExpand) return "w-60";
          else if (sidebarExpanded) return "hidden sm:block md:w-60";
          else return "hidden sm:block";
        })()} px-3`}
      >
        <div className="sticky top-[68px]">
          <ul>
            <SidebarItem Icon={AiOutlineHome}>Home</SidebarItem>
            <SidebarItem Icon={BsCollectionPlay}>Subscriptions</SidebarItem>
          </ul>
          <hr className="border-slate-700 my-4" />
          <ul>
            <SidebarItem Icon={MdOutlineVideoLibrary}>Library</SidebarItem>
            <SidebarItem Icon={VscHistory}>History</SidebarItem>
            <SidebarItem Icon={RxClock}>Watch later</SidebarItem>
            <SidebarItem Icon={AiOutlineLike}>Liked videos</SidebarItem>
          </ul>
          <hr className="border-slate-700 my-4 -ml-3" />
          <div>
            <h2
              className={`ml-3 mb-1 ${(() => {
                if (forceExpand) return "";
                else if (sidebarExpanded) {
                  return "hidden md:block";
                } else {
                  return "hidden";
                }
              })()}`}
            >
              Subscriptions
            </h2>
            <ul>
              <SidebarItem
                Icon={UserIcon.bind(null, {
                  name: "Rafe",
                  bgColor: "bg-yellow-600",
                })}
              >
                Code with Rafe
              </SidebarItem>
              <SidebarItem
                Icon={UserIcon.bind(null, {
                  name: "Phil Jacob",
                  bgColor: "bg-blue-600",
                })}
              >
                Phil Jacob
              </SidebarItem>
              <SidebarItem
                Icon={UserIcon.bind(null, {
                  name: "Danger Zone",
                  bgColor: "bg-red-600",
                })}
              >
                Danger Zone
              </SidebarItem>
            </ul>
          </div>
          <hr className="border-slate-700 my-4 -ml-3" />
          <ul>
            <SidebarItem Icon={SlSettings}>Settings</SidebarItem>
          </ul>
          <hr className="border-slate-700 my-4 -ml-3" />
          <ul>
            <SidebarItem Icon={FiGithub}>mateusmtoledo</SidebarItem>
          </ul>
        </div>
      </nav>
    </SidebarContext.Provider>
  );
}
