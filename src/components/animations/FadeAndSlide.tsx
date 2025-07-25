import { Fade, Slide } from "react-awesome-reveal";

const FadeAndSlide = ({
  children,
  direction = "up",
  duration = 1000,
  triggerOnce = true,
  delay = 0,
  className = "",
  fraction = 0
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  triggerOnce?: boolean;
  delay?: number;
  className?: string;
  fraction?: number;
}) => {
  return (
    <Slide direction={direction} duration={duration} triggerOnce={triggerOnce} delay={delay} className={className} fraction={fraction}>
      <Fade duration={duration} triggerOnce={triggerOnce} delay={delay} className={className} fraction={fraction}>
        {children}
      </Fade>
    </Slide>
  );
};

export default FadeAndSlide;
