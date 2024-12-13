import React, { useRef, useState } from "react";
import Image from "next/image";

interface DropFileInputProps {
  onFileChange: (file: File | null) => void;
}

const DropFileInput: React.FC<DropFileInputProps> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");
  const onDrop = () => wrapperRef.current?.classList.remove("dragover");

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0] || null;
    setFile(newFile);
    props.onFileChange(newFile);
  };

  const fileRemove = () => {
    setFile(null);
    props.onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative border-4 border-gray-300 rounded-2xl flex items-center justify-center bg-gray-100 hover:opacity-60 dragover:opacity-60"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="text-center text-gray-500 font-semibold p-2 flex flex-col items-center">
          <Image
            src="/upload-svgrepo-com.svg"
            alt="upload"
            width={100}
            height={100}
          />
          <p>Drag & Drop your file here</p>
        </div>
        <input
          type="file"
          ref={inputRef}
          onChange={onFileDrop}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      {file && (
        <div className="mt-8 flex flex-col">
          <div className="flex mb-2 bg-gray-100 p-2 rounded-2xl">
            <span
              className=" bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center shadow cursor-pointer opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100"
              onClick={fileRemove}
            >
              x
            </span>
            <div className="flex flex-col justify-between">
              <p className="font-medium">{file.name}</p>
              <p className="font-medium">{file.size}B</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DropFileInput;
