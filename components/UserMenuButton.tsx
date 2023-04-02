import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { IconType } from "react-icons";
import ReactDOM from "react-dom";
import { VscSignOut } from "react-icons/vsc";

type UserMenuItemProps = {
  onClick?: () => void;
  children: string;
  Icon: IconType;
};

function UserMenuItem({ onClick, Icon, children }: UserMenuItemProps) {
  return (
    <li onClick={onClick}>
      <button className="flex items-center gap-4 h-10 p-4 w-full bg-white bg-opacity-0 hover:bg-opacity-10">
        <Icon size={24} />
        <p>{children}</p>
      </button>
    </li>
  );
}

function UserMenu() {
  const { data: session } = useSession();

  const portal = document.getElementById("portal");
  if (!portal) throw new Error("Portal element not found");

  return ReactDOM.createPortal(
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-12 right-6 pb-2 bg-slate-800 rounded-lg font-normal text-sm"
    >
      <div className="flex gap-4 min-w-0 p-4">
        <Image
          src={session?.user?.image || ""}
          alt=""
          width={40}
          height={40}
          className="h-10 rounded-full"
        />
        <div className="leading-snug">
          <p className="line-clamp-1 text-base">{session?.user?.name}</p>
          <p className="line-clamp-1">{session?.user?.email}</p>
        </div>
      </div>
      <hr className="border-slate-600 my-2" />
      <ul>
        <UserMenuItem Icon={VscSignOut} onClick={() => signOut()}>
          Sign out
        </UserMenuItem>
      </ul>
    </div>,
    portal
  );
}

export default function UserMenuButton() {
  const { data: session } = useSession();
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  return (
    <>
      <button onClick={() => setUserMenuVisible((prev) => !prev)}>
        <Image
          src={session?.user?.image || ""}
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        {userMenuVisible && <UserMenu />}
      </button>
    </>
  );
}
