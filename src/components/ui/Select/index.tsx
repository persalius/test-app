'use client';

import { useEffect } from 'react';
import type { FC } from 'react';
import { useButton, useListBox, SelectContext, useContextValue } from './hooks';
import Button from './components/Button';
import Popover from './components/Popover';
import ListBox from './components/ListBox';
import { Option } from './types';

interface Props {
  items: Option[];
  onChange?: (option: Option) => void;
  isDisabled: boolean;
}

const Select: FC<Props> = ({ items, onChange, isDisabled }) => {
  const contextvalue = useContextValue({ onChange });
  const buttonProps = useButton();
  const listBoxProps = useListBox();

  useEffect(() => {
    if (contextvalue.isOpen) {
      requestAnimationFrame(() => {
        (listBoxProps.ref.current?.childNodes[0] as HTMLLIElement).focus();
      });
    } else {
      requestAnimationFrame(() => {
        buttonProps.ref.current?.focus();
      });
    }
  }, [buttonProps.ref, contextvalue.isOpen, listBoxProps.ref]);

  return (
    <SelectContext.Provider value={contextvalue}>
      <div>
        <Button
          {...buttonProps}
          listBoxId={listBoxProps.id}
          isDisabled={isDisabled}
        />
        <Popover count={items.length} buttonElement={buttonProps.ref?.current}>
          {(virtualizeProps) => (
            <ListBox
              {...listBoxProps}
              {...virtualizeProps}
              items={items}
              buttonId={buttonProps.id}
            />
          )}
        </Popover>
      </div>
    </SelectContext.Provider>
  );
};

export default Select;
