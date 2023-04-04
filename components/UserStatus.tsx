import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import ReactDOM from "react-dom";
import { VscSignOut } from "react-icons/vsc";
import Modal from "./Modal";
import Logo from "./Logo";
import { AiFillGithub } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import { VideoUploadButton } from "./VideoUpload";

type OAuthButtonProps = {
  provider: string;
  Icon: IconType;
  className?: string;
};

function OAuthButton({ provider, Icon, className }: OAuthButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 p-2 rounded-md ${className}`}
      onClick={() => signIn(provider.toLowerCase())}
    >
      <Icon size={20} />
      <p className="text-sm font-medium">Sign in with {provider}</p>
    </button>
  );
}

function GitHubButton() {
  return (
    <OAuthButton provider="GitHub" Icon={AiFillGithub} className="bg-black" />
  );
}

function SignInModal({ closeModal }: { closeModal(): void }) {
  return (
    <Modal closeModal={closeModal} maxWidth={348}>
      <div className="relative flex flex-col items-center px-6 pb-4 pt-8 bg-slate-800 border border-slate-700 rounded-xl">
        <Logo size={32} />
        <p className="font-normal text-2xl mt-2 mb-8">Sign in</p>
        <div className="mb-8">
          <GitHubButton />
        </div>
        <button
          className="self-end bg-slate-700 hover:bg-slate-600 px-6 py-1 rounded-2xl border border-slate-600"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export function SignInButton() {
  const [signInModalVisible, setSignInModalVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => setSignInModalVisible(true)}
        className="flex items-center gap-2 text-green-500 px-2 py-1 rounded-full border border-slate-700 text-sm font-medium hover:bg-green-950 hover:border-green-950"
      >
        <HiOutlineUserCircle size={24} className="stroke-1" />
        <p className="mr-2">Sign in</p>
      </button>
      {signInModalVisible && (
        <SignInModal closeModal={() => setSignInModalVisible(false)} />
      )}
    </>
  );
}

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

export function UserMenuButton() {
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

export default function UserStatus() {
  const { status } = useSession();

  let content: ReactNode;

  if (status === "loading") {
    content = <Skeleton circle width={32} height={32} />;
  } else if (status === "authenticated") {
    content = (
      <>
        <VideoUploadButton />
        <UserMenuButton />
      </>
    );
  } else {
    content = <SignInButton />;
  }

  return <div className="flex gap-4 items-center">{content}</div>;
}
