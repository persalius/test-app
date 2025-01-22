import { KeyboardEvent, useCallback } from 'react';
import { keys } from '../constants';

interface Props {
  onToggle: () => void;
  onSelect: () => void;
}

export const useListItemKeyboard = ({ onToggle, onSelect }: Props) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLLIElement>) => {
      const { key, currentTarget } = e;

      const focusNext = () => {
        e.preventDefault();
        const nextElement = currentTarget.nextSibling as HTMLLIElement | null;
        if (nextElement) nextElement.focus();
      };

      const focusPrevious = () => {
        e.preventDefault();
        const prevElement =
          currentTarget.previousSibling as HTMLLIElement | null;
        if (prevElement) prevElement.focus();
      };

      const events = {
        [keys.ArrowDown]: focusNext,
        [keys.ArrowUp]: focusPrevious,
        [keys.Tab]: onToggle,
        [keys.Escape]: onToggle,
        [keys.Enter]: onSelect,
      };

      (events as Record<string, () => void>)[key]?.();
    },
    [onToggle, onSelect],
  );

  return { handleKeyDown };
};
