// components/PdfViewer.tsx
"use client";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import PDFDocument from "./pdf-document";
import ImageDocument from "./image-document";
import DropFileInput from "./drop-file-input";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Viewer = () => {
  const [file, setFile] = useState<File | null>(null);

  // function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
  //   const selectedFile = event.target.files?.[0] || null;
  //   setFile(selectedFile);
  // }

  function onFileChange(selectedFile: File | null): void {
    setFile(selectedFile);
  }

  function renderFile() {
    if (!file) return null;

    const fileType = file.type;
    if (fileType === "application/pdf") {
      return <PDFDocument file={file} />;
    } else if (fileType.startsWith("image/")) {
      return <ImageDocument file={file} />;
    } else {
      return <p>{null}</p>;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <input
        type="file"
        accept="application/pdf,image/*"
        onChange={onFileChange}
        className="mb-4"
      /> */}
      <DropFileInput onFileChange={onFileChange} />
      <div className="">{renderFile()}</div>
    </div>
  );
};

export default Viewer;
