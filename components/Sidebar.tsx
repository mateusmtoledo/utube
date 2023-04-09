import { ReactNode } from "react";
import { IconType } from "react-icons";
import { BsCollectionPlay } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { VscHistory } from "react-icons/vsc";
import { RxClock } from "react-icons/rx";
import { AiOutlineLike, AiOutlineHome } from "react-icons/ai";
import { SlSettings } from "react-icons/sl";
import { FiGithub } from "react-icons/fi";

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

type SidebarItemProps = {
  Icon: IconType;
  children: ReactNode;
};

function SidebarItem({ Icon, children }: SidebarItemProps) {
  return (
    <li className="flex items-center gap-6 h-10 p-3 bg-white rounded-lg bg-opacity-0 hover:bg-opacity-10">
      <Icon size={24} />
      <p className="text-sm hidden md:block">{children}</p>
    </li>
  );
}

export default function Sidebar() {
  return (
    <nav className="hidden sm:block md:w-60 px-3">
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
          <h2 className="ml-3 mb-1 hidden md:block">Subscriptions</h2>
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
  );
}
