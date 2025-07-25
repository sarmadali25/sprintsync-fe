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
