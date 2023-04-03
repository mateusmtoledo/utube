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

type NavItemProps = {
  Icon: IconType;
  children: ReactNode;
};

function NavItem({ Icon, children }: NavItemProps) {
  return (
    <li className="flex items-center gap-6 h-10 p-3 bg-white rounded-lg bg-opacity-0 hover:bg-opacity-10">
      <Icon size={24} />
      <p className="text-sm">{children}</p>
    </li>
  );
}

export default function Nav() {
  return (
    <nav className="w-60 px-3">
      <ul>
        <NavItem Icon={AiOutlineHome}>Home</NavItem>
        <NavItem Icon={BsCollectionPlay}>Subscriptions</NavItem>
      </ul>
      <hr className="border-slate-700 my-4" />
      <ul>
        <NavItem Icon={MdOutlineVideoLibrary}>Library</NavItem>
        <NavItem Icon={VscHistory}>History</NavItem>
        <NavItem Icon={RxClock}>Watch later</NavItem>
        <NavItem Icon={AiOutlineLike}>Liked videos</NavItem>
      </ul>
      <hr className="border-slate-700 my-4 -ml-3" />
      <div>
        <h2 className="ml-3 mb-1">Subscriptions</h2>
        <ul>
          <NavItem
            Icon={UserIcon.bind(null, {
              name: "Rafe",
              bgColor: "bg-yellow-600",
            })}
          >
            Code with Rafe
          </NavItem>
          <NavItem
            Icon={UserIcon.bind(null, {
              name: "Phil Jacob",
              bgColor: "bg-blue-600",
            })}
          >
            Phil Jacob
          </NavItem>
          <NavItem
            Icon={UserIcon.bind(null, {
              name: "Danger Zone",
              bgColor: "bg-red-600",
            })}
          >
            Danger Zone
          </NavItem>
        </ul>
      </div>
      <hr className="border-slate-700 my-4 -ml-3" />
      <ul>
        <NavItem Icon={SlSettings}>Settings</NavItem>
      </ul>
      <hr className="border-slate-700 my-4 -ml-3" />
      <ul>
        <NavItem Icon={FiGithub}>mateusmtoledo</NavItem>
      </ul>
    </nav>
  );
}
