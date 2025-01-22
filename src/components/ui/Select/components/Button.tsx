import { FC, RefObject } from 'react';
import { useButtonKeyboard, useSelectContext } from '../hooks';

interface Props {
  id: string;
  listBoxId: string;
  ref: RefObject<HTMLButtonElement | null>;
}

const Button: FC<Props> = ({ id, listBoxId, ref }) => {
  const { isOpen, onToggle, selectedItem } = useSelectContext();
  const { handleKeyDown } = useButtonKeyboard({ onToggle });

  return (
    <button
      onKeyDown={handleKeyDown}
      id={id}
      type='button'
      ref={ref}
      aria-haspopup='true'
      aria-expanded={isOpen}
      aria-controls={listBoxId}
      onClick={onToggle}
      className='flex h-9 w-48 items-center justify-between whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50'
    >
      {selectedItem?.name || 'Select...'}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='h-4 w-4 opacity-50'
        aria-hidden='true'
      >
        <path d='m6 9 6 6 6-6'></path>
      </svg>
    </button>
  );
};

export default Button;
