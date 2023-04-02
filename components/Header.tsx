import { CgMenu } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";

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
  return (
    <header className="flex justify-between w-full px-6 py-2 gap-6">
      <div className="flex flex-1 items-center gap-6">
        <CgMenu size={24} />
        <div className="flex items-center gap-1">
          <div className="relative">
            <AiFillYoutube size={32} className="fill-green-500" />
            <span className="absolute w-3 h-3 bg-white top-1/2 bottom-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10" />
          </div>
          <h1 className="font-bold text-xl">UTube</h1>
        </div>
      </div>
      <SearchBar />
      <div className="flex flex-1 justify-end items-center">
        <button className="font-medium text-lg bg-violet-600 aspect-square w-8 rounded-full">
          M
        </button>
      </div>
    </header>
  );
}
