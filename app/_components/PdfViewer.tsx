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
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setPageNumber(1);
  }

  function goToPrevPage() {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) =>
      Math.min(prevPageNumber + 1, numPages || 1)
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <input
        type="file"
        accept="application/pdf"
        onChange={onFileChange}
        className="mb-4"
      />
      <div className="">
        {file ? (
          <>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className=""
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div className="flex  mt-4">
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Previous
              </button>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= (numPages || 1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Next
              </button>
            </div>
            <p className="mt-4">
              Page {pageNumber} of {numPages}
            </p>
          </>
        ) : (
          <>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className=""
            >
              <Page pageNumber={1} />
            </Document>
            <div className="flex  mt-4">
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Previous
              </button>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= (numPages || 1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Next
              </button>
            </div>
            <p className="mt-4">
              Page {pageNumber} of {numPages}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
