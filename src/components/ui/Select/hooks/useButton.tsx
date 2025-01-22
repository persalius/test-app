import { useId, useRef } from 'react';

export const useButton = () => {
  const id = useId(); // For ARIA
  const ref = useRef<HTMLButtonElement | null>(null);

  return { id, ref };
};
