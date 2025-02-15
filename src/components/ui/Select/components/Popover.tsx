import { useEffect, useRef } from 'react';
import type { CSSProperties, FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import cn from '@/utils/cn';
import { useSelectContext } from '../hooks';

interface Props {
  buttonElement?: HTMLButtonElement | null;
  count: number;
  children: ({
    listHeight,
    virtualItems,
  }: {
    listHeight: string;
    virtualItems: VirtualItem[];
  }) => ReactNode;
}

const Popover: FC<Props> = ({ buttonElement, children, count }) => {
  const { isOpen, onToggle } = useSelectContext();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRect = buttonElement?.getBoundingClientRect();

  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => rootRef.current,
    estimateSize: () => 30,
  });

  const listHeight = `${rowVirtualizer.getTotalSize()}px`;
  const virtualItems = rowVirtualizer.getVirtualItems();

  // We can use 2 implementations:
  // 1. As shown below
  // 2. Write an Overlay component, when clicked, the menu will close, and also disable scrolling on the page.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onToggle]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={rootRef}
          tabIndex={-1}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className={cn(
            'custom-scrollbar',
            'absolute left-[var(--left)] top-[var(--top)]',
            'h-full max-h-44 w-48',
            'mt-1 p-2',
            'z-50 rounded-md bg-white shadow-md',
          )}
          style={
            {
              '--top': buttonRect
                ? `${buttonRect.bottom + window.scrollY}px`
                : '0px',
              '--left': buttonRect
                ? `${buttonRect.left + window.scrollX}px`
                : '0px',
            } as CSSProperties
          }
        >
          {children({
            listHeight,
            virtualItems,
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popover;
