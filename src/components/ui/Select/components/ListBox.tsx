import { CSSProperties, FC, RefObject } from 'react';
import { VirtualItem } from '@tanstack/react-virtual';
import { Option } from '../types';
import ListItem from './ListItem';

interface Props {
  id: string;
  listHeight: string;
  virtualItems: VirtualItem[];
  ref: RefObject<HTMLUListElement | null>;
  items: Option[];
  handleSelect: (option: Option) => void;
  onToggle: () => void;
  selectedItem: Option | null;
}

const ListBox: FC<Props> = ({
  id,
  listHeight,
  virtualItems,
  items,
  handleSelect,
  onToggle,
  ref,
  selectedItem,
}) => {
  return (
    <ul
      id={id}
      ref={ref}
      className='relative h-[var(--height)] w-full'
      style={
        {
          '--height': listHeight || '0',
        } as CSSProperties
      }
    >
      {virtualItems.map((virtualItem) => (
        <ListItem
          key={virtualItem.key}
          height={`${virtualItem.size}px`}
          start={`${virtualItem.start}px`}
          name={items[virtualItem.index]?.name}
          handleSelect={() => handleSelect(items[virtualItem.index])}
          isSelected={selectedItem?.id === items[virtualItem.index]?.id}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

export default ListBox;
