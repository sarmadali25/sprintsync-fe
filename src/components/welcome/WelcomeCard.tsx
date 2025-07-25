import WelcomeText from "./WelcomeText";
import WelcomeImages from "./WelcomeImages";
import { useEffect, useState } from "react";
import FadeAndSlide from "../animations/FadeAndSlide";

const WelcomeCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;
  const interval = 5000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, interval);

    return () => clearInterval(timer);
  }, [totalSlides, interval]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const welcomeMessages = [
    {
      heading:
        "Leverage AI to gain insights, automate processes, and drive innovation.",
      description:
        "We build & deploy AI agents that automate tasks, streamline operations, & enhance customer experiences.",
      headerImage: "./poster-images/AI-core.jpeg",
      headerImageAlt: "AI Core",
      footerImage: "./poster-images/AI-solutions.jpeg",
      footerImageAlt: "AI Solutions",
    },
    // {
    //   heading:
    //     "AI-Optimized Websites Built for Performance, Scale, and Impact.",
    //   description:
    //     "We design and develop modern websites optimized for AI-driven performance, scalability, and seamless user experience.",
    //   headerImage: "/Web_top.jpg",
    //   headerImageAlt: "Website",
    //   footerImage: "/Web_bottom.jpg",
    //   footerImageAlt: "Website",
    // },
    // {
    //   heading: "Smart Mobile Applications Engineered for the AI-Driven Future.",
    //   description:
    //     "Our mobile apps are crafted for high performance and AI integration, ensuring intelligent features and smooth functionality across devices.",
    //   headerImage: "/Mobile_top.jpg",
    //   headerImageAlt: "Mobile",
    //   footerImage: "/Red_bottom.jpg",
    //   footerImageAlt: "Mobile",
    // },
    {
      heading: "Reliable Project Delivery — On Time, Every Time.",
      description:
        "With agile processes and clear milestones, we deliver projects on time, maintaining high quality without compromising on speed.",
      headerImage: "./poster-images/Project_delivery.jpg",
      headerImageAlt: "Project Delivery",
      footerImage: "./poster-images/Red_bottom.jpg",
      footerImageAlt: "Projects",
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-2 lg:px-6 my-20">
      <div className="flex flex-col lg:flex-row justify-between items-center h-full gap-25">
        <div className="flex flex-col justify-center h-full w-full lg:w-1/2">
          <FadeAndSlide direction="left">
            <WelcomeText
              currentSlide={currentSlide}
              onSlideChange={handleSlideChange}
              welcomeMessages={welcomeMessages}
            />
          </FadeAndSlide>
        </div>
        <div className="h-full w-full lg:w-1/2">
          <WelcomeImages
            currentSlide={currentSlide}
            onSlideChange={handleSlideChange}
            welcomeMessages={welcomeMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
