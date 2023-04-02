import { CgMenu } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import UserMenuButton from "./UserMenuButton";
import SignInButton from "./SignInButton";
import Logo from "./Logo";
import { useSession } from "next-auth/react";

function SearchBar() {
  return (
    <form className="flex items-stretch h-10 max-w-lg w-full rounded-full">
      <input
        type="search"
        className="border rounded-l-[inherit] bg-white bg-opacity-[2%] flex-1 border-slate-700 focus:outline-none focus:border-green-500 pl-4 text-base min-w-0 text-slate-200 placeholder:text-slate-500"
        placeholder="Search"
      />
      <button className="flex justify-center items-center rounded-r-[inherit] bg-slate-800 px-5 border border-l-0 border-slate-700">
        <BiSearch size={20} />
      </button>
    </form>
  );
}

export default function Header() {
  const { status } = useSession();

  return (
    <header className="flex justify-between w-full px-6 py-2 gap-6">
      <div className="flex flex-1 items-center gap-6">
        <CgMenu size={24} />
        <Logo />
      </div>
      <SearchBar />
      <div className="flex flex-1 justify-end items-center">
        {status === "authenticated" ? <UserMenuButton /> : <SignInButton />}
      </div>
    </header>
  );
}
