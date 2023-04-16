import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import Modal from "./Modal";
import { BiVideoPlus } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { MdFileUpload } from "react-icons/md";
import api from "@/adapters/axios";
import axios from "axios";
import ProgressBar from "./ProgressBar";

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
};

function Input({
  fieldName,
  label,
  required,
  value,
  setValue,
  size = 1,
  placeholder,
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
        className="bg-transparent outline-none placeholder:text-slate-500 resize-none overflow-hidden"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        rows={size}
        ref={textareaRef}
      />
    </div>
  );
}

type VideoDetailsFormProps = {
  titleInput: string;
  setTitleInput: Dispatch<SetStateAction<string>>;
  uploadProgress: number;
  videoURL: string | null;
};

function VideoDetailsForm({
  titleInput,
  setTitleInput,
  uploadProgress,
  videoURL,
}: VideoDetailsFormProps) {
  const [descriptionInput, setDescriptionInput] = useState("");

  return (
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
          />
          <Input
            value={descriptionInput}
            setValue={setDescriptionInput}
            fieldName="video-description"
            label="Description"
            placeholder="Tell viewers about your video"
            size={4}
          />
        </div>
        <div className="rounded overflow-hidden self-center md:self-start order-first md:order-none bg-slate-900 h-max">
          <div className="w-72 h-40 bg-slate-300" />
          <div className="p-4 text-sm text-slate-300">
            {videoURL ? (
              <>
                <p className="font-medium">Video link</p>
                <a className="text-blue-400" href={videoURL}>
                  {videoURL}
                </a>
              </>
            ) : (
              <>
                <p className="mb-2 font-medium">Uploading</p>
                <ProgressBar
                  value={uploadProgress}
                  max={100}
                  className="h-1 rounded-full bg-slate-700"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type VideoUploadFormProps = {
  closeForm: () => void;
};

function VideoUploadForm({ closeForm }: VideoUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [titleInput, setTitleInput] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setFile(file);
    setTitleInput(file.name.replace(/\.[^/.]+$/, ""));
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
    await api.post("/video", {
      public_id: uploadData.public_id,
    });
    setVideoURL("http://video.url");
  }

  return (
    <Modal maxWidth={896}>
      <div className="flex flex-col bg-slate-800 border border-slate-700 rounded-md relative max-h-[816px] h-screen m-4">
        <div className="px-6 py-4 flex justify-between items-center">
          <p className="font-medium text-xl">Upload video</p>
          <button onClick={closeForm}>
            <VscClose size={32} />
          </button>
        </div>
        <hr className="border-slate-700" />
        <div className="h-full">
          {file ? (
            <VideoDetailsForm
              titleInput={titleInput}
              setTitleInput={setTitleInput}
              uploadProgress={uploadProgress}
              videoURL={videoURL}
            />
          ) : (
            <VideoInput handleUpload={handleUpload} />
          )}
        </div>
      </div>
    </Modal>
  );
}
