import { useEffect, useRef, useCallback } from "react";

interface IntersectionCustomOptions {
  onIntersect?: () => void;
  options?: IntersectionObserverInit;
}

function useIntersectionObserver({
  onIntersect,
  options,
}: IntersectionCustomOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  const setTargetRef = useCallback(
    (node: HTMLElement | null) => {
      if (targetRef.current) {
        observerRef.current?.disconnect();
      }

      if (node) {
        targetRef.current = node;

        observerRef.current = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && onIntersect) {
              onIntersect();
            }
          });
        }, options);

        observerRef.current.observe(node);
      }
    },
    [onIntersect, options]
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { setTargetRef };
}

export { useIntersectionObserver };
