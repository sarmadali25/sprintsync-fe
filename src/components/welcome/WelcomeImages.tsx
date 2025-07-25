import "react-responsive-carousel/lib/styles/carousel.min.css";
import CustomCarousel from "../carousel/CustomCarousel";
import FadeAndSlide from "../animations/FadeAndSlide";
import useMediaQuery from "../../hooks/useMediaQuery";


const WelcomeImages = ({ currentSlide, onSlideChange, welcomeMessages, reverse = false }: WelcomeImagesProps) => {
  const isDesktop = useMediaQuery("(min-width: 1001px)");


  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full h-full">
        <FadeAndSlide direction={isDesktop ? reverse ? "left" : "right" : "up"} delay={400}>
          <CustomCarousel
            selectedItem={currentSlide}
            onChange={onSlideChange}
            autoPlay={false} // Disable autoPlay for synced carousels
            >
            {welcomeMessages.map((message, index) => (
              <img
              key={index}
              className="w-full h-auto rounded-lg"
              src={message.headerImage}
              alt={message.headerImageAlt}
              />
            ))}
          </CustomCarousel>
            </FadeAndSlide>
        </div>
      </div>
      <div className="w-full h-full flex rounded-lg">
        <div className="w-full h-full">
        <FadeAndSlide direction={reverse ? "left" : "right"} delay={500}>

          <CustomCarousel
            selectedItem={currentSlide}
            onChange={onSlideChange}
            autoPlay={false}
          >
            {welcomeMessages.map((message, index) => (
              <img
                key={index}
                className="w-full h-auto rounded-lg"
                src={message.footerImage}
                alt={message.footerImageAlt}
              />
            ))}
          </CustomCarousel>
        </FadeAndSlide>

        </div>
      </div>
    </div>
  );
};

export default WelcomeImages;
