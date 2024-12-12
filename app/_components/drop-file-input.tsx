import React, { useRef, useState } from "react";
import "./drop-file-input.css";

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
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <p>Drag & Drop your file here</p>
        </div>
        <input type="file" ref={inputRef} onChange={onFileDrop} />
      </div>
      {file && (
        <div className="drop-file-preview">
          <div className="drop-file-preview__item">
            <div className="drop-file-preview__item__info">
              <p>{file.name}</p>
              <p>{file.size}B</p>
            </div>
            <span className="drop-file-preview__item__del" onClick={fileRemove}>
              x
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default DropFileInput;
