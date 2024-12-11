"use client";

import { useState } from "react";
import PdfViewer from "./_components/PdfViewer";

export default function Home() {
  const [pdfViewers, setPdfViewers] = useState<number[]>([]);

  const addPdfViewer = () => {
    setPdfViewers([...pdfViewers, pdfViewers.length]);
  };

  const removePdfViewer = (id: number) => {
    setPdfViewers(pdfViewers.filter((index) => index !== id));
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex">
      <div className="mt-4">
        <button
          onClick={addPdfViewer}
          className="px-4 py-2 bg-gray-300 rounded mr-2"
        >
          Add PDF Viewer
        </button>
      </div>
      {pdfViewers.map((index: number) => (
        <div key={index} className="flex flex-col items-center">
          <PdfViewer />
          <div className="flex mt-4">
            <button
              onClick={() => removePdfViewer(index)}
              className="px-4 py-2 bg-gray-300 rounded mr-2"
            >
              Remove PDF Viewer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
