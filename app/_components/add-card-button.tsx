import Image from "next/image";
import React from "react";
import { Card } from "@nextui-org/react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const scaleAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

const AnimatedCard = styled(Card)`
  &:active {
    animation: ${scaleAnimation} 0.2s ease-in-out;
  }
`;

interface AddCardButtonProps {
  onClick?: () => void;
}

export default function AddCardButton({ onClick }: AddCardButtonProps) {
  return (
    <div onClick={onClick}>
      <AnimatedCard className="flex items-center justify-center p-4 cursor-pointer">
        <Image
          src="/plus-large-svgrepo-com.svg"
          alt="plus"
          width={100}
          height={100}
        />
      </AnimatedCard>
    </div>
  );
}
