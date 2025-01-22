'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useButton, useListBox } from './hooks';
import Button from './components/Button';
import Popover from './components/Popover';
import ListBox from './components/ListBox';
import { Option } from './types';

interface Props {
  items: Option[];
  onChange?: (option: Option) => void;
}

const Select: FC<Props> = ({ items, onChange }) => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const buttonProps = useButton();
  const listBoxProps = useListBox();

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option: Option) => {
      setSelectedItem(option);
      setIsOpen(false);

      if (onChange) {
        onChange(option);
      }
    },
    [onChange],
  );

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        (listBoxProps.ref.current?.childNodes[0] as HTMLLIElement).focus();
      });
    } else {
      requestAnimationFrame(() => {
        buttonProps.ref.current?.focus();
      });
    }
  }, [buttonProps.ref, isOpen, listBoxProps.ref]);

  return (
    <div className='flex'>
      <Button
        {...buttonProps}
        listBoxId={listBoxProps.id}
        isOpen={isOpen}
        onToggle={handleToggle}
        value={selectedItem?.name || 'Select...'}
      />
      <Popover
        count={items.length}
        isOpen={isOpen}
        onToggle={handleToggle}
        buttonRect={buttonProps.ref?.current?.getBoundingClientRect()}
      >
        {(virtualizeProps) => (
          <ListBox
            {...listBoxProps}
            {...virtualizeProps}
            items={items}
            handleSelect={handleSelect}
            onToggle={handleToggle}
            selectedItem={selectedItem}
          />
        )}
      </Popover>
    </div>
  );
};

export default Select;
