import { cn } from '../../utils';

const textVariants = {
  h1: 'text-[30px]', // 30px
  h2: 'text-[24px]', // 24px
  h3: 'text-[20px]', // 20px
  h4: 'text-[18px]', // 18px
  medium: 'text-[16px]', // 16px
  body: 'text-[14px] leading-[18px]', // 14px
  small: 'text-[13px]',
};

const textWeights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const Text: React.FC<TextProps> = ({
  variant,
  testid,
  weight = 'normal',
  children,
  className,
  align = 'left',
  as = 'div',
  ...props
}) => {
  const Component = as;

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  return (
    <Component
      data-testid={testid}
      className={cn(
        textVariants[variant],
        textWeights[weight],
        'font-poppins text-gray-700',
        alignClasses[align],
        className,
      )}
      {...props}>
      {children}
    </Component>
  );
};

export default Text;
