import { CSSProperties, FC, memo } from 'react';
import cn from '@/utils/cn';
import { useListItemKeyboard } from '../hooks';

interface Props {
  height: string;
  start: string;
  name: string;
  handleSelect: () => void;
  onToggle: () => void;
  isSelected: boolean;
}

const ListItem: FC<Props> = memo(
  ({ name, handleSelect, onToggle, isSelected, height, start }) => {
    const { handleKeyDown } = useListItemKeyboard({ onToggle, handleSelect });

    return (
      <li
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        onClick={handleSelect}
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
        {name}
      </li>
    );
  },
);

ListItem.displayName = 'ListItem';

export default ListItem;
