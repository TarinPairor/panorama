// components/PdfViewer.tsx
"use client";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Document from "./document";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfViewer = () => {
  const [file, setFile] = useState<File | null>(null);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="file"
        accept="application/pdf"
        onChange={onFileChange}
        className="mb-4"
      />
      <div className="">{file && <Document file={file} />}</div>
    </div>
  );
};

export default PdfViewer;
