import { CSSProperties, FC, RefObject } from 'react';
import { VirtualItem } from '@tanstack/react-virtual';
import { Option } from '../types';
import ListItem from './ListItem';
import { useSelectContext } from '../hooks';

interface Props {
  id: string;
  buttonId: string;
  listHeight: string;
  virtualItems: VirtualItem[];
  ref: RefObject<HTMLUListElement | null>;
  items: Option[];
}

const ListBox: FC<Props> = ({
  id,
  buttonId,
  listHeight,
  virtualItems,
  items,
  ref,
}) => {
  const { onToggle, onSelect, selectedItem } = useSelectContext();

  return (
    <ul
      id={id}
      role='menu'
      aria-labelledby={buttonId}
      ref={ref}
      className='relative h-[var(--height)] w-full'
      style={
        {
          '--height': listHeight || '0px',
        } as CSSProperties
      }
    >
      {virtualItems.map((virtualItem) => (
        <ListItem
          key={virtualItem.key}
          height={`${virtualItem.size}px`}
          start={`${virtualItem.start}px`}
          value={items[virtualItem.index]?.name}
          onSelect={() => onSelect(items[virtualItem.index])}
          onToggle={onToggle}
          isSelected={selectedItem?.id === items[virtualItem.index]?.id}
        />
      ))}
    </ul>
  );
};

export default ListBox;
