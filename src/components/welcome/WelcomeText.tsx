import Button from "../button/Button";
import { Text, Heading1, BodyText } from "../text";
import CustomCarousel from "../carousel/CustomCarousel";

const WelcomeText = ({
  currentSlide,
  onSlideChange,
  welcomeMessages,
}: WelcomeTextProps) => {
  return (
    <div className="">
      {/* <SubtitleText className="text-center lg:text-left">
        Welcome to Creative nodes
      </SubtitleText> */}
      <CustomCarousel
        className="min-h-fit"
        selectedItem={currentSlide}
        onChange={onSlideChange}
        autoPlay={false} // Disable autoPlay for synced carousels
        dynamicHeight={true}
      >
        {welcomeMessages.map((message, index) => (
          <Heading1
            key={index}
            weight="medium"
            className="py-4 text-center lg:text-left"
          >
            {message.heading}
          </Heading1>
        ))}
      </CustomCarousel>
      <CustomCarousel
        selectedItem={currentSlide}
        onChange={onSlideChange}
        autoPlay={false} // Disable autoPlay for synced carousels
      >
        {welcomeMessages.map((message, index) => (
          <BodyText
            key={index}
            weight="normal"
            className="text-center lg:text-left"
          >
            {message.description}
          </BodyText>
        ))}
      </CustomCarousel>
      <div className="flex justify-center lg:justify-start">
        <Button className="w-auto text-lg px-6 py-3 mt-6 lg:mt-4">
          <Text variant="body" weight="semibold" className="text-lg">
            Book a Call
          </Text>
        </Button>
      </div>
    </div>
  );
};

export default WelcomeText;
