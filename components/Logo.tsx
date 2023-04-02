import { AiFillYoutube } from "react-icons/ai";

export default function Logo({ size = 32 }: { size?: number }) {
  const fontSize = `${(size / 32) * 1.25}rem`;

  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <span className="absolute w-1/2 h-1/2 bg-white top-1/2 bottom-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <AiFillYoutube size={size} className="relative fill-green-500 z-10" />
      </div>
      <h1 className="font-bold" style={{ fontSize }}>
        UTube
      </h1>
    </div>
  );
}
