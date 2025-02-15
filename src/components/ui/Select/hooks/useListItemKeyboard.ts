import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import { keys } from '../constants';

interface Props {
  onToggle: () => void;
  onSelect: () => void;
}

export const useListItemKeyboard = ({ onToggle, onSelect }: Props) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLLIElement>) => {
      const { code, currentTarget } = e;

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

      const handleSelect = () => {
        e.preventDefault();
        onSelect();
      };

      const events = {
        [keys.ArrowDown]: focusNext,
        [keys.ArrowUp]: focusPrevious,
        [keys.Tab]: onToggle,
        [keys.Escape]: onToggle,
        [keys.Enter]: handleSelect,
        [keys.Space]: handleSelect,
      };

      (events as Record<string, () => void>)[code]?.();
    },
    [onToggle, onSelect],
  );

  return { handleKeyDown };
};
