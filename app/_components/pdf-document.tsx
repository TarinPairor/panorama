import React, { useState } from "react";
import { Document as Doc, Page } from "react-pdf";

interface DocumentProps {
  file: File;
}

export default function PDFDocument({ file }: DocumentProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
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
    <div className="flex items-center m-2">
      <div className="flex  flex-col items-center">
        <button
          onClick={increaseScale}
          className="p-2 bg-gray-200 rounded mb-2"
        >
          ⬆️
        </button>
        <button onClick={decreaseScale} className="p-2 bg-gray-200 rounded">
          ⬇️
        </button>
      </div>
      <Doc
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        className=""
        externalLinkRel="noopener noreferrer"
      >
        <Page pageNumber={pageNumber} scale={scale} />
      </Doc>
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
        {/* <input
       type="number"
       value={pageNumber}
       onChange={(e) => setPageNumber(parseInt(e.target.value))}
       className="w-16"
       step="0.01"
       height={20}
     ></input> */}
        {pageNumber}/{numPages}
      </p>
    </div>
  );
}
