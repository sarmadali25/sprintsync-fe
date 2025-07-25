import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  threshold?: number;
  rootMargin?: string;
}

export const useInView = (options: UseInViewOptions = {}): [RefObject<HTMLDivElement | null>, boolean] => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated, options]);

  return [ref, isInView];
};