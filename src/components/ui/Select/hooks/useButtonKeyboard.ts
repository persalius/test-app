import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import { keys } from '../constants';

interface Props {
  onToggle: () => void;
}

export const useButtonKeyboard = ({ onToggle }: Props) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const { key } = e;

      const events = {
        [keys.ArrowDown]: onToggle,
        [keys.ArrowUp]: onToggle,
      };

      (events as Record<string, () => void>)[key]?.();
    },
    [onToggle],
  );

  return { handleKeyDown };
};
