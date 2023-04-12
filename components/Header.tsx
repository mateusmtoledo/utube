import { CgMenu } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import UserStatus from "./UserStatus";
import Logo from "./Logo";
import { ToggleSidebarButton } from "./Sidebar";

function SearchBar() {
  return (
    <form className="flex flex-1 h-10 rounded-full">
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

function SearchButton() {
  return (
    <button>
      <BiSearch size={20} />
    </button>
  );
}

type HeaderProps = {
  handleToggleSidebar: () => void;
};

export default function Header({ handleToggleSidebar }: HeaderProps) {
  return (
    <header className="flex justify-between w-full px-6 py-2 gap-6 sticky top-0 bg-slate-950 z-10">
      <div className="flex flex-1 max-w-[150px] items-center gap-6">
        <ToggleSidebarButton toggleSidebar={handleToggleSidebar} />
        <Logo />
      </div>
      <div className="hidden md:flex flex-shrink w-[420px] lg:w-[512px]">
        <SearchBar />
      </div>
      <div className="flex gap-2 flex-1 max-w-[150px] justify-end items-center">
        <div className="flex items-center md:hidden">
          <SearchButton />
        </div>
        <UserStatus />
      </div>
    </header>
  );
}
