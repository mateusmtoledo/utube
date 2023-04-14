import { VideoType } from "@/lib/types";
import useSWR from "swr";

export default function useVideos() {
  const { isLoading, data } = useSWR<{ videos: VideoType[] }>("/video");

  return { isLoading, data };
}
