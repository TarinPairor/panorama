"use client";

import { useState } from "react";
import Viewer from "./_components/viewer";
import { NextUIProvider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function Home() {
  const [pdfViewers, setPdfViewers] = useState<number[]>([]);

  const addPdfViewer = () => {
    setPdfViewers([...pdfViewers, pdfViewers.length]);
  };

  const removePdfViewer = (id: number) => {
    setPdfViewers(pdfViewers.filter((index) => index !== id));
  };

  return (
    <NextUIProvider>
      <div className="font-[family-name:var(--font-geist-sans)] flex">
        <div className="mt-4">
          <Button
            onPress={addPdfViewer}
            className="px-4 py-2 bg-gray-300 rounded mr-2"
          >
            Add PDF Viewer
          </Button>
        </div>
        {pdfViewers.map((index: number) => (
          <div key={index} className="flex flex-col items-center">
            <Viewer />
            <div className="flex mt-4">
              <Button
                onPress={() => removePdfViewer(index)}
                className="px-4 py-2 bg-red-300 rounded mr-2"
              >
                Remove PDF Viewer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </NextUIProvider>
  );
}
