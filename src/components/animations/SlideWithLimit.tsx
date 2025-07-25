import { Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const SlideWithLimit = ({
  children,
  direction = "up",
  duration = 1000,
  triggerOnce = true,
  delay = 0,
  className = "",
  distance = 100,
  fraction = 0
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  triggerOnce?: boolean;
  delay?: number;
  className?: string;
  distance?: number;
  fraction?: number;
}) => {
  const getSlideKeyframes = (dir: string, dist: number) => {
    const transforms = {
      up: `translateY(${dist}px)`,
      down: `translateY(-${dist}px)`,
      left: `translateX(${dist}px)`,
      right: `translateX(-${dist}px)`
    };

    return keyframes`
      from {
        opacity: 0;
        transform: ${transforms[dir as keyof typeof transforms]};
      }
      to {
        opacity: 1;
        transform: translateY(0) translateX(0);
      }
    `;
  };

  const slideKeyframes = getSlideKeyframes(direction, distance);

  return (
    <Reveal
      keyframes={slideKeyframes}
      duration={duration}
      triggerOnce={triggerOnce}
      delay={delay}
      className={className}
      fraction={fraction}
    >
      {children}
    </Reveal>
  );
};

export default SlideWithLimit;