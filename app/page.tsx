"use client";

import { useState } from "react";
import Viewer from "./_components/viewer";
import { NextUIProvider } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import AddCardButton from "./_components/add-card-button";
import DeleteCardButton from "./_components/delete-card-button";

interface ViewerCard {
  id: number;
  type: "viewer" | "button";
}

export default function Home() {
  const [viewerCards, setViewerCards] = useState<ViewerCard[]>([
    { id: 0, type: "viewer" },
    { id: 1, type: "button" },
  ]);

  const addPdfViewer = (id: number) => {
    const newViewerCard: ViewerCard = {
      id: viewerCards.length,
      type: "viewer",
    };
    const newButtonCard: ViewerCard = {
      id: viewerCards.length + 1,
      type: "button",
    };

    const updatedViewerCards = viewerCards.flatMap((card) =>
      card.id === id ? [newViewerCard, newButtonCard] : [card]
    );

    setViewerCards(updatedViewerCards);
  };

  const removePdfViewer = (id: number) => {
    setViewerCards(viewerCards.filter((card) => card.id !== id));
  };

  return (
    <NextUIProvider>
      <div className="font-[family-name:var(--font-geist-sans)] flex flex-wrap gap-2 overflow-auto">
        {viewerCards.map((card) =>
          card.type === "viewer" ? (
            <Card key={card.id} className="flex flex-col items-center p-2">
              <CardHeader>
                <Viewer />
              </CardHeader>
              <CardBody className="flex mt-4">
                <DeleteCardButton onClick={() => removePdfViewer(card.id)} />
              </CardBody>
            </Card>
          ) : (
            <div key={card.id} className="mt-4">
              <AddCardButton onClick={() => addPdfViewer(card.id)} />
            </div>
          )
        )}
      </div>
    </NextUIProvider>
  );
}
