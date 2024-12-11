// components/PdfViewer.tsx
"use client";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfViewer = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {!file && (
        <input
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          //   className="mb-[700px]"
        />
      )}
      {file && (
        <div className="mt-96">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      )}
      {numPages && (
        <p className="mt-4">
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
};

export default PdfViewer;
