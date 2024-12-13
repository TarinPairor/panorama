/* eslint-disable @next/next/no-img-element */
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
        const maxDimension = 500;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            width = maxDimension;
            height = maxDimension / aspectRatio;
          } else {
            height = maxDimension;
            width = maxDimension * aspectRatio;
          }
        }

        setImageDimensions({
          width,
          height,
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

  const increaseSize = () => {
    if (imageDimensions) {
      //   setImageDimensions((prevDimensions) => ({
      //     width: prevDimensions.width + 10,
      //     height: prevDimensions.height + 10,
      //   }));
    }
  };

  const decreaseSize = () => {
    if (imageDimensions) {
      //   setImageDimensions((prevDimensions) => ({
      //     width: Math.max(prevDimensions.width - 10, 10),
      //     height: Math.max(prevDimensions.height - 10, 10),
      //   }));
    }
  };

  return (
    <div className="flex flex-grow items-start m-2">
      <div className="flex flex-col mr-4">
        <button
          onClick={increaseScale}
          className="p-2 bg-gray-200 rounded mb-2"
        >
          🔍+
        </button>
        <button
          onClick={decreaseScale}
          className="p-2 bg-gray-200 rounded mb-2"
        >
          🔍-
        </button>
        <button onClick={increaseSize} className="p-2 bg-gray-200 rounded mb-2">
          ⬆️
        </button>
        <button onClick={decreaseSize} className="p-2 bg-gray-200 rounded">
          ⬇️
        </button>
      </div>
      <div
        className="overflow-scroll border-2"
        style={{
          width: imageDimensions ? `${imageDimensions.width}px` : "350px",
          height: imageDimensions ? `${imageDimensions.height}px` : "350px",
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
            onLoad={() => {
              if (imageRef.current) {
                const img = imageRef.current;
                const maxDimension = 350;
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                let width = img.naturalWidth;
                let height = img.naturalHeight;

                if (width > maxDimension || height > maxDimension) {
                  if (width > height) {
                    width = maxDimension;
                    height = maxDimension / aspectRatio;
                  } else {
                    height = maxDimension;
                    width = maxDimension * aspectRatio;
                  }
                }

                setImageDimensions({
                  width,
                  height,
                });
              }
            }}
            style={{
              width: imageDimensions ? `${imageDimensions.width}px` : "100%",
              height: imageDimensions ? `${imageDimensions.height}px` : "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}
