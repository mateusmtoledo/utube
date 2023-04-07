import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";
import { BiVideoPlus } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { MdFileUpload } from "react-icons/md";
import api from "@/adapters/axios";
import axios from "axios";

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
  size,
  placeholder,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  function onChange(e: ChangeEvent<HTMLSpanElement>) {
    setValue(e.target.textContent || "");
  }
  // FIXME this does not work because element does not fire onChange when edited
  return (
    <div
      className={`flex flex-col gap-1 rounded border px-3 py-2 ${
        isFocused ? "border-green-500" : "border-slate-700"
      }`}
    >
      <label className="text-xs text-slate-400" htmlFor={fieldName}>
        {`${label}${required ? " (required)" : ""}`}
      </label>
      <span
        role="textbox"
        contentEditable
        onChange={onChange}
        id={fieldName}
        className="bg-transparent outline-none placeholder:text-slate-500"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        style={{
          minHeight: size && size * 1.4 + "rem",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </span>
    </div>
  );
}

type ProgressBarProps = {
  value: number;
  max: number;
  fillColor?: string;
  className?: string;
};

function ProgressBar({ value, max, fillColor, className }: ProgressBarProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute h-full left-0 ${
          fillColor ? fillColor : "bg-green-500"
        }`}
        style={{
          width: (value / max) * 100 + "%",
        }}
      ></div>
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
      <div className="flex gap-6">
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
            fieldName="vide-description"
            label="Description"
            placeholder="Tell viewers about your video"
            size={4}
          />
        </div>
        <div className="rounded overflow-hidden bg-slate-900 h-max">
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
    setTitleInput(file.name);
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
      originalName: file.name,
    });
    setVideoURL("http://video.url");
  }

  return (
    <Modal maxWidth={896}>
      <div className="flex flex-col bg-slate-800 border border-slate-700 rounded-md relative max-h-[816px] h-screen m-4">
        <div className="px-6 py-4 flex justify-between items-center">
          <p className="font-medium text-xl">{file?.name || "Upload video"}</p>
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
