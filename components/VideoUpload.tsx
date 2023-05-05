import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";
import Modal from "./Modal";
import { BiVideoPlus } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { MdFileUpload } from "react-icons/md";
import api from "@/adapters/axios";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import Link from "next/link";
import { VideoType } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/router";
import getVideoUrl from "@/helpers/getVideoUrl";
import { toast } from "react-toastify";

type VideoFormModalProps = {
  children: ReactNode;
  title: string;
  closeForm: () => void;
};

export function VideoFormModal({
  children,
  title,
  closeForm,
}: VideoFormModalProps) {
  return (
    <Modal maxWidth={896}>
      <div className="flex flex-col bg-slate-800 border border-slate-700 rounded-md relative max-h-[816px] h-screen m-4">
        <div className="px-6 py-4 flex justify-between items-center">
          <p className="font-medium text-xl">{title}</p>
          <button onClick={closeForm}>
            <VscClose size={32} />
          </button>
        </div>
        <hr className="border-slate-700" />
        <div className="h-full">{children}</div>
      </div>
    </Modal>
  );
}

export function VideoUploadButton() {
  const [formVisible, setFormVisible] = useState(false);

  function openForm() {
    setFormVisible(true);
  }
  function closeForm() {
    setFormVisible(false);
  }

  return (
    <>
      <button onClick={openForm} className="p-2">
        <BiVideoPlus size={24} />
      </button>
      {formVisible && <VideoUploadForm closeForm={closeForm} />}
    </>
  );
}

type VideoInputProps = {
  handleUpload: (file: File) => void;
};

function VideoInput({ handleUpload }: VideoInputProps) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <button className="relative">
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="p-8 rounded-full opacity-40 bg-slate-950">
            <MdFileUpload size={64} />
          </div>
          <p className="font-medium px-4 py-2 rounded text-sm bg-green-500 text-slate-950">
            SELECT FILE
          </p>
        </div>
        <input
          type="file"
          onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
          className="absolute text-[0px] top-0 left-0 opacity-0 w-full h-full cursor-pointer"
        />
      </button>
    </div>
  );
}

type InputProps = {
  fieldName: string;
  label: string;
  required?: boolean;
  value: string;
  placeholder: string;
  size?: number;
  setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
};

function Input({
  fieldName,
  label,
  required,
  value,
  setValue,
  size = 1,
  placeholder,
  disabled,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    updateHeight();
  }
  function updateHeight() {
    if (!textareaRef.current) throw new Error("Ref not found");
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }
  return (
    <div
      className={`flex flex-col w-full gap-1 rounded border px-3 py-2 ${
        isFocused ? "border-green-500" : "border-slate-700"
      }`}
    >
      <label className="text-xs text-slate-400" htmlFor={fieldName}>
        {`${label}${required ? " (required)" : ""}`}
      </label>
      <textarea
        onChange={onChange}
        id={fieldName}
        value={value}
        className="bg-transparent outline-none placeholder:text-slate-500 resize-none overflow-hidden"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        rows={size}
        ref={textareaRef}
        disabled={disabled}
      />
    </div>
  );
}

type VideoDetailsFormProps = {
  initialTitle: string;
  initialDescription?: string;
  uploadProgress?: number;
  video: VideoType | null;
};

export function VideoDetailsForm({
  initialTitle,
  initialDescription,
  uploadProgress,
  video,
}: VideoDetailsFormProps) {
  const [titleInput, setTitleInput] = useState(initialTitle);
  const [descriptionInput, setDescriptionInput] = useState(
    initialDescription || ""
  );
  const [loading, setLoading] = useState(false);
  const videoURL = video ? `${window.location.origin}/video/${video.id}` : "";
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO validation
    if (!titleInput || !video) return;
    try {
      await api.put(`/video/${video.id}`, {
        title: titleInput,
        description: descriptionInput,
      });
      router.push(getVideoUrl(video.id));
      toast.success("Video successfully updated!");
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between h-full"
    >
      <div className="px-12 py-8">
        <p className="text-2xl font-medium mb-4">Details</p>
        <div className="flex flex-col items-stretch md:items-start md:flex-row gap-6">
          <div className="space-y-4 flex-1">
            <Input
              value={titleInput}
              setValue={setTitleInput}
              fieldName="video-title"
              label="Title"
              placeholder="Add a title that describes your video"
              required
              disabled={loading}
            />
            <Input
              value={descriptionInput}
              setValue={setDescriptionInput}
              fieldName="video-description"
              label="Description"
              placeholder="Tell viewers about your video"
              size={4}
              disabled={loading}
            />
          </div>
          <div className="rounded overflow-hidden self-center md:self-start order-first md:order-none bg-slate-900 h-max">
            <div className="relative w-72 h-40 bg-slate-300">
              {video ? <Image src={video?.thumbnail} alt="" fill /> : null}
            </div>
            <div className="p-4 text-sm text-slate-300">
              {video ? (
                <>
                  <p className="font-medium">Video URL:</p>
                  <Link className="text-blue-400" href={videoURL}>
                    {videoURL.split("//")[1]}
                  </Link>
                </>
              ) : (
                <>
                  <p className="mb-2 font-medium">Uploading</p>
                  <ProgressBar
                    value={uploadProgress || 0}
                    max={100}
                    className="h-1 rounded-full bg-slate-700"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full border-t-slate-700 border-t p-4">
        <button
          type="submit"
          className="bg-green-500 text-slate-950 rounded px-4 py-1 self-end disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
          disabled={loading || !video}
        >
          Done
        </button>
      </div>
    </form>
  );
}

type VideoUploadFormProps = {
  closeForm: () => void;
};

function VideoUploadForm({ closeForm }: VideoUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [video, setVideo] = useState<VideoType | null>(null);

  async function handleUpload(file: File) {
    setFile(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "s57kcdni");
    const url = `https://api.cloudinary.com/v1_1/dniq0qli1/auto/upload`;
    const uploadResponse = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        if (loaded && total) {
          setUploadProgress(Math.floor((loaded * 100) / total));
        }
      },
    });
    const uploadData = uploadResponse.data;
    const { data } = await api.post("/video", {
      public_id: uploadData.public_id,
    });
    setVideo(data.video);
  }
  return (
    <VideoFormModal title="Upload video" closeForm={closeForm}>
      {file ? (
        <VideoDetailsForm
          video={video}
          initialTitle={file.name.replace(/\.[^/.]+$/, "")}
          uploadProgress={uploadProgress}
        />
      ) : (
        <VideoInput handleUpload={handleUpload} />
      )}
    </VideoFormModal>
  );
}
