import Image from "next/image";
import React, { useState, useRef } from "react";

interface DocumentProps {
  file: File;
}

export default function ImageDocument({ file }: DocumentProps) {
  const [scale, setScale] = useState<number>(1);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>({
    width: 350,
    height: 350,
  });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    if (imageRef.current) {
      const img = imageRef.current;
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    }
  };

  const increaseScale = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 4));
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
      <div
        className="overflow-auto"
        style={{
          width: imageDimensions ? `${imageDimensions.width / 2}px` : "350px",
          height: imageDimensions ? `${imageDimensions.height / 2}px` : "350px",
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "relative",
          }}
        >
          <Image
            ref={imageRef}
            src={URL.createObjectURL(file)}
            alt="Selected file"
            width={imageDimensions ? imageDimensions.width / 2 : 350}
            height={imageDimensions ? imageDimensions.height / 2 : 350}
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </div>
  );
}
