import { HiOutlineUserCircle } from "react-icons/hi";
import Modal from "./Modal";
import { AiFillGithub } from "react-icons/ai";
import { IconType } from "react-icons";
import { signIn } from "next-auth/react";
import Logo from "./Logo";
import { useState } from "react";

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

export default function SignInButton() {
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
