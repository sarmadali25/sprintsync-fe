interface TextProps {
  variant: "h1" | "h2" | "h3" | "h4" | "medium" | "body" | "small";
  weight?: "normal" | "medium" | "semibold" | "bold";
  children: React.ReactNode;
  testid?: string | undefined;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "label" | "div";
  align?: "left" | "center" | "right" | "justify";
}

interface TextChildProps {
  children: React.ReactNode;
  className?: string;
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
}

interface CustomCarouselProps {
  children: ReactElement | ReactElement[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  showStatus?: boolean;
  showThumbs?: boolean;
  swipeable?: boolean;
  emulateTouch?: boolean;
  centerMode?: boolean;
  infiniteLoop?: boolean;
  className?: string;
  selectedItem?: number;
  onChange?: (index: number) => void;
  dynamicHeight?: boolean;
}

interface WelcomeMessage{
    heading: string;
    description: string;
    headerImage: string;
    headerImageAlt: string;
    footerImage?: string;
    footerImageAlt?: string;
}

interface WelcomeTextProps {
  currentSlide: number;
  onSlideChange: (index: number) => void;
  welcomeMessages: WelcomeMessage[];
}

interface WelcomeImagesProps {
  currentSlide: number;
  onSlideChange: (index: number) => void;
  welcomeMessages: WelcomeMessage[];
  reverse?: boolean;
}

interface TextCardProps {
  subtitle: string;
  title: string;
  description: string;
}
interface Image {
  image: string;
  alt: string;
  className?: string
}
interface ImageCardProps {
  mainHeader?: boolean;
  header: Image;
  secondHeader?: Image;
  body: Image;
}

interface HorizontalCardWithImageProps {
  mainHeader?: boolean;
  subtitle: string;
  title: string;
  description: string;
  headerImage: Image;
  secondHeaderImage?: Image;
  bodyImage: Image;
  reverse?: boolean;
  animationText?: boolean;
  animationImage?: boolean;
  currentSlide?: number;
  onSlideChange?: (index: number) => void;
}

interface ComparisonProps {
  primaryColor?: string;
  secondaryColor?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  small? : boolean;
}
