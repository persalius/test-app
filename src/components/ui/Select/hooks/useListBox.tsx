import { useId, useRef } from 'react';

export const useListBox = () => {
  const id = useId();
  const ref = useRef<HTMLUListElement | null>(null);

  return { id, ref };
};
