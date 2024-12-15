import Image from "next/image";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

interface DocumentProps {
  file: File;
}

export default function PDFDocument({ file }: DocumentProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [pageDimensions, setPageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onPageLoadSuccess(page: pdfjs.PDFPageProxy) {
    const viewport = page.getViewport({ scale: 1 });
    setPageDimensions({ width: viewport.width, height: viewport.height });
  }

  function goToPrevPage() {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) =>
      Math.min(prevPageNumber + 1, numPages || 1)
    );
  }

  const increaseScale = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 4));
  };

  const decreaseScale = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 1));
  };

  return (
    <div className="flex items-start m-2">
      <div className="flex flex-col">
        <button onClick={increaseScale} className="p-2  rounded mb-2">
          <Image
            src="/zoom-in-svgrepo-com.svg"
            alt="zoom in"
            width={20}
            height={20}
          />
        </button>
        <button onClick={decreaseScale} className="p-2 rounded mb-2">
          <Image
            src="/zoom-out-svgrepo-com.svg"
            alt="zoom in"
            width={20}
            height={20}
          />
        </button>
      </div>
      <div
        className="overflow-auto border-2"
        style={{
          width: pageDimensions ? `${pageDimensions.width}px` : "350px",
          height: pageDimensions ? `${pageDimensions.height}px` : "350px",
        }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className=""
          externalLinkRel="noopener noreferrer"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            onLoadSuccess={onPageLoadSuccess}
            width={pageDimensions?.width ?? 700}
            height={pageDimensions?.height ?? 700}
          />
        </Document>
      </div>
      <div className="flex flex-col mt-4">
        <button
          onClick={goToPrevPage}
          onMouseEnter={() => console.log("hover")}
          disabled={pageNumber <= 1}
          className=""
        >
          ⬆️
        </button>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= (numPages || 1)}
          className=""
        >
          ⬇️
        </button>
      </div>
      <p className="mt-4 flex">
        {pageNumber}/{numPages}
      </p>
    </div>
  );
}
