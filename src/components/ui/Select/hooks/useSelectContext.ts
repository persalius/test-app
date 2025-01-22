import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Option } from '../types';

interface SelectContext {
  isOpen: boolean;
  selectedItem: Option | null;
  onToggle: () => void;
  onSelect: (option: Option) => void;
}

interface ContextValue {
  onChange?: (option: Option) => void;
}

export const SelectContext = createContext<SelectContext | undefined>(
  undefined,
);

export const useSelectContext = (): SelectContext => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

export const useContextValue = ({ onChange }: ContextValue) => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const value: SelectContext = useMemo(
    () => ({
      isOpen,
      selectedItem,
      onToggle: handleToggle,
      onSelect: handleSelect,
    }),
    [handleSelect, handleToggle, isOpen, selectedItem],
  );

  return value;
};
