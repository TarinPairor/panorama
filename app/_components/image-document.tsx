import React, { useState, useRef, useEffect } from "react";

interface DocumentProps {
  file: File;
}

export default function ImageDocument({ file }: DocumentProps) {
  const [scale, setScale] = useState<number>(1);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      img.onload = () => {
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
    }
  }, [file]);

  const increaseScale = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 4));
  };

  const decreaseScale = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1));
  };

  const onImageLoad = () => {
    if (imageRef.current) {
      const img = imageRef.current;
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    }
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
        className="overflow-auto border-2"
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
          <img
            ref={imageRef}
            src={URL.createObjectURL(file)}
            alt="Selected file"
            onLoad={onImageLoad}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
