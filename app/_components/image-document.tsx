import Image from "next/image";
import React, { useState } from "react";

interface DocumentProps {
  file: File;
}

export default function ImageDocument({ file }: DocumentProps) {
  const [scale, setScale] = useState<number>(1);

  const increaseScale = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 1.2));
  };

  const decreaseScale = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1));
  };

  return (
    <div className="flex flex-grow items-start m-2">
      <div className="flex flex-col mr-4">
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
      <div className="flex-grow">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "relative",
          }}
        >
          <Image
            src={URL.createObjectURL(file)}
            alt="Selected file"
            width={350}
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
