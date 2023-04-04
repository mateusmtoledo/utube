import { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";
import { BiVideoPlus } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { MdFileUpload } from "react-icons/md";

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
  setFile: Dispatch<SetStateAction<File | null>>;
};

function VideoInput({ setFile }: VideoInputProps) {
  return (
    <button className="relative">
      <div className="flex flex-col gap-4">
        <div className="flex p-8 justify-center rounded-full opacity-40 bg-slate-950">
          <MdFileUpload size={56} />
        </div>
        <p className="font-medium px-4 py-2 rounded text-sm bg-green-500 text-slate-950">
          SELECT FILE
        </p>
      </div>
      <input
        type="file"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
        className="absolute text-[0px] top-0 left-0 opacity-0 w-full h-full cursor-pointer"
      />
    </button>
  );
}

type VideoUploadFormProps = {
  closeForm: () => void;
};

function VideoUploadForm({ closeForm }: VideoUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Modal>
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="p-3 flex justify-between items-center">
          <p className="font-medium text-xl">Upload video</p>
          <button onClick={closeForm}>
            <VscClose size={32} />
          </button>
        </div>
        <hr className="border-slate-700" />
        <div className="flex justify-center items-center h-96">
          {file ? "" : <VideoInput setFile={setFile} />}
        </div>
      </div>
    </Modal>
  );
}
