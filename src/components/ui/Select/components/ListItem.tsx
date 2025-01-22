import { memo } from 'react';
import type { CSSProperties, FC } from 'react';
import cn from '@/utils/cn';
import { useListItemKeyboard } from '../hooks';

interface Props {
  height: string;
  start: string;
  value: string;
  onSelect: () => void;
  onToggle: () => void;
  isSelected: boolean;
}

const ListItem: FC<Props> = memo(
  ({ value, onSelect, onToggle, isSelected, height, start }) => {
    const { handleKeyDown } = useListItemKeyboard({ onToggle, onSelect });

    return (
      <li
        role='menuitem'
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        onClick={onSelect}
        className={cn(
          'flex items-center',
          'cursor-pointer',
          'absolute left-0 top-0',
          'h-[var(--height)] w-full',
          'translate-y-[var(--start)] transform',
          'hover:bg-gray-200',
          'px-2',
          'rounded-sm',
          'focus:outline-slate-200',
          isSelected && 'bg-gray-200',
        )}
        style={
          {
            '--height': `${height}`,
            '--start': `${start}`,
          } as CSSProperties
        }
      >
        {value}
      </li>
    );
  },
);

ListItem.displayName = 'ListItem';

export default ListItem;
